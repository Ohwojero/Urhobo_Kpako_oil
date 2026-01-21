import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase configuration')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Types for our database
export type Profile = {
  id: string
  email: string
  full_name: string | null
  phone: string | null
  address: string | null
  city: string | null
  state: string | null
  postal_code: string | null
  country: string
  profile_image_url: string | null
  created_at: string
  updated_at: string
}

export type Product = {
  id: number
  name: string
  description: string | null
  size_ml: number
  price: number
  image_url: string | null
  stock: number
  status: 'Active'
  rating: number
  reviews_count: number
  created_at: string
  updated_at: string
}

export type Order = {
  id: number
  user_id: string
  order_number: string
  total_amount: number
  shipping_address: string
  shipping_city: string
  shipping_state: string
  shipping_postal_code: string | null
  phone_number: string
  payment_method: 'Paystack' | 'Bank Transfer' | 'Cash on Delivery'
  status: 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled'
  created_at: string
  updated_at: string
}

export type OrderItem = {
  id: number
  order_id: number
  product_id: number
  quantity: number
  price_at_purchase: number
  created_at: string
}
