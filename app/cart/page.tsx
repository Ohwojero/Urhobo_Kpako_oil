'use client'

import Link from 'next/link'
import Header from '@/components/header'
import Footer from '@/components/footer'
import { Button } from '@/components/ui/button'
import { Trash2, Plus, Minus } from 'lucide-react'
import { useCart } from '@/context/cart-context'
import { useProducts } from '@/context/product-context'

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity } = useCart()

  const cartItems = cart; // Declare cartItems variable
  const removeItem = removeFromCart; // Declare removeItem variable

  const subtotal = cart.reduce((sum, item) => sum + Number(item.price) * item.quantity, 0)
  const shipping = subtotal > 0 ? 1500 : 0
  const total = subtotal + shipping

  if (cart.length === 0) {
    return (
      <div className="flex flex-col min-h-screen bg-background text-foreground">
        <Header />
        <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full">
          <div className="text-center space-y-6">
            <h1 className="text-3xl font-bold">Your cart is empty</h1>
            <p className="text-muted-foreground">Start shopping to add items to your cart</p>
            <Link href="/products">
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                Continue Shopping
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map(item => (
              <div key={item.id} className="bg-card border border-border rounded-lg p-6 flex gap-6">
                <div className="w-24 h-24 bg-gradient-to-br from-accent/10 to-primary/10 rounded-lg flex items-center justify-center text-4xl flex-shrink-0">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover rounded-lg"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none'
                      const fallback = e.currentTarget.nextElementSibling as HTMLElement
                      if (fallback) {
                        fallback.style.display = 'flex'
                      }
                    }}
                  />
                  <div className="hidden w-full h-full items-center justify-center text-4xl">
                    🫒
                  </div>
                </div>

                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-2">{item.name}</h3>
                  <p className="text-primary font-bold text-lg mb-4">
                    ₦{Number(item.price).toLocaleString()}
                  </p>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={async () => await updateQuantity(item.id, item.quantity - 1)}
                      className="p-1 hover:bg-muted rounded"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <button
                      onClick={async () => await updateQuantity(item.id, item.quantity + 1)}
                      className="p-1 hover:bg-muted rounded"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="text-right flex flex-col justify-between">
                  <button
                    onClick={async () => await removeFromCart(item.id)}
                    className="text-destructive hover:bg-destructive/10 p-2 rounded"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                  <p className="font-bold">
                    ₦{(Number(item.price) * item.quantity).toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-card border border-border rounded-lg p-6 sticky top-20 space-y-4">
              <h2 className="text-xl font-bold">Order Summary</h2>

              {/* Cart Items Preview */}
              <div className="space-y-3">
                {cart.slice(0, 3).map(item => (
                  <div key={item.id} className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-accent/10 to-primary/10 rounded flex items-center justify-center text-sm flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover rounded"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{item.name}</p>
                      <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                    </div>
                    <p className="text-sm font-medium">₦{(item.price * item.quantity).toLocaleString()}</p>
                  </div>
                ))}
                {cart.length > 3 && (
                  <p className="text-xs text-muted-foreground text-center">
                    +{cart.length - 3} more item{cart.length - 3 > 1 ? 's' : ''}
                  </p>
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

              <Link href="/checkout" className="w-full">
                <Button size="lg" className="w-full bg-primary hover:bg-primary/90">
                  Proceed to Checkout
                </Button>
              </Link>

              <Link href="/products">
                <Button size="lg" variant="outline" className="w-full bg-transparent">
                  Continue Shopping
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
