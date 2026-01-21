'use client'

import React from "react"

import { useState } from 'react'
import Link from 'next/link'
import Header from '@/components/header'
import Footer from '@/components/footer'
import { Button } from '@/components/ui/button'
import { AlertCircle } from 'lucide-react'
import { useAuth } from '@/context/auth-context'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { useCart } from '@/context/cart-context'

export default function CheckoutPage() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    paymentMethod: 'Paystack',
  })
  const [isProcessing, setIsProcessing] = useState(false)
  const { user } = useAuth()
  const router = useRouter()
  const { cart: cartItems, clearCart, totalPrice } = useCart()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handlePayment = async () => {
    if (!user) {
      alert('Please login to place an order')
      router.push('/auth/login')
      return
    }

    setIsProcessing(true)
    try {
      // Create order in database
      const orderData = {
        user_id: user.id,
        order_number: 'ORD-' + Math.random().toString(36).substr(2, 9).toUpperCase(),
        total_amount: totalPrice,
        shipping_address: formData.address,
        shipping_city: formData.city,
        shipping_state: formData.state,
        shipping_postal_code: formData.zipCode,
        phone_number: formData.phone,
        payment_method: formData.paymentMethod,
        status: 'Pending',
      }

      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert([orderData])
        .select()
        .single()

      if (orderError) throw orderError

      // Add order items
      const orderItems = cartItems.map(item => ({
        order_id: order.id,
        product_id: item.id,
        quantity: item.quantity,
        price_at_purchase: item.price,
      }))

      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItems)

      if (itemsError) {
        console.error('Order items error details:', itemsError)
        throw itemsError
      }

      // Clear cart and redirect
      clearCart()
      alert(`Order placed successfully! Order #${order.order_number}`)
      router.push('/dashboard/orders')
    } catch (err: unknown) {
      let errorMessage = 'Unknown error'
      if (err instanceof Error) {
        errorMessage = err.message
      } else if (typeof err === 'object' && err !== null) {
        errorMessage = JSON.stringify(err)
      }
      console.error('Order creation failed:', errorMessage)
      alert('Failed to place order. Please try again.')
    } finally {
      setIsProcessing(false)
    }
  }

  const subtotal = totalPrice
  const shipping = 1500
  const total = subtotal + shipping

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Steps */}
            <div className="flex gap-4 mb-8">
              {[1, 2].map(s => (
                <button
                  key={s}
                  onClick={() => s <= step && setStep(s)}
                  className={`flex items-center justify-center w-10 h-10 rounded-full font-bold transition-colors ${
                    step >= s
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground'
                  }`}
                >
                  {s}
                </button>
              ))}
              <div className="flex items-center gap-2 ml-4">
                <span className={step >= 1 ? 'text-foreground font-semibold' : 'text-muted-foreground'}>
                  Shipping
                </span>
                <span className="text-muted-foreground">→</span>
                <span className={step >= 2 ? 'text-foreground font-semibold' : 'text-muted-foreground'}>
                  Payment
                </span>
              </div>
            </div>

            {/* Step 1: Shipping Information */}
            {step === 1 && (
              <div className="space-y-4">
                <h2 className="text-xl font-bold">Shipping Information</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground"
                  />
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground"
                  />
                </div>

                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground"
                />

                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground"
                />

                <input
                  type="text"
                  name="address"
                  placeholder="Street Address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground"
                />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <input
                    type="text"
                    name="city"
                    placeholder="City"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground"
                  />
                  <input
                    type="text"
                    name="state"
                    placeholder="State"
                    value={formData.state}
                    onChange={handleInputChange}
                    className="px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground"
                  />
                  <input
                    type="text"
                    name="zipCode"
                    placeholder="ZIP Code"
                    value={formData.zipCode}
                    onChange={handleInputChange}
                    className="px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground"
                  />
                </div>

                <Button
                  onClick={() => setStep(2)}
                  size="lg"
                  className="w-full bg-primary hover:bg-primary/90"
                >
                  Continue to Payment
                </Button>
              </div>
            )}

            {/* Step 2: Payment */}
            {step === 2 && (
              <div className="space-y-4">
                <h2 className="text-xl font-bold">Payment Method</h2>

                <div className="space-y-3">
                  <label className="flex items-center gap-3 p-4 border border-border rounded-lg cursor-pointer hover:bg-muted">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="Paystack"
                      checked={formData.paymentMethod === 'Paystack'}
                      onChange={handleInputChange}
                      className="w-4 h-4"
                    />
                    <div>
                      <p className="font-semibold">Paystack Payment</p>
                      <p className="text-sm text-muted-foreground">
                        Secure online payment with debit/credit card
                      </p>
                    </div>
                  </label>

                  <label className="flex items-center gap-3 p-4 border border-border rounded-lg cursor-pointer hover:bg-muted">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="Cash on Delivery"
                      checked={formData.paymentMethod === 'Cash on Delivery'}
                      onChange={handleInputChange}
                      className="w-4 h-4"
                    />
                    <div>
                      <p className="font-semibold">Pay on Delivery</p>
                      <p className="text-sm text-muted-foreground">
                        Pay when your order arrives
                      </p>
                    </div>
                  </label>
                </div>

                <div className="bg-secondary/50 border border-border rounded-lg p-4 flex gap-3">
                  <AlertCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-foreground">
                    {formData.paymentMethod === 'Paystack'
                      ? 'You will be redirected to Paystack to complete the payment securely.'
                      : 'You will pay in cash when the order is delivered to you.'}
                  </p>
                </div>

                <div className="flex gap-4">
                  <Button
                    onClick={() => setStep(1)}
                    variant="outline"
                    size="lg"
                    className="flex-1"
                  >
                    Back
                  </Button>
                  <Button
                    onClick={handlePayment}
                    disabled={isProcessing}
                    size="lg"
                    className="flex-1 bg-primary hover:bg-primary/90"
                  >
                    {isProcessing ? 'Processing...' : formData.paymentMethod === 'Paystack' ? 'Pay with Paystack' : 'Place Order'}
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-card border border-border rounded-lg p-6 sticky top-20 space-y-4">
              <h2 className="text-xl font-bold">Order Summary</h2>

              <div className="space-y-3 max-h-48 overflow-y-auto">
                {cartItems.length > 0 ? (
                  cartItems.map(item => (
                    <div key={item.id} className="bg-secondary/50 rounded-lg p-3 flex gap-3">
                      <div className="text-3xl">🫒</div>
                      <div className="flex-1">
                        <p className="font-semibold text-sm">{item.name}</p>
                        <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                      </div>
                      <p className="font-bold">₦{(item.price * item.quantity).toLocaleString()}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-muted-foreground text-sm">No items in cart</p>
                )}
              </div>

              <div className="border-t border-border pt-4 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>₦{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>₦{shipping.toLocaleString()}</span>
                </div>
              </div>

              <div className="border-t border-border pt-4 flex justify-between font-bold text-lg">
                <span>Total</span>
                <span className="text-primary">₦{total.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
