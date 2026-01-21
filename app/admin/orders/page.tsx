'use client'

import { useState, useEffect } from 'react'
import { Eye, Printer, Download } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { supabase, type Order as SupabaseOrder } from '@/lib/supabase'

interface OrderDisplay {
  id: string
  order_number: string
  customer_name: string
  customer_email: string
  total_amount: number
  status: string
  payment_method: string
  created_at: string
}

export default function AdminOrders() {
  const [orders, setOrders] = useState<OrderDisplay[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedOrder, setSelectedOrder] = useState<OrderDisplay | null>(null)
  const [showDetail, setShowDetail] = useState(false)
  const [updating, setUpdating] = useState(false)

  useEffect(() => {
    fetchOrders()

    // Subscribe to real-time changes on orders table
    const channel = supabase
      .channel('orders')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'orders' },
        (payload) => {
          console.log('Order updated:', payload)
          // Refresh orders when any change occurs
          fetchOrders()
        }
      )
      .subscribe()

    return () => {
      channel.unsubscribe()
    }
  }, [])

  const fetchOrders = async () => {
    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setOrders(data || [])
    } catch (err) {
      console.error('Failed to fetch orders:', err)
      setOrders([])
    } finally {
      setLoading(false)
    }
  }

  const updateOrderStatus = async (orderId: string, newStatus: string) => {
    try {
      setUpdating(true)
      console.log(`Updating order ${orderId} to status: ${newStatus}`)
      
      // Update the UI immediately
      const updatedOrder = { ...selectedOrder!, status: newStatus }
      setSelectedOrder(updatedOrder)
      console.log('Updated selectedOrder:', updatedOrder)
      
      // Then update in database
      const { data, error } = await supabase
        .from('orders')
        .update({ status: newStatus })
        .eq('id', orderId)
        .select()

      if (error) {
        console.error('Update error:', error)
        console.error('Error code:', error.code)
        console.error('Error message:', error.message)
        throw error
      }

      console.log('Update response:', data)
      console.log('Updated in database successfully')

      // Wait a moment then refresh orders from database to sync
      setTimeout(async () => {
        console.log('Fetching orders after update...')
        await fetchOrders()
      }, 500)
    } catch (err) {
      console.error('Failed to update order status:', err)
      alert('Failed to update order status. Check console for details.')
    } finally {
      setUpdating(false)
    }
  }

  const openOrderDetail = (order: OrderDisplay) => {
    setSelectedOrder(order)
    setShowDetail(true)
  }

  const closeOrderDetail = () => {
    setShowDetail(false)
    setSelectedOrder(null)
  }

  const [filterStatus, setFilterStatus] = useState<string>('All')

  const filteredOrders = filterStatus === 'All'
    ? orders
    : orders.filter(o => {
        console.log(`Comparing: "${o.status}" === "${filterStatus}" = ${o.status === filterStatus}`)
        return o.status === filterStatus
      })

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
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Orders</h1>
        <p className="text-muted-foreground mt-2">Manage customer orders and shipments</p>
      </div>

      {/* Filters and Refresh */}
      <div className="flex flex-wrap gap-2 items-center">
        {['All', 'Pending', 'Processing', 'Shipped', 'Delivered'].map(status => (
          <button
            key={status}
            onClick={() => {
              console.log(`Filtering by: ${status}`)
              setFilterStatus(status)
            }}
            className={`px-4 py-2 rounded-lg transition-colors ${
              filterStatus === status
                ? 'bg-primary text-primary-foreground'
                : 'bg-secondary text-foreground hover:bg-secondary/80'
            }`}
          >
            {status} {filterStatus === status && filteredOrders.length > 0 && `(${filteredOrders.length})`}
          </button>
        ))}
        <button
          onClick={() => {
            console.log('Refreshing orders...')
            fetchOrders()
          }}
          className="px-4 py-2 bg-secondary text-foreground rounded-lg hover:bg-secondary/80 transition-colors ml-auto"
        >
          Refresh
        </button>
      </div>

      {/* Orders Table */}
      <div className="bg-card border border-border rounded-lg overflow-hidden">
        {loading ? (
          <div className="p-12 text-center">
            <p className="text-muted-foreground">Loading orders...</p>
          </div>
        ) : filteredOrders.length === 0 ? (
          <div className="p-12 text-center">
            <p className="text-muted-foreground">No orders found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-secondary/50">
                  <th className="text-left py-4 px-6 font-semibold text-foreground">Order ID</th>
                  <th className="text-left py-4 px-6 font-semibold text-foreground">Customer</th>
                  <th className="text-left py-4 px-6 font-semibold text-foreground">Amount</th>
                  <th className="text-left py-4 px-6 font-semibold text-foreground">Payment</th>
                  <th className="text-left py-4 px-6 font-semibold text-foreground">Status</th>
                  <th className="text-left py-4 px-6 font-semibold text-foreground">Date</th>
                  <th className="text-left py-4 px-6 font-semibold text-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order) => (
                  <tr key={order.id} className="border-b border-border hover:bg-secondary/50 transition-colors">
                    <td className="py-4 px-6 font-semibold text-primary">{order.order_number}</td>
                    <td className="py-4 px-6">
                      <div>
                        <p className="font-medium text-foreground">{order.customer_name}</p>
                        <p className="text-xs text-muted-foreground">{order.customer_email}</p>
                      </div>
                    </td>
                    <td className="py-4 px-6 font-bold">₦{order.total_amount.toLocaleString()}</td>
                    <td className="py-4 px-6 text-sm">{order.payment_method}</td>
                    <td className="py-4 px-6">
                      <span className={`px-3 py-1 rounded-lg text-xs font-semibold ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-muted-foreground">{new Date(order.created_at).toLocaleDateString('en-NG')}</td>
                    <td className="py-4 px-6 flex gap-2">
                      <button 
                        onClick={() => openOrderDetail(order)}
                        className="p-2 hover:bg-secondary rounded transition-colors text-primary" 
                        title="View Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-2 hover:bg-secondary rounded transition-colors text-primary" title="Print Order">
                        <Printer className="w-4 h-4" />
                      </button>
                      <button className="p-2 hover:bg-secondary rounded transition-colors text-primary" title="Download Invoice">
                        <Download className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-card border border-border rounded-lg p-4">
          <p className="text-sm text-muted-foreground mb-2">Total Orders</p>
          <p className="text-2xl font-bold text-foreground">{orders.length}</p>
        </div>
        <div className="bg-card border border-border rounded-lg p-4">
          <p className="text-sm text-muted-foreground mb-2">Total Revenue</p>
          <p className="text-2xl font-bold text-foreground">
            ₦{orders.reduce((sum, o) => sum + o.total_amount, 0).toLocaleString()}
          </p>
        </div>
        <div className="bg-card border border-border rounded-lg p-4">
          <p className="text-sm text-muted-foreground mb-2">Pending Orders</p>
          <p className="text-2xl font-bold text-yellow-600">
            {orders.filter(o => o.status === 'Processing' || o.status === 'Pending').length}
          </p>
        </div>
        <div className="bg-card border border-border rounded-lg p-4">
          <p className="text-sm text-muted-foreground mb-2">Delivered</p>
          <p className="text-2xl font-bold text-green-600">
            {orders.filter(o => o.status === 'Delivered').length}
          </p>
        </div>
      </div>

      {/* Order Detail Modal */}
      {showDetail && selectedOrder && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card border border-border rounded-lg max-w-2xl w-full max-h-96 overflow-y-auto">
            <div className="p-6 space-y-6">
              {/* Header */}
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-foreground">{selectedOrder.order_number}</h2>
                  <p className="text-sm text-muted-foreground mt-1">
                    {new Date(selectedOrder.created_at).toLocaleDateString('en-NG')}
                  </p>
                </div>
                <button
                  onClick={closeOrderDetail}
                  className="text-muted-foreground hover:text-foreground text-2xl"
                >
                  ×
                </button>
              </div>

              {/* Customer Info */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Customer Name</p>
                  <p className="font-semibold text-foreground">{selectedOrder.customer_name}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Customer Email</p>
                  <p className="font-semibold text-foreground">{selectedOrder.customer_email}</p>
                </div>
              </div>

              {/* Order Details */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Total Amount</p>
                  <p className="font-bold text-lg text-foreground">₦{selectedOrder.total_amount.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Payment Method</p>
                  <p className="font-semibold text-foreground">{selectedOrder.payment_method}</p>
                </div>
              </div>

              {/* Status Update */}
              <div>
                <p className="text-sm text-muted-foreground mb-3">Update Status</p>
                <div className="flex flex-wrap gap-2">
                  {['Pending', 'Processing', 'Shipped', 'Delivered'].map(status => (
                    <button
                      key={status}
                      onClick={() => updateOrderStatus(selectedOrder.id, status)}
                      disabled={updating}
                      className={`px-4 py-2 rounded-lg transition-colors font-medium ${
                        selectedOrder.status === status
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-secondary text-foreground hover:bg-secondary/80'
                      } ${updating ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>

              {/* Close Button */}
              <button
                onClick={closeOrderDetail}
                className="w-full px-4 py-2 bg-secondary text-foreground rounded-lg hover:bg-secondary/80 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
