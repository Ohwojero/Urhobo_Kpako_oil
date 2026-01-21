'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-primary/10 via-background to-accent/10 py-20 md:py-32 overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent/20 rounded-full blur-3xl"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <p className="text-sm font-semibold text-primary uppercase tracking-widest">Premium Nigerian Product</p>
              <h1 className="text-5xl md:text-7xl font-bold text-foreground leading-tight text-balance">
                Pure <span className="text-primary">Red Palm Oil</span>
              </h1>
              <p className="text-lg text-muted-foreground text-pretty">
                Sourced directly from the heart of Nigeria. Premium quality, traditional methods, and pure authenticity in every bottle.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/products" className="w-full sm:w-auto">
                <Button size="lg" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                  Shop Now
                </Button>
              </Link>
              <Link href="/about" className="w-full sm:w-auto">
                <Button size="lg" variant="outline" className="w-full bg-transparent">
                  Learn More
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border/30">
              <div>
                <p className="text-2xl md:text-3xl font-bold text-primary">100%</p>
                <p className="text-sm text-muted-foreground">Natural</p>
              </div>
              <div>
                <p className="text-2xl md:text-3xl font-bold text-primary">25+</p>
                <p className="text-sm text-muted-foreground">Years Legacy</p>
              </div>
              <div>
                <p className="text-2xl md:text-3xl font-bold text-primary">5k+</p>
                <p className="text-sm text-muted-foreground">Happy Customers</p>
              </div>
            </div>
          </div>

          {/* Image Placeholder */}
          <div className="relative">
            <div className="w-full h-96 md:h-[500px] bg-gradient-to-br from-primary/30 to-accent/30 rounded-3xl flex items-center justify-center border border-border overflow-hidden backdrop-blur-sm">
              <div className="text-center">
                <div className="text-8xl md:text-9xl mb-4 drop-shadow-lg">🫒</div>
                <p className="text-muted-foreground text-lg font-medium">Premium Red Palm Oil</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
