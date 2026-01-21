'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import type { Session } from '@supabase/supabase-js'

interface AuthContextType {
  session: Session | null
  isLoading: boolean
  user: any | null
  signIn: (email: string, password: string) => Promise<void>
  signUp: (email: string, password: string, fullName: string) => Promise<void>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Get initial session
    const getSession = async () => {
      try {
        const { data, error } = await supabase.auth.getSession()
        if (error) throw error
        setSession(data.session)
      } catch (error) {
        console.error('Error getting session:', error)
        setSession(null)
      } finally {
        setIsLoading(false)
      }
    }

    getSession()

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => {
      subscription?.unsubscribe()
    }
  }, [])

  const signIn = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      if (error) {
        console.error('Login error:', error)
        // Handle email not confirmed error
        if (error.message.includes('Email not confirmed')) {
          throw new Error('Please confirm your email before logging in. Check your inbox for the confirmation link.')
        }
        throw new Error(error.message)
      }
    } catch (error) {
      console.error('Sign in failed:', error)
      throw error
    }
  }

  const signUp = async (email: string, password: string, fullName: string) => {
    try {
      // Basic validation
      if (!email || !password || !fullName) {
        throw new Error('All fields are required')
      }

      if (password.length < 6) {
        throw new Error('Password must be at least 6 characters long')
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(email)) {
        throw new Error('Please enter a valid email address')
      }

      console.log('Attempting signup with:', { email, fullName })

      const { error, data } = await supabase.auth.signUp({
        email: email.toLowerCase().trim(),
        password,
        options: {
          data: {
            full_name: fullName.trim(),
          }
        }
      })

      if (error) {
        console.error('Supabase signup error:', error)

        // Handle specific error cases
        if (error.message.includes('already registered') || error.message.includes('already been registered')) {
          throw new Error('An account with this email already exists')
        }
        if (error.message.includes('Invalid email') || error.message.includes('invalid email')) {
          throw new Error('Please enter a valid email address')
        }
        if (error.message.includes('Password') || error.message.includes('password')) {
          throw new Error('Password must be at least 6 characters long and contain a mix of letters and numbers')
        }
        if (error.message.includes('rate limit') || error.message.includes('too many requests')) {
          throw new Error('Too many signup attempts. Please wait a few minutes and try again.')
        }

        // For 422 errors, provide a generic message
        if (error.status === 422) {
          throw new Error('Unable to create account. Please check your email and password format.')
        }

        throw new Error(error.message || 'Failed to create account')
      }

      console.log('Signup successful:', data)

      // Create profile only if user was created
      if (data.user) {
        try {
          const { error: profileError } = await supabase.from('profiles').insert({
            id: data.user.id,
            email: data.user.email,
            full_name: fullName.trim(),
          })
          if (profileError) {
            console.error('Profile creation error:', profileError)
            // Don't throw here as the user account was created successfully
          }
        } catch (profileError) {
          console.error('Profile creation failed:', profileError)
        }
      }

    } catch (error: any) {
      console.error('Signup failed:', error)
      throw error
    }
  }

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error
      setSession(null)
    } catch (error) {
      console.error('Sign out failed:', error)
      throw error
    }
  }

  return (
    <AuthContext.Provider
      value={{
        session,
        isLoading,
        user: session?.user || null,
        signIn,
        signUp,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
