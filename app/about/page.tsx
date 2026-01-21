'use client'

import Header from '@/components/header'
import Footer from '@/components/footer'
import { Button } from '@/components/ui/button'
import { CheckCircle, Users, Award, Heart, Leaf, Truck, Shield } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />
      <main className="flex-1">
        {/* Hero Section with Image */}
        <section className="relative min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5 overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0">
            <Image
              src="/about-image.jpg"
              alt="Urhobo community and palm oil production"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black/50"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20"></div>
          </div>

          {/* Content */}
          <div className="relative z-10 flex items-center min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="space-y-8 text-white">
                  <div className="space-y-4">
                    <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-primary px-4 py-2 rounded-full text-sm font-medium">
                      <Heart className="w-4 h-4" />
                      Our Heritage
                    </div>
                    <h1 className="text-5xl md:text-7xl font-bold leading-tight">
                      Authentic <span className="text-primary">Urhobo</span><br />
                      Kpako TV Oil
                    </h1>
                    <p className="text-xl text-white/90 leading-relaxed max-w-lg">
                      Preserving Delta region's rich heritage through traditional methods and modern quality standards. Every bottle tells a story of community, tradition, and excellence.
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <Link href="/products">
                      <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 rounded-xl">
                        Explore Our Products
                      </Button>
                    </Link>
                    <Link href="#story">
                      <Button size="lg" variant="outline" className="border-2 border-white/30 text-white hover:bg-white/10 px-8 py-4 text-lg font-semibold rounded-xl backdrop-blur-sm">
                        Our Story
                      </Button>
                    </Link>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-6">
                  <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 text-center border border-white/20">
                    <div className="text-4xl font-bold text-primary mb-2">50+</div>
                    <div className="text-white/80 font-medium">Years of Tradition</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 text-center border border-white/20">
                    <div className="text-4xl font-bold text-primary mb-2">100%</div>
                    <div className="text-white/80 font-medium">Natural & Pure</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 text-center border border-white/20">
                    <div className="text-4xl font-bold text-primary mb-2">10k+</div>
                    <div className="text-white/80 font-medium">Happy Customers</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 text-center border border-white/20">
                    <div className="text-4xl font-bold text-primary mb-2">24/7</div>
                    <div className="text-white/80 font-medium">Customer Support</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* About Content */}
        <section className="py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
            {/* Mission */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl font-bold mb-6">Our Mission</h2>
                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                  Urhobo Kpako TV Oil is dedicated to bringing authentic, premium Nigerian red palm oil to the world. We believe in preserving traditional methods while maintaining the highest standards of quality and purity.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Every bottle represents our commitment to our customers' health and satisfaction, and our respect for the farmers and communities that make our product possible.
                </p>
              </div>
              <div className="w-full h-64 md:h-96 bg-gradient-to-br from-primary/20 to-accent/20 rounded-xl flex items-center justify-center text-8xl">
                🌍
              </div>
            </div>

            {/* Values */}
            <div>
              <h2 className="text-4xl font-bold mb-12 text-center">Our Values</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  {
                    title: 'Authenticity',
                    description: 'We source directly from trusted Nigerian farmers using traditional methods.',
                  },
                  {
                    title: 'Quality',
                    description: 'Every batch is tested for purity, ensuring you get the best product.',
                  },
                  {
                    title: 'Community',
                    description: 'We support local farmers and communities with fair trade practices.',
                  },
                ].map((value, i) => (
                  <div key={i} className="bg-card border border-border rounded-lg p-6 space-y-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center">
                      <CheckCircle className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold">{value.title}</h3>
                    <p className="text-muted-foreground">{value.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Why Choose Us */}
            <div className="bg-secondary/50 rounded-xl p-12 space-y-8">
              <h2 className="text-4xl font-bold">Why Choose Urhobo Kpako TV Oil?</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[
                  '100% Pure Nigerian Red Palm Oil',
                  'No Additives or Preservatives',
                  'Traditional Cold-Extraction Methods',
                  'Certified Quality Standards',
                  'Fast & Reliable Delivery',
                  'Premium Packaging',
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                    <span className="text-lg">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="text-center space-y-6">
              <h2 className="text-4xl font-bold">Ready to Experience Urhobo Kpako TV Oil?</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Join thousands of satisfied customers who have made Urhobo Kpako TV Oil their trusted source for premium red palm oil.
              </p>
              <Link href="/products">
                <Button size="lg" className="bg-primary hover:bg-primary/90">
                  Shop Now
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
