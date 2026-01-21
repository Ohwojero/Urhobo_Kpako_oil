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
        <section className="py-20 md:py-32 bg-gradient-to-br from-secondary/20 via-background to-secondary/10 relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-10 left-10 w-20 h-20 bg-primary/30 rounded-full blur-2xl"></div>
            <div className="absolute bottom-10 right-10 w-32 h-32 bg-accent/20 rounded-full blur-3xl"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-primary/10 rounded-full blur-3xl"></div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            {/* Section Header */}
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Leaf className="w-4 h-4" />
                Why Choose Us
              </div>
              <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
                Premium Quality <span className="text-primary">Guaranteed</span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Experience the difference with our authentic Urhobo Kpako TV Oil, crafted with traditional methods and modern quality standards.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
              {/* 100% Natural */}
              <div className="group text-center space-y-6 p-8 rounded-3xl bg-card/50 backdrop-blur-sm border border-border/50 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 hover:-translate-y-2">
                <div className="relative mx-auto w-20 h-20">
                  <div className="absolute inset-0 bg-gradient-to-br from-green-400 to-green-600 rounded-2xl rotate-6 group-hover:rotate-12 transition-transform duration-500"></div>
                  <div className="relative w-full h-full rounded-2xl bg-gradient-to-br from-green-500 to-green-700 flex items-center justify-center shadow-lg">
                    <Leaf className="w-10 h-10 text-white" />
                  </div>
                </div>
                <div className="space-y-3">
                  <h3 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors">100% Natural</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    No additives, preservatives, or chemicals. Pure, unrefined red palm oil sourced directly from traditional Urhobo farms in the Delta region.
                  </p>
                  <div className="flex justify-center">
                    <div className="flex items-center gap-1 text-green-600 font-semibold">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-sm">Certified Organic</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Health Benefits */}
              <div className="group text-center space-y-6 p-8 rounded-3xl bg-card/50 backdrop-blur-sm border border-border/50 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 hover:-translate-y-2">
                <div className="relative mx-auto w-20 h-20">
                  <div className="absolute inset-0 bg-gradient-to-br from-red-400 to-pink-600 rounded-2xl -rotate-6 group-hover:-rotate-12 transition-transform duration-500"></div>
                  <div className="relative w-full h-full rounded-2xl bg-gradient-to-br from-red-500 to-pink-700 flex items-center justify-center shadow-lg">
                    <Heart className="w-10 h-10 text-white" />
                  </div>
                </div>
                <div className="space-y-3">
                  <h3 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors">Health Benefits</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Rich in Vitamin A, E, and antioxidants. Supports immune health, skin vitality, and provides essential nutrients for overall wellness.
                  </p>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="bg-red-50 text-red-700 px-2 py-1 rounded-full font-medium">Vitamin A</div>
                    <div className="bg-pink-50 text-pink-700 px-2 py-1 rounded-full font-medium">Antioxidants</div>
                  </div>
                </div>
              </div>

              {/* Fast Delivery */}
              <div className="group text-center space-y-6 p-8 rounded-3xl bg-card/50 backdrop-blur-sm border border-border/50 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 hover:-translate-y-2">
                <div className="relative mx-auto w-20 h-20">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl rotate-3 group-hover:rotate-6 transition-transform duration-500"></div>
                  <div className="relative w-full h-full rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center shadow-lg">
                    <Truck className="w-10 h-10 text-white" />
                  </div>
                </div>
                <div className="space-y-3">
                  <h3 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors">Fast Delivery</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Express shipping across Nigeria with eco-friendly packaging. Track your order in real-time and receive within 2-5 business days.
                  </p>
                  <div className="flex justify-center">
                    <div className="flex items-center gap-1 text-blue-600 font-semibold">
                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                      <span className="text-sm">2-5 Days Delivery</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>


          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 md:py-32 bg-gradient-to-br from-primary/5 via-accent/5 to-primary/10 relative overflow-hidden">
          {/* Background Elements */}
          <div className="absolute inset-0">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary/5 to-transparent"></div>
            <div className="absolute top-10 right-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-10 left-10 w-48 h-48 bg-accent/10 rounded-full blur-2xl"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-primary/5 to-accent/5 rounded-full blur-3xl"></div>
          </div>

          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center space-y-12">
              {/* Main Content */}
              <div className="space-y-8">
                <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-6 py-3 rounded-full text-sm font-medium">
                  <Heart className="w-4 h-4" />
                  Customer Favorite
                </div>

                <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground text-balance leading-tight">
                  Experience <span className="text-primary">Authentic</span><br />
                  Urhobo Kpako TV Oil
                </h2>

                <p className="text-xl md:text-2xl text-muted-foreground text-pretty max-w-4xl mx-auto leading-relaxed">
                  Join thousands of satisfied customers who trust our traditional Urhobo methods for authentic, premium quality red palm oil.
                  Sourced from the heart of the Delta region with generations of expertise.
                </p>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
                <div className="text-center p-6 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
                  <div className="text-3xl md:text-4xl font-bold text-primary mb-2">10k+</div>
                  <div className="text-sm text-muted-foreground font-medium">Happy Customers</div>
                  <div className="w-full bg-primary/20 h-1 rounded-full mt-3">
                    <div className="w-full bg-primary h-1 rounded-full animate-pulse"></div>
                  </div>
                </div>

                <div className="text-center p-6 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
                  <div className="text-3xl md:text-4xl font-bold text-primary mb-2">50+</div>
                  <div className="text-sm text-muted-foreground font-medium">Years Experience</div>
                  <div className="w-full bg-primary/20 h-1 rounded-full mt-3">
                    <div className="w-full bg-primary h-1 rounded-full animate-pulse"></div>
                  </div>
                </div>

                <div className="text-center p-6 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
                  <div className="text-3xl md:text-4xl font-bold text-primary mb-2">100%</div>
                  <div className="text-sm text-muted-foreground font-medium">Natural</div>
                  <div className="w-full bg-primary/20 h-1 rounded-full mt-3">
                    <div className="w-full bg-primary h-1 rounded-full animate-pulse"></div>
                  </div>
                </div>

                <div className="text-center p-6 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
                  <div className="text-3xl md:text-4xl font-bold text-primary mb-2">24/7</div>
                  <div className="text-sm text-muted-foreground font-medium">Support</div>
                  <div className="w-full bg-primary/20 h-1 rounded-full mt-3">
                    <div className="w-full bg-primary h-1 rounded-full animate-pulse"></div>
                  </div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-8">
                <Link href="/products">
                  <Button size="lg" className="bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-primary-foreground px-12 py-4 text-lg font-semibold shadow-xl hover:shadow-2xl hover:shadow-primary/30 transition-all duration-300 rounded-xl group">
                    <span>Start Shopping Now</span>
                    <div className="ml-2 w-5 h-5 rounded-full bg-white/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                      →
                    </div>
                  </Button>
                </Link>

                <Link href="/about">
                  <Button size="lg" variant="outline" className="border-2 border-primary/50 text-primary hover:bg-primary/5 px-12 py-4 text-lg font-semibold rounded-xl backdrop-blur-sm">
                    Learn Our Story
                  </Button>
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="pt-12 border-t border-border/30">
                <p className="text-sm text-muted-foreground mb-6">Trusted by families across Nigeria</p>
                <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-bold">✓</span>
                    </div>
                    <span className="text-sm font-medium">Certified Organic</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-bold">✓</span>
                    </div>
                    <span className="text-sm font-medium">Quality Assured</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-bold">✓</span>
                    </div>
                    <span className="text-sm font-medium">Traditional Methods</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
