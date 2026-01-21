import Header from '@/components/header'
import Footer from '@/components/footer'
import ProductGrid from '@/components/product-grid'
import Hero from '@/components/hero'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Leaf, Heart, Truck } from 'lucide-react'

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />
      <main className="flex-1">
        <Hero />
        <ProductGrid />
        
        {/* Features Section */}
        <section className="py-16 md:py-24 bg-secondary/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto">
                  <Leaf className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground">100% Natural</h3>
                <p className="text-muted-foreground">No additives or preservatives. Pure red palm oil from Nigeria.</p>
              </div>
              
              <div className="text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto">
                  <Heart className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground">Health Benefits</h3>
                <p className="text-muted-foreground">Rich in vitamins and antioxidants for your wellness.</p>
              </div>
              
              <div className="text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto">
                  <Truck className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground">Fast Delivery</h3>
                <p className="text-muted-foreground">Quick shipping across Nigeria with secure packaging.</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24 bg-gradient-to-r from-primary/10 to-accent/10">
          <div className="max-w-4xl mx-auto px-4 text-center space-y-8">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground text-balance">
              Experience Premium Nigerian Red Palm Oil
            </h2>
            <p className="text-xl text-muted-foreground text-pretty">
              Join thousands of satisfied customers who trust Palma for authentic, premium quality red palm oil.
            </p>
            <Link href="/products">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-8">
                Start Shopping
              </Button>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
