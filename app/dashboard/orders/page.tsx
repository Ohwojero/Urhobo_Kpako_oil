'use client'

import { useAuth } from '@/context/auth-context'
import { useUserOrders } from '@/hooks/use-supabase'
import { OrderHistory } from '@/components/dashboard-order-history'

export default function OrdersPage() {
  const { user } = useAuth()
  const { orders, loading } = useUserOrders(user?.id)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Your Orders</h1>
        <p className="text-muted-foreground mt-1">View and track all your orders</p>
      </div>

      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-32 bg-muted rounded-lg animate-pulse"></div>
          ))}
        </div>
      ) : (
        <OrderHistory orders={orders} />
      )}
    </div>
  )
}
