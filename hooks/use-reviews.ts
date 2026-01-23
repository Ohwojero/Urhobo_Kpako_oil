import { useState } from 'react'
import { supabase } from '@/lib/supabase'

export function useProductReviews(productId: number) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const submitReview = async (rating: number, comment: string = '', userId: string) => {
    setLoading(true)
    setError(null)

    try {
      // Insert the review
      const { error: reviewError } = await supabase
        .from('reviews')
        .insert({
          product_id: productId,
          user_id: userId,
          rating,
          comment,
        })

      if (reviewError) throw reviewError

      // Update product rating and review count
      const { data: reviews, error: fetchError } = await supabase
        .from('reviews')
        .select('rating')
        .eq('product_id', productId)

      if (fetchError) throw fetchError

      const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0)
      const averageRating = totalRating / reviews.length

      const { error: updateError } = await supabase
        .from('products')
        .update({
          rating: averageRating,
          reviews_count: reviews.length,
        })
        .eq('id', productId)

      if (updateError) throw updateError

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to submit review')
      throw err
    } finally {
      setLoading(false)
    }
  }

  return {
    submitReview,
    loading,
    error,
  }
}
