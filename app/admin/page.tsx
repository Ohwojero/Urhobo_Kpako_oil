'use client'

import { useState, useEffect } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { TrendingUp, Package, ShoppingCart, Users } from 'lucide-react'
import { supabase } from '@/lib/supabase'

const salesData = [
  { month: 'Jan', sales: 4000, orders: 24 },
  { month: 'Feb', sales: 3000, orders: 13 },
  { month: 'Mar', sales: 2000, orders: 9 },
  { month: 'Apr', sales: 2780, orders: 39 },
  { month: 'May', sales: 1890, orders: 22 },
  { month: 'Jun', sales: 2390, orders: 29 },
]

const productData = [
  { name: '500ml', value: 45 },
  { name: '1L', value: 35 },
  { name: '250ml', value: 20 },
]

const COLORS = ['#D97706', '#F59E0B', '#FBBF24']

export default function AdminDashboard() {
  const [recentOrders, setRecentOrders] = useState<any[]>([])
  const [stats, setStats] = useState([
    { label: 'Total Sales', value: '₦0', change: '+0%', icon: TrendingUp },
    { label: 'Total Orders', value: '0', change: '+0%', icon: ShoppingCart },
    { label: 'Total Products', value: '0', change: 'Active', icon: Package },
    { label: 'Total Customers', value: '0', change: '+0%', icon: Users },
  ])

  useEffect(() => {
    fetchDashboardData()

    // Subscribe to real-time changes
    const channel = supabase
      .channel('orders')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'orders' },
        (payload) => {
          console.log('Order changed:', payload)
          // Refresh orders when any change occurs
          fetchDashboardData()
        }
      )
      .subscribe()

    return () => {
      channel.unsubscribe()
    }
  }, [])

  const fetchDashboardData = async () => {
    try {
      // Fetch recent orders
      const { data: orders, error: ordersError } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(5)

      if (ordersError) throw ordersError
      setRecentOrders(orders || [])

      // Fetch stats
      const { count: totalOrders } = await supabase
        .from('orders')
        .select('*', { count: 'exact', head: true })

      const { count: totalProducts } = await supabase
        .from('products')
        .select('*', { count: 'exact', head: true })

      const { count: totalCustomers } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true })

      const totalSales = orders?.reduce((sum, o) => sum + (o.total_amount || 0), 0) || 0

      setStats([
        { label: 'Total Sales', value: `₦${totalSales.toLocaleString()}`, change: '+12.5%', icon: TrendingUp },
        { label: 'Total Orders', value: `${totalOrders || 0}`, change: '+8.2%', icon: ShoppingCart },
        { label: 'Total Products', value: `${totalProducts || 0}`, change: 'Active', icon: Package },
        { label: 'Total Customers', value: `${totalCustomers || 0}`, change: '+5.3%', icon: Users },
      ])
    } catch (err) {
      console.error('Failed to fetch dashboard data:', err)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Delivered':
        return 'bg-green-100 text-green-700'
      case 'Shipped':
        return 'bg-blue-100 text-blue-700'
      case 'Processing':
        return 'bg-yellow-100 text-yellow-700'
      case 'Pending':
        return 'bg-gray-100 text-gray-700'
      default:
        return 'bg-gray-100 text-gray-700'
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back! Here's your business overview.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => {
          const Icon = stat.icon
          return (
            <div key={i} className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="text-2xl font-bold text-foreground mt-2">{stat.value}</p>
                </div>
                <Icon className="w-8 h-8 text-primary opacity-50" />
              </div>
              <p className="text-sm text-green-600">{stat.change}</p>
            </div>
          )
        })}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sales Chart */}
        <div className="lg:col-span-2 bg-card border border-border rounded-lg p-6">
          <h2 className="text-lg font-bold text-foreground mb-6">Sales Overview</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis dataKey="month" stroke="var(--color-muted-foreground)" />
              <YAxis stroke="var(--color-muted-foreground)" />
              <Tooltip contentStyle={{ backgroundColor: 'var(--color-card)', border: '1px solid var(--color-border)', color: 'var(--color-foreground)' }} />
              <Legend />
              <Bar dataKey="sales" fill="var(--color-primary)" radius={[8, 8, 0, 0]} />
              <Bar dataKey="orders" fill="var(--color-accent)" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Product Distribution */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h2 className="text-lg font-bold text-foreground mb-6">Product Distribution</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={productData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name} ${value}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {productData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h2 className="text-lg font-bold text-foreground mb-6">Recent Orders</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 font-semibold text-foreground">Order ID</th>
                <th className="text-left py-3 px-4 font-semibold text-foreground">Customer</th>
                <th className="text-left py-3 px-4 font-semibold text-foreground">Amount</th>
                <th className="text-left py-3 px-4 font-semibold text-foreground">Status</th>
                <th className="text-left py-3 px-4 font-semibold text-foreground">Date</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-6 px-4 text-center text-muted-foreground">
                    No orders yet
                  </td>
                </tr>
              ) : (
                recentOrders.map((order, i) => (
                  <tr key={i} className="border-b border-border hover:bg-secondary/50 transition-colors">
                    <td className="py-3 px-4 font-semibold text-primary">{order.order_number}</td>
                    <td className="py-3 px-4">{order.customer_name}</td>
                    <td className="py-3 px-4">₦{order.total_amount.toLocaleString()}</td>
                    <td className="py-3 px-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-muted-foreground">{new Date(order.created_at).toLocaleDateString('en-NG')}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
