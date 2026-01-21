'use client'

import Link from 'next/link'
import { ShoppingCart, Menu, LogOut, User } from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { useCart } from '@/context/cart-context'
import { useAuth } from '@/context/auth-context'
import { useRouter } from 'next/navigation'

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const { totalItems } = useCart()
  const { user, signOut, isLoading } = useAuth()
  const router = useRouter()

  const handleLogout = async () => {
    try {
      await signOut()
      setUserMenuOpen(false)
      router.push('/')
      router.refresh()
    } catch (error) {
      console.error('Logout error:', error)
      alert('Failed to logout. Please try again.')
    }
  }

  return (
    <header className="sticky top-0 z-50 bg-background border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center text-primary-foreground font-bold text-lg">
              🫒
            </div>
            <span className="text-2xl font-bold text-primary hidden sm:inline">Palma</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            <Link href="/" className="px-4 py-2 text-foreground hover:text-primary hover:bg-secondary/50 rounded-lg transition-colors">
              Home
            </Link>
            <Link href="/products" className="px-4 py-2 text-foreground hover:text-primary hover:bg-secondary/50 rounded-lg transition-colors">
              Shop
            </Link>
            <Link href="/about" className="px-4 py-2 text-foreground hover:text-primary hover:bg-secondary/50 rounded-lg transition-colors">
              About
            </Link>
            <Link href="/contact" className="px-4 py-2 text-foreground hover:text-primary hover:bg-secondary/50 rounded-lg transition-colors">
              Contact
            </Link>
          </nav>

          {/* Right Side */}
          <div className="flex items-center gap-4">
            <Link href="/cart" className="relative p-2 hover:bg-secondary/50 rounded-lg transition-colors">
              <ShoppingCart className="w-6 h-6 text-foreground hover:text-primary transition-colors" />
              {totalItems > 0 && (
                <span className="absolute top-1 right-1 bg-accent text-accent-foreground text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>

            {/* User Menu / Auth Links */}
            {!isLoading && (
              <>
                {user ? (
                  <div className="relative">
                    <button
                      onClick={() => setUserMenuOpen(!userMenuOpen)}
                      className="hidden sm:flex items-center gap-2 px-4 py-2 text-foreground hover:bg-secondary/50 rounded-lg transition-colors"
                    >
                      <User className="w-5 h-5" />
                      <span className="text-sm">{user.email?.split('@')[0]}</span>
                    </button>

                    {/* User Dropdown */}
                    {userMenuOpen && (
                      <div className="absolute right-0 mt-2 w-48 bg-card border border-border rounded-lg shadow-lg py-2 z-10">
                        <Link
                          href="/dashboard"
                          className="block px-4 py-2 text-foreground hover:bg-secondary/50 transition-colors text-sm"
                          onClick={() => setUserMenuOpen(false)}
                        >
                          <User className="w-4 h-4 inline mr-2" />
                          Dashboard
                        </Link>
                        <button
                          onClick={handleLogout}
                          className="w-full text-left px-4 py-2 text-foreground hover:bg-secondary/50 transition-colors text-sm"
                        >
                          <LogOut className="w-4 h-4 inline mr-2" />
                          Logout
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="hidden sm:flex items-center gap-2">
                    <Link href="/auth/login">
                      <Button variant="ghost" size="sm">
                        Sign In
                      </Button>
                    </Link>
                    <Link href="/auth/signup">
                      <Button size="sm" className="bg-primary hover:bg-primary/90">
                        Sign Up
                      </Button>
                    </Link>
                  </div>
                )}
              </>
            )}

            <Link href="/admin" className="hidden sm:inline">
              <Button size="sm" variant="outline">
                Admin
              </Button>
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <nav className="md:hidden pb-4 flex flex-col gap-4">
            <Link href="/" className="text-foreground hover:text-primary transition-colors">
              Home
            </Link>
            <Link href="/products" className="text-foreground hover:text-primary transition-colors">
              Shop
            </Link>
            <Link href="/about" className="text-foreground hover:text-primary transition-colors">
              About
            </Link>
            <Link href="/contact" className="text-foreground hover:text-primary transition-colors">
              Contact
            </Link>
            {user ? (
              <>
                <Link href="/dashboard" className="text-foreground hover:text-primary transition-colors">
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-left text-foreground hover:text-primary transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/auth/login" className="text-foreground hover:text-primary transition-colors">
                  Sign In
                </Link>
                <Link href="/auth/signup" className="text-foreground hover:text-primary transition-colors">
                  Sign Up
                </Link>
              </>
            )}
          </nav>
        )}
      </div>
    </header>
  )
}
