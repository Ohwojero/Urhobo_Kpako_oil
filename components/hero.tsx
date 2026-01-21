'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import { useProducts } from '@/context/product-context'
import { Card, CardContent } from '@/components/ui/card'
import Image from 'next/image'

export default function Hero() {
  const { products, loading } = useProducts()

  // Get first 3 products for carousel
  const featuredProducts = products.slice(0, 3)

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-primary/10 via-background to-accent/10 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
          alt="Palm oil plantation with trees"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-20 md:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          {/* Content */}
          <div className="space-y-8 text-white">
            <div className="space-y-4">
              <p className="text-sm font-semibold text-primary uppercase tracking-widest">Authentic Urhobo Product</p>
              <h1 className="text-5xl md:text-7xl font-bold leading-tight text-balance">
                Urhobo <span className="text-primary">Kpako TV Oil</span>
              </h1>
              <p className="text-lg text-white/90 text-pretty">
                Sourced directly from the Delta region of Nigeria. Traditional Urhobo methods, pure authenticity, and premium quality in every bottle.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/products" className="w-full sm:w-auto">
                <Button size="lg" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                  Shop Now
                </Button>
              </Link>
              <Link href="/about" className="w-full sm:w-auto">
                <Button size="lg" variant="outline" className="w-full bg-white/10 border-white/20 text-white hover:bg-white/20">
                  Learn More
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/20">
              <div>
                <p className="text-2xl md:text-3xl font-bold text-primary">100%</p>
                <p className="text-sm text-white/80">Natural</p>
              </div>
              <div>
                <p className="text-2xl md:text-3xl font-bold text-primary">25+</p>
                <p className="text-sm text-white/80">Years Legacy</p>
              </div>
              <div>
                <p className="text-2xl md:text-3xl font-bold text-primary">5k+</p>
                <p className="text-sm text-white/80">Happy Customers</p>
              </div>
            </div>
          </div>

          {/* Product Carousel */}
          <div className="relative">
            {!loading && featuredProducts.length > 0 ? (
              <Carousel className="w-full max-w-sm mx-auto">
                <CarouselContent>
                  {featuredProducts.map((product) => (
                    <CarouselItem key={product.id}>
                      <Card className="bg-white/10 backdrop-blur-md border-white/20">
                        <CardContent className="p-6">
                          <div className="aspect-square relative mb-4 rounded-lg overflow-hidden">
                            <Image
                              src={product.image_url || '/placeholder.jpg'}
                              alt={product.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <h3 className="font-semibold text-white mb-2">{product.name}</h3>
                          <p className="text-primary font-bold">₦{product.price.toLocaleString()}</p>
                          <Link href={`/products`}>
                            <Button size="sm" className="w-full mt-4 bg-primary hover:bg-primary/90">
                              View Product
                            </Button>
                          </Link>
                        </CardContent>
                      </Card>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="text-white border-white/20 hover:bg-white/20" />
                <CarouselNext className="text-white border-white/20 hover:bg-white/20" />
              </Carousel>
            ) : (
              <div className="w-full h-96 bg-white/10 backdrop-blur-md rounded-3xl flex items-center justify-center border border-white/20">
                <div className="text-center text-white">
                  <div className="text-6xl mb-4">🫒</div>
                  <p className="text-lg font-medium">Premium Red Palm Oil</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
