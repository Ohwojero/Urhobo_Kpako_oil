'use client'

import { useState } from 'react'
import { Star } from 'lucide-react'
import { useAuth } from '@/context/auth-context'
import { useProductReviews } from '@/hooks/use-reviews'

interface RatingStarsProps {
  productId: number
  initialRating?: number
  readonly?: boolean
}

export default function RatingStars({ productId, initialRating = 0, readonly = false }: RatingStarsProps) {
  const [rating, setRating] = useState(initialRating)
  const [hoverRating, setHoverRating] = useState(0)
  const { user } = useAuth()
  const { submitReview } = useProductReviews(productId)

  const handleClick = async (starRating: number) => {
    if (readonly || !user) return

    try {
      await submitReview(starRating, '', user.id)
      setRating(starRating)
    } catch (error) {
      console.error('Failed to submit rating:', error)
    }
  }

  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          onClick={() => handleClick(star)}
          onMouseEnter={() => !readonly && setHoverRating(star)}
          onMouseLeave={() => !readonly && setHoverRating(0)}
          className={`w-5 h-5 ${readonly ? 'cursor-default' : 'cursor-pointer hover:scale-110 transition-transform'}`}
          disabled={readonly}
        >
          <Star
            className={`w-full h-full ${
              star <= (hoverRating || rating)
                ? 'fill-yellow-400 text-yellow-400'
                : 'text-gray-300'
            }`}
          />
        </button>
      ))}
    </div>
  )
}
