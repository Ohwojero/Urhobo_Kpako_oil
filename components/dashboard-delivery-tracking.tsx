'use client'

import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Package, Truck, CheckCircle, Clock } from 'lucide-react'
import type { Order } from '@/lib/supabase'

interface DeliveryTrackingProps {
  order: Order
}

export function DeliveryTracking({ order }: DeliveryTrackingProps) {
  const steps = [
    { status: 'Pending', icon: Clock, label: 'Order Placed' },
    { status: 'Processing', icon: Package, label: 'Processing' },
    { status: 'Shipped', icon: Truck, label: 'Shipped' },
    { status: 'Delivered', icon: CheckCircle, label: 'Delivered' },
  ]

  const currentStepIndex = steps.findIndex(s => s.status === order.status)

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold text-foreground mb-6">Delivery Status</h3>

      <div className="space-y-6">
        {steps.map((step, index) => {
          const Icon = step.icon
          const isCompleted = index <= currentStepIndex
          const isActive = index === currentStepIndex

          return (
            <div key={step.status}>
              <div className="flex items-center gap-4">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    isActive
                      ? 'bg-primary text-primary-foreground'
                      : isCompleted
                        ? 'bg-green-100 text-green-700'
                        : 'bg-muted text-muted-foreground'
                  }`}
                >
                  <Icon className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-foreground">{step.label}</p>
                  <p className="text-sm text-muted-foreground">
                    {isActive && 'In progress'}
                    {isCompleted && !isActive && 'Completed'}
                    {!isCompleted && 'Pending'}
                  </p>
                </div>
              </div>
              {index < steps.length - 1 && (
                <div
                  className={`ml-6 h-8 border-l-2 ${isCompleted ? 'border-green-200' : 'border-muted'}`}
                ></div>
              )}
            </div>
          )
        })}
      </div>

      <div className="mt-6 p-4 bg-secondary/30 rounded-lg">
        <p className="text-sm text-muted-foreground">
          <span className="font-semibold text-foreground">Estimated Delivery:</span> 3-5 business
          days
        </p>
      </div>
    </Card>
  )
}
