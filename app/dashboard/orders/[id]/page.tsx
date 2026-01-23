'use client'

import { useOrderDetails } from '@/hooks/use-supabase'
import { DeliveryTracking } from '@/components/dashboard-delivery-tracking'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ArrowLeft, Package } from 'lucide-react'
import { useParams } from 'next/navigation'

export default function OrderDetailsPage() {
  const params = useParams()
  const orderId = parseInt(params.id as string)
  const { order, loading, error } = useOrderDetails(orderId)

  if (loading) {
    return (
      <div className="space-y-6">
        <Link href="/dashboard/orders">
          <Button variant="ghost" size="sm" className="mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Orders
          </Button>
        </Link>
        <div className="space-y-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-32 bg-muted rounded-lg animate-pulse"></div>
          ))}
        </div>
      </div>
    )
  }

  if (error || !order) {
    return (
      <div className="space-y-6">
        <Link href="/dashboard/orders">
          <Button variant="ghost" size="sm" className="mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Orders
          </Button>
        </Link>
        <Card className="p-12 text-center">
          <Package className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
          <h3 className="text-lg font-semibold text-foreground mb-2">Order Not Found</h3>
          <p className="text-muted-foreground">The order you're looking for doesn't exist.</p>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <Link href="/dashboard/orders">
        <Button variant="ghost" size="sm">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Orders
        </Button>
      </Link>

      {/* Order Header */}
      <Card className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">{order.order_number}</h1>
            <p className="text-muted-foreground mt-1">
              Order placed on{' '}
              {new Date(order.created_at).toLocaleDateString('en-NG', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-foreground">₦{order.total_amount.toLocaleString()}</p>
            <p className="text-sm text-muted-foreground mt-1">{order.payment_method}</p>
          </div>
        </div>
      </Card>

      {/* Delivery Status */}
      <DeliveryTracking order={order} />

      {/* Order Items */}
      {order.order_items && order.order_items.length > 0 && (
        <Card className="p-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">Order Items</h2>
          <div className="space-y-4">
            {order.order_items.map((item: any) => (
              <div key={item.id} className="flex items-center justify-between p-4 bg-secondary/30 rounded">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-accent/10 to-primary/10 flex items-center justify-center flex-shrink-0">
                    <img
                      src={item.products?.image_url}
                      alt={item.products?.name}
                      className="w-full h-full object-cover rounded"
                    />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{item.products?.name}</p>
                    <p className="text-sm text-muted-foreground">Quantity: {item.quantity}</p>
                  </div>
                </div>
                <p className="font-semibold text-foreground">₦{item.price_at_purchase.toLocaleString()}</p>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Shipping Details */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold text-foreground mb-4">Shipping Details</h2>
        <div className="space-y-3 text-foreground">
          <p>
            <span className="font-medium">Address:</span> {order.shipping_address}
          </p>
          <p>
            <span className="font-medium">City:</span> {order.shipping_city}
          </p>
          <p>
            <span className="font-medium">State:</span> {order.shipping_state}
          </p>
          {order.shipping_postal_code && (
            <p>
              <span className="font-medium">Postal Code:</span> {order.shipping_postal_code}
            </p>
          )}
          <p>
            <span className="font-medium">Phone:</span> {order.phone_number}
          </p>
        </div>
      </Card>
    </div>
  )
}
