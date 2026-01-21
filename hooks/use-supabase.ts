import { useEffect, useState } from 'react'
import { supabase, type Order, type Profile } from '@/lib/supabase'

export function useUserProfile(userId: string | undefined) {
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    if (!userId) {
      setLoading(false)
      return
    }

    const fetchProfile = async () => {
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', userId)
          .single()

        if (error) throw error
        setProfile(data)
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch profile'))
      } finally {
        setLoading(false)
      }
    }

    fetchProfile()
  }, [userId])

  const updateProfile = async (updates: Partial<Profile>) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', userId)
        .select()
        .single()

      if (error) throw error
      setProfile(data)
      return data
    } catch (err) {
      throw err instanceof Error ? err : new Error('Failed to update profile')
    }
  }

  return { profile, loading, error, updateProfile }
}

export function useUserOrders(userId: string | undefined) {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    if (!userId) {
      setLoading(false)
      return
    }

    const fetchOrders = async () => {
      try {
        const { data, error } = await supabase
          .from('orders')
          .select('*')
          .eq('user_id', userId)
          .order('created_at', { ascending: false })

        if (error) throw error
        setOrders(data || [])
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch orders'))
      } finally {
        setLoading(false)
      }
    }

    fetchOrders()
  }, [userId])

  const updateOrderStatus = async (orderId: number, status: Order['status']) => {
    try {
      const { error } = await supabase
        .from('orders')
        .update({ status })
        .eq('id', orderId)

      if (error) throw error

      // Update local state
      setOrders(orders.map(o => (o.id === orderId ? { ...o, status } : o)))
    } catch (err) {
      throw err instanceof Error ? err : new Error('Failed to update order')
    }
  }

  return { orders, loading, error, updateOrderStatus }
}

export function useOrderDetails(orderId: number | null) {
  const [order, setOrder] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    if (!orderId) {
      setLoading(false)
      return
    }

    const fetchOrderDetails = async () => {
      try {
        const { data, error } = await supabase
          .from('orders')
          .select(
            `
            *,
            order_items (
              *,
              products (
                id,
                name,
                price,
                image_url
              )
            )
          `
          )
          .eq('id', orderId)
          .single()

        if (error) throw error
        setOrder(data)
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch order details'))
      } finally {
        setLoading(false)
      }
    }

    fetchOrderDetails()
  }, [orderId])

  return { order, loading, error }
}
