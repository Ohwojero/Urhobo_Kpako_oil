'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import type { Product as SupabaseProduct } from '@/lib/supabase'

export interface Product {
  id: number
  name: string
  price: number
  stock: number
  status: 'Active'
  description?: string
  rating?: number
  reviews?: number
  image: string
  inStock?: boolean
  size_ml?: number
  image_url?: string
  reviews_count?: number
}

interface ProductContextType {
  products: Product[]
  loading: boolean
  error: string | null
  addProduct: (product: Omit<Product, 'id'>) => Promise<void>
  updateProduct: (id: number, product: Partial<Product>) => Promise<void>
  deleteProduct: (id: number) => Promise<void>
  getProductById: (id: number) => Product | undefined
  refreshProducts: () => Promise<void>
}

const ProductContext = createContext<ProductContextType | undefined>(undefined)

export function ProductProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchProducts = async () => {
    try {
      setLoading(true)
      setError(null)
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error

      // Map Supabase products to our interface
      const mappedProducts: Product[] = (data || []).map((p: SupabaseProduct) => ({
        id: p.id,
        name: p.name,
        price: p.price,
        stock: p.stock,
        status: p.status,
        description: p.description || undefined,
        rating: p.rating,
        reviews: p.reviews_count,
        image: p.image_url || '🫒',
        inStock: p.stock > 0,
        size_ml: p.size_ml,
        image_url: p.image_url || undefined,
        reviews_count: p.reviews_count,
      }))

      setProducts(mappedProducts)
    } catch (err) {
      console.error('Failed to fetch products:', err)
      setError(err instanceof Error ? err.message : 'Failed to fetch products')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  const addProduct = async (productData: Omit<Product, 'id'>) => {
    try {
      setError(null)
      const supabaseProduct = {
        name: productData.name,
        description: productData.description || null,
        size_ml: productData.size_ml || 500, // Default size
        price: productData.price,
        image_url: productData.image_url || null,
        stock: productData.stock,
        status: productData.status,
        rating: productData.rating || 5,
        reviews_count: productData.reviews_count || 0,
      }

      const { data, error } = await supabase
        .from('products')
        .insert([supabaseProduct])
        .select()
        .single()

      if (error) throw error

      // Refresh products to get the new one
      await fetchProducts()
    } catch (err) {
      console.error('Failed to add product:', err)
      setError(err instanceof Error ? err.message : 'Failed to add product')
      throw err
    }
  }

  const updateProduct = async (id: number, productData: Partial<Product>) => {
    try {
      setError(null)
      const supabaseUpdate = {
        ...(productData.name && { name: productData.name }),
        ...(productData.description !== undefined && { description: productData.description }),
        ...(productData.size_ml && { size_ml: productData.size_ml }),
        ...(productData.price && { price: productData.price }),
        ...(productData.image_url !== undefined && { image_url: productData.image_url }),
        ...(productData.stock !== undefined && { stock: productData.stock }),
        ...(productData.status && { status: productData.status }),
        ...(productData.rating && { rating: productData.rating }),
        ...(productData.reviews_count !== undefined && { reviews_count: productData.reviews_count }),
      }

      const { error } = await supabase
        .from('products')
        .update(supabaseUpdate)
        .eq('id', id)

      if (error) throw error

      // Refresh products
      await fetchProducts()
    } catch (err) {
      console.error('Failed to update product:', err)
      setError(err instanceof Error ? err.message : 'Failed to update product')
      throw err
    }
  }

  const deleteProduct = async (id: number) => {
    try {
      setError(null)
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id)

      if (error) throw error

      // Refresh products
      await fetchProducts()
    } catch (err) {
      console.error('Failed to delete product:', err)
      setError(err instanceof Error ? err.message : 'Failed to delete product')
      throw err
    }
  }

  const getProductById = (id: number) => {
    return products.find(p => p.id === id)
  }

  const refreshProducts = async () => {
    await fetchProducts()
  }

  return (
    <ProductContext.Provider value={{
      products,
      loading,
      error,
      addProduct,
      updateProduct,
      deleteProduct,
      getProductById,
      refreshProducts
    }}>
      {children}
    </ProductContext.Provider>
  )
}

export function useProducts() {
  const context = useContext(ProductContext)
  if (!context) {
    throw new Error('useProducts must be used within ProductProvider')
  }
  return context
}
