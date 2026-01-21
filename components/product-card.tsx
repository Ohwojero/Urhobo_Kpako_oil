'use client'

import { useState } from 'react'
import { Star, ShoppingCart, Check, Heart, Eye } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useCart } from '@/context/cart-context'
import Image from 'next/image'

interface Product {
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

interface ProductCardProps {
  product: Product
  featured?: boolean
  viewMode?: 'grid' | 'list'
}

export default function ProductCard({ product, featured = false, viewMode = 'grid' }: ProductCardProps) {
  const { addToCart } = useCart()
  const [isAdding, setIsAdding] = useState(false)
  const [isWishlisted, setIsWishlisted] = useState(false)

  const handleAddToCart = () => {
    setIsAdding(true)
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image_url || product.image,
    })
    setTimeout(() => setIsAdding(false), 800)
  }

  const isInStock = product.inStock !== undefined ? product.inStock : product.stock > 0

  const toggleWishlist = () => {
    setIsWishlisted(!isWishlisted)
  }

  if (viewMode === 'list') {
    return (
      <div className="group bg-card rounded-2xl border border-border overflow-hidden hover:shadow-xl hover:border-primary/50 transition-all duration-300">
        <div className="flex flex-col md:flex-row">
          {/* Image */}
          <div className="relative w-full md:w-64 h-48 md:h-48 bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center overflow-hidden">
            <div className="group-hover:scale-105 transition-transform duration-300 w-full h-full flex items-center justify-center">
              {product.image_url ? (
                <Image
                  src={product.image_url}
                  alt={product.name}
                  fill
                  className="object-cover"
                  onError={(e) => {
                    // Fallback to emoji if image fails to load
                    const target = e.currentTarget as HTMLImageElement
                    target.style.display = 'none'
                    const fallback = target.nextElementSibling as HTMLElement
                    if (fallback) {
                      fallback.textContent = '🫒'
                      fallback.className = 'text-6xl'
                    }
                  }}
                />
              ) : (
                <span className="text-6xl">{product.image || '🫒'}</span>
              )}
            </div>
            {isInStock ? (
              <Badge className="absolute top-3 right-3 bg-green-500 hover:bg-green-600">
                In Stock
              </Badge>
            ) : (
              <Badge variant="secondary" className="absolute top-3 right-3">
                Out of Stock
              </Badge>
            )}
            <button
              onClick={toggleWishlist}
              className="absolute top-3 left-3 p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors"
            >
              <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 p-6 space-y-4">
            <div className="flex justify-between items-start">
              <div className="space-y-2 flex-1">
                <h3 className="text-xl font-semibold text-foreground line-clamp-2 group-hover:text-primary transition-colors">
                  {product.name}
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-3">
                  {product.description}
                </p>
                {product.size_ml && (
                  <Badge variant="outline" className="text-xs">
                    {product.size_ml}ml
                  </Badge>
                )}
              </div>
              <div className="text-right ml-4">
                <span className="text-3xl font-bold text-primary">
                  ₦{product.price.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Rating */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
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
                  {(product.rating || 0).toFixed(1)} ({product.reviews_count || 0} reviews)
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3 pt-4">
              <Button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 font-semibold transition-all"
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
              <Button variant="outline" size="icon" className="shrink-0">
                <Eye className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="group bg-card rounded-2xl border border-border overflow-hidden hover:shadow-2xl hover:shadow-primary/10 hover:border-primary/50 transition-all duration-500 hover:-translate-y-1">
      {/* Image Container */}
      <div className="relative w-full aspect-square bg-gradient-to-br from-primary/5 via-accent/5 to-primary/5 flex items-center justify-center overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-4 right-4 w-12 h-12 bg-primary/20 rounded-full blur-lg"></div>
          <div className="absolute bottom-4 left-4 w-8 h-8 bg-accent/20 rounded-full blur-md"></div>
        </div>

        {/* Main Image */}
        <div className="relative w-full h-full group-hover:scale-105 transition-transform duration-500">
          {product.image_url ? (
            <Image
              src={product.image_url}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              onError={(e) => {
                const target = e.currentTarget as HTMLImageElement
                target.style.display = 'none'
                const fallback = target.nextElementSibling as HTMLElement
                if (fallback) {
                  fallback.textContent = '🫒'
                  fallback.className = 'text-6xl opacity-60'
                }
              }}
            />
          ) : (
            <span className="text-6xl opacity-60">{product.image || '🫒'}</span>
          )}
        </div>

        {/* Floating Elements */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.size_ml && (
            <Badge variant="secondary" className="bg-white/90 text-foreground shadow-sm backdrop-blur-sm border-0 text-xs px-2 py-1">
              {product.size_ml}ml
            </Badge>
          )}
        </div>

        {/* Stock Status */}
        <div className="absolute top-3 right-3">
          {isInStock ? (
            <Badge className="bg-green-500/90 hover:bg-green-600 shadow-sm backdrop-blur-sm border-0 text-xs px-2 py-1">
              In Stock
            </Badge>
          ) : (
            <Badge variant="secondary" className="bg-red-500/90 text-white shadow-sm backdrop-blur-sm border-0 text-xs px-2 py-1">
              Out of Stock
            </Badge>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={toggleWishlist}
          className="absolute top-3 right-3 mt-10 p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-all duration-300 opacity-0 group-hover:opacity-100 transform translate-y-1 group-hover:translate-y-0 shadow-sm hover:shadow-md"
          aria-label="Add to wishlist"
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-700'}`} />
        </button>

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute bottom-3 left-3 right-3 flex gap-2">
            <Button
              variant="secondary"
              size="sm"
              className="flex-1 bg-white/90 hover:bg-white text-foreground backdrop-blur-sm shadow-sm text-xs h-8"
            >
              <Eye className="w-3 h-3 mr-1" />
              Quick View
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        {/* Title and Description */}
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-foreground line-clamp-2 group-hover:text-primary transition-colors duration-300 leading-tight">
            {product.name}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Rating */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-3.5 h-3.5 ${
                  i < Math.round(product.rating || 0)
                    ? 'fill-yellow-400 text-yellow-400'
                    : 'text-gray-300'
                }`}
              />
            ))}
            <span className="text-xs text-muted-foreground ml-1.5 font-medium">
              {(product.rating || 0).toFixed(1)}
            </span>
          </div>
          <span className="text-xs text-muted-foreground">
            ({product.reviews_count || 0})
          </span>
        </div>

        {/* Price */}
        <div className="pt-1">
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl font-bold text-primary">
              ₦{product.price.toLocaleString()}
            </span>
            <span className="text-xs text-muted-foreground">per bottle</span>
          </div>
        </div>

        {/* Add to Cart Button */}
        <Button
          onClick={handleAddToCart}
          disabled={!isInStock}
          className="w-full h-10 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-primary-foreground disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 font-medium transition-all duration-300 shadow-sm hover:shadow-md rounded-lg text-sm"
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
