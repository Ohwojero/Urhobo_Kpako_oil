'use client'
import Link from 'next/link'
import { useAuth } from '@/context/auth-context'
import { useUserProfile, useUserOrders } from '@/hooks/use-supabase'
import { Card } from '@/components/ui/card'
import { ShoppingCart, Package, Clock } from 'lucide-react'

export default function DashboardPage() {
  const { user } = useAuth()
  const { profile, loading: profileLoading } = useUserProfile(user?.id)
  const { orders, loading: ordersLoading } = useUserOrders(user?.id)

  const stats = [
    {
      label: 'Total Orders',
      value: orders.length.toString(),
      icon: ShoppingCart,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      label: 'Pending Orders',
      value: orders.filter(o => o.status === 'Pending').length.toString(),
      icon: Clock,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100',
    },
    {
      label: 'Delivered',
      value: orders.filter(o => o.status === 'Delivered').length.toString(),
      icon: Package,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
  ]

  const totalSpent = orders.reduce((sum, order) => sum + order.total_amount, 0)

  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => {
          const Icon = stat.icon
          return (
            <Card key={i} className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                  <p className="text-3xl font-bold text-foreground">{stat.value}</p>
                </div>
                <div className={`${stat.bgColor} p-3 rounded-lg`}>
                  <Icon className={`w-6 h-6 ${stat.color}`} />
                </div>
              </div>
            </Card>
          )
        })}

        {/* Total Spent */}
        <Card className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Total Spent</p>
              <p className="text-3xl font-bold text-foreground">₦{totalSpent.toLocaleString()}</p>
            </div>
            <div className="bg-purple-100 p-3 rounded-lg">
              <ShoppingCart className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </Card>
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link href="/products">
          <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer h-full">
            <ShoppingCart className="w-8 h-8 text-primary mb-3" />
            <h3 className="font-semibold text-foreground mb-2">Continue Shopping</h3>
            <p className="text-sm text-muted-foreground">Browse our premium red palm oil collection</p>
          </Card>
        </Link>

        <Link href="/dashboard/orders">
          <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer h-full">
            <Package className="w-8 h-8 text-primary mb-3" />
            <h3 className="font-semibold text-foreground mb-2">View Orders</h3>
            <p className="text-sm text-muted-foreground">Track your recent orders and deliveries</p>
          </Card>
        </Link>

        <Link href="/dashboard/orders">
          <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer h-full">
            <Clock className="w-8 h-8 text-primary mb-3" />
            <h3 className="font-semibold text-foreground mb-2">Order History</h3>
            <p className="text-sm text-muted-foreground">View all your past purchases</p>
          </Card>
        </Link>
      </div>

      {/* Recent Activity */}
      {ordersLoading ? (
        <Card className="p-12 text-center">
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-muted rounded w-3/4 mx-auto"></div>
            <div className="h-4 bg-muted rounded w-1/2 mx-auto"></div>
          </div>
        </Card>
      ) : (
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Recent Orders</h3>
          {orders.length === 0 ? (
            <p className="text-muted-foreground">No orders yet. Start shopping now!</p>
          ) : (
            <div className="space-y-3">
              {orders.slice(0, 5).map(order => (
                <div key={order.id} className="flex items-center justify-between p-3 bg-secondary/30 rounded">
                  <div>
                    <p className="font-medium text-foreground">{order.order_number}</p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(order.created_at).toLocaleDateString('en-NG')}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-foreground">₦{order.total_amount.toLocaleString()}</p>
                    <p className="text-sm text-muted-foreground">{order.status}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>
      )}
    </div>
  )
}
