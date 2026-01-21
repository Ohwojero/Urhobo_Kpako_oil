'use client'

import { useState } from 'react'
import { Star, ShoppingCart, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useCart } from '@/context/cart-context'

interface Product {
  id: number
  name: string
  price: number
  image: string
  rating: number
  reviews: number
  description: string
  inStock: boolean
}

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart()
  const [isAdding, setIsAdding] = useState(false)

  const handleAddToCart = () => {
    setIsAdding(true)
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
    })
    setTimeout(() => setIsAdding(false), 800)
  }

  return (
    <div className="group bg-card rounded-2xl border border-border overflow-hidden hover:shadow-xl hover:border-primary/50 transition-all duration-300">
      {/* Image */}
      <div className="relative w-full h-56 bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center text-7xl overflow-hidden">
        <div className="group-hover:scale-110 transition-transform duration-300">
          {product.image}
        </div>
        {product.inStock ? (
          <div className="absolute top-3 right-3 bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full">
            In Stock
          </div>
        ) : (
          <div className="absolute top-3 right-3 bg-gray-100 text-gray-700 text-xs font-bold px-3 py-1 rounded-full">
            Out of Stock
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-foreground line-clamp-2 group-hover:text-primary transition-colors">
            {product.name}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {product.description}
          </p>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-2 py-2">
          <div className="flex items-center gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < Math.round(product.rating || 0)
                    ? 'fill-accent text-accent'
                    : 'text-muted-foreground'
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-muted-foreground">
            {(product.rating || 0).toFixed(1)} ({product.reviews || 0})
          </span>
        </div>

        {/* Price */}
        <div className="py-3 border-t border-b border-border/50">
          <span className="text-3xl font-bold text-primary">
            ₦{product.price.toLocaleString()}
          </span>
        </div>

        {/* Add to Cart Button */}
        <Button
          onClick={handleAddToCart}
          disabled={!product.inStock}
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 font-semibold transition-all"
        >
          {isAdding ? (
            <>
              <Check className="w-4 h-4" />
              <span>Added!</span>
            </>
          ) : (
            <>
              <ShoppingCart className="w-4 h-4" />
              <span>Add to Cart</span>
            </>
          )}
        </Button>
      </div>
    </div>
  )
}
