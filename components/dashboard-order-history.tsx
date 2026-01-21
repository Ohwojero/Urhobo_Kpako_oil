'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Package, Calendar, MapPin, Phone } from 'lucide-react'
import Link from 'next/link'
import type { Order } from '@/lib/supabase'

interface OrderHistoryProps {
  orders: Order[]
}

export function OrderHistory({ orders }: OrderHistoryProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Delivered':
        return 'bg-green-100 text-green-800'
      case 'Shipped':
        return 'bg-blue-100 text-blue-800'
      case 'Processing':
        return 'bg-yellow-100 text-yellow-800'
      case 'Pending':
        return 'bg-gray-100 text-gray-800'
      case 'Cancelled':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  if (orders.length === 0) {
    return (
      <Card className="p-12 text-center border-2 border-dashed">
        <Package className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
        <h3 className="text-lg font-semibold text-foreground mb-2">No Orders Yet</h3>
        <p className="text-muted-foreground mb-6">Start shopping to see your orders here</p>
        <Link href="/products">
          <Button>Continue Shopping</Button>
        </Link>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      {orders.map(order => (
        <Card key={order.id} className="p-6 hover:shadow-md transition-shadow">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="font-semibold text-lg text-foreground">{order.order_number}</h3>
              <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                <Calendar className="w-4 h-4" />
                {new Date(order.created_at).toLocaleDateString('en-NG', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </div>
            </div>
            <Badge className={`${getStatusColor(order.status)} border-0`}>{order.status}</Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 py-4 border-t border-border">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Amount</p>
              <p className="font-semibold text-foreground">₦{order.total_amount.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Payment Method</p>
              <p className="font-semibold text-foreground">{order.payment_method}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Items</p>
              <p className="font-semibold text-foreground">-</p>
            </div>
          </div>

          <div className="flex items-start gap-2 text-sm text-muted-foreground mb-4">
            <MapPin className="w-4 h-4 mt-0.5" />
            <div>
              <p>{order.shipping_address}</p>
              <p>
                {order.shipping_city}, {order.shipping_state} {order.shipping_postal_code}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
            <Phone className="w-4 h-4" />
            <p>{order.phone_number}</p>
          </div>

          <Link href={`/dashboard/orders/${order.id}`}>
            <Button variant="outline" size="sm">
              View Details
            </Button>
          </Link>
        </Card>
      ))}
    </div>
  )
}
