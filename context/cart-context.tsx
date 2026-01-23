'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { useAuth } from './auth-context'

export interface CartItem {
  id: number
  name: string
  price: number
  quantity: number
  image?: string
}

interface CartContextType {
  cart: CartItem[]
  addToCart: (item: Omit<CartItem, 'quantity'>) => Promise<void>
  removeFromCart: (id: number) => Promise<void>
  updateQuantity: (id: number, quantity: number) => Promise<void>
  clearCart: () => Promise<void>
  totalItems: number
  totalPrice: number
  isLoading: boolean
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([])
  const [isHydrated, setIsHydrated] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { user } = useAuth()

  // Fetch cart from database
  const fetchCartFromDB = async () => {
    if (!user) return []
    try {
      // First get cart items
      const { data: cartData, error: cartError } = await supabase
        .from('cart')
        .select('product_id, quantity')
        .eq('user_id', user.id)

      if (cartError) throw cartError

      if (!cartData || cartData.length === 0) return []

      console.log('Cart data from DB:', cartData)

      // Get all products to ensure we have valid data
      const { data: allProducts, error: productsError } = await supabase
        .from('products')
        .select('id, name, price, image_url')

      if (productsError) throw productsError

      console.log('All products from DB:', allProducts)

      // Combine cart and product data, filtering out invalid products
      const validCartItems = cartData
        .map(cartItem => {
          const product = allProducts?.find(p => p.id === cartItem.product_id)
          if (!product) {
            console.warn(`Product with ID ${cartItem.product_id} not found, removing from cart`)
            // Remove invalid cart item from database
            removeCartItemFromDB(cartItem.product_id)
            return null
          }
          return {
            id: cartItem.product_id,
            name: product.name,
            price: product.price,
            quantity: cartItem.quantity,
            image: product.image_url
          }
        })
        .filter(item => item !== null)

      console.log('Valid cart items:', validCartItems)
      return validCartItems
    } catch (error) {
      console.error('Error fetching cart from DB:', error)
      return []
    }
  }

  // Save cart item to database
  const saveCartItemToDB = async (productId: number, quantity: number) => {
    if (!user) {
      console.log('No user authenticated, skipping DB save')
      return
    }
    try {
      console.log('Saving cart item to DB:', { user_id: user.id, product_id: productId, quantity })
      const { data, error } = await supabase
        .from('cart')
        .upsert({
          user_id: user.id,
          product_id: productId,
          quantity
        }, {
          onConflict: 'user_id,product_id'
        })

      if (error) {
        console.error('Error saving cart item to DB:', error)
        throw error
      }
      console.log('Successfully saved cart item to DB:', data)
    } catch (error) {
      console.error('Error saving cart item to DB:', error)
    }
  }

  // Remove cart item from database
  const removeCartItemFromDB = async (productId: number) => {
    if (!user) return
    try {
      const { error } = await supabase
        .from('cart')
        .delete()
        .eq('user_id', user.id)
        .eq('product_id', productId)

      if (error) throw error
    } catch (error) {
      console.error('Error removing cart item from DB:', error)
    }
  }

  // Clear cart from database
  const clearCartFromDB = async () => {
    if (!user) return
    try {
      const { error } = await supabase
        .from('cart')
        .delete()
        .eq('user_id', user.id)

      if (error) throw error
    } catch (error) {
      console.error('Error clearing cart from DB:', error)
    }
  }

  useEffect(() => {
    const loadCart = async () => {
      setIsLoading(true)
      console.log('Cart loading triggered, user:', user)

      if (user && user.id) {
        // Load from database if authenticated and user ID is available
        console.log('Loading cart from database for user:', user.id)
        try {
          const dbCart = await fetchCartFromDB()
          console.log('Loaded cart items from DB:', dbCart)
          setCart(dbCart)

          // Clear localStorage when user logs in to avoid conflicts
          localStorage.removeItem('palma-cart')
        } catch (error) {
          console.error('Failed to load cart from database:', error)
          setCart([])
        }
      } else {
        // Load from localStorage if not authenticated
        console.log('Loading cart from localStorage')
        const saved = localStorage.getItem('palma-cart')
        if (saved) {
          try {
            const localCart = JSON.parse(saved)
            console.log('Loaded cart items from localStorage:', localCart)
            setCart(localCart)
          } catch (error) {
            console.error('Failed to parse localStorage cart:', error)
            setCart([])
          }
        } else {
          setCart([])
        }
      }
      setIsHydrated(true)
      setIsLoading(false)
    }

    // Add a small delay to ensure auth state is stable
    const timeoutId = setTimeout(loadCart, 100)

    return () => clearTimeout(timeoutId)
  }, [user?.id]) // Use user.id instead of user to avoid unnecessary re-runs

  useEffect(() => {
    // Save to localStorage whenever cart changes (for non-authenticated users)
    if (isHydrated && !user) {
      localStorage.setItem('palma-cart', JSON.stringify(cart))
    }
  }, [cart, isHydrated, user])

  const addToCart = async (item: Omit<CartItem, 'quantity'>) => {
    console.log('addToCart called with item:', item, 'user:', user)
    const existing = cart.find(c => c.id === item.id)
    if (existing) {
      const newQuantity = existing.quantity + 1
      console.log('Updating existing item quantity to:', newQuantity)
      setCart(prevCart =>
        prevCart.map(c =>
          c.id === item.id ? { ...c, quantity: newQuantity } : c
        )
      )
      if (user) {
        await saveCartItemToDB(item.id, newQuantity)
      } else {
        console.log('No user authenticated, not saving to DB')
      }
    } else {
      console.log('Adding new item to cart')
      setCart(prevCart => [...prevCart, { ...item, quantity: 1 }])
      if (user) {
        await saveCartItemToDB(item.id, 1)
      } else {
        console.log('No user authenticated, not saving to DB')
      }
    }
  }

  const removeFromCart = async (id: number) => {
    setCart(prevCart => prevCart.filter(c => c.id !== id))
    if (user) {
      await removeCartItemFromDB(id)
    }
  }

  const updateQuantity = async (id: number, quantity: number) => {
    if (quantity <= 0) {
      await removeFromCart(id)
    } else {
      setCart(prevCart =>
        prevCart.map(c => (c.id === id ? { ...c, quantity } : c))
      )
      if (user) {
        await saveCartItemToDB(id, quantity)
      }
    }
  }

  const clearCart = async () => {
    setCart([])
    if (user) {
      await clearCartFromDB()
    }
  }

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0)
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, totalItems, totalPrice, isLoading }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within CartProvider')
  }
  return context
}
