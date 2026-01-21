'use client'

import Header from '@/components/header'
import Footer from '@/components/footer'
import { Button } from '@/components/ui/button'
import { CheckCircle } from 'lucide-react'
import Link from 'next/link'

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-secondary to-background py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center space-y-4 max-w-2xl mx-auto">
              <h1 className="text-5xl md:text-6xl font-bold">Our Story</h1>
              <p className="text-lg text-muted-foreground">
                Preserving Nigerian heritage, one bottle at a time
              </p>
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
                  Palma is dedicated to bringing authentic, premium Nigerian red palm oil to the world. We believe in preserving traditional methods while maintaining the highest standards of quality and purity.
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
              <h2 className="text-4xl font-bold">Why Choose Palma?</h2>
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
              <h2 className="text-4xl font-bold">Ready to Experience Palma?</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Join thousands of satisfied customers who have made Palma their trusted source for premium red palm oil.
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
