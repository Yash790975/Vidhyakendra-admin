'use client'

import React from "react"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Eye, EyeOff } from 'lucide-react'

export default function LoginPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [emailOrMobile, setEmailOrMobile] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement actual authentication
    router.push('/dashboard')
  }

  return (
    <div className="flex min-h-screen">
      {/* Left Side - Branding */}
      <div className="relative hidden lg:flex lg:w-1/2 bg-gradient-to-br from-[#1897C6] to-[#67BAC3] p-12 flex-col justify-between overflow-hidden">
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute left-10 top-10 h-64 w-64 animate-pulse rounded-full bg-white blur-3xl"></div>
          <div className="absolute bottom-10 right-10 h-64 w-64 animate-pulse rounded-full bg-white blur-3xl [animation-delay:1s]"></div>
        </div>

        <div className="relative z-10">
          <img
            src="/vidhyakendra-logo.png"
            alt="VidhyaKendra"
            className="h-16 w-auto object-contain brightness-0 invert drop-shadow-lg"
          />
        </div>
        <div className="relative z-10 text-white">
          <h1 className="text-5xl font-bold mb-6 text-balance leading-tight">
            Streamline Your Institute Management
          </h1>
          <p className="text-xl text-white/90 leading-relaxed">
            Manage students, teachers, attendance, and everything in between with our comprehensive admin panel.
          </p>
          <div className="mt-8 grid grid-cols-2 gap-4">
            <div className="rounded-lg bg-white/10 p-4 backdrop-blur-sm">
              <div className="text-3xl font-bold">1000+</div>
              <div className="text-sm text-white/80">Active Students</div>
            </div>
            <div className="rounded-lg bg-white/10 p-4 backdrop-blur-sm">
              <div className="text-3xl font-bold">50+</div>
              <div className="text-sm text-white/80">Expert Teachers</div>
            </div>
          </div>
        </div>
        <div className="relative z-10 text-white/80 text-sm font-medium">
          Learn • Grow • Succeed
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-background">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="mb-8 flex justify-center lg:hidden">
            <img
              src="/vidhyakendra-logo.png"
              alt="VidhyaKendra"
              className="h-14 w-auto object-contain"
            />
          </div>

          <Card className="border-border shadow-lg">
            <CardHeader className="space-y-2 text-center pb-8">
              <CardTitle className="text-3xl font-bold tracking-tight">Welcome Back</CardTitle>
              <CardDescription className="text-base">
                Enter your credentials to access admin panel
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="emailOrMobile">Email or Mobile Number</Label>
                  <Input
                    id="emailOrMobile"
                    type="text"
                    placeholder="admin@institute.com or +91 98765 43210"
                    value={emailOrMobile}
                    onChange={(e) => setEmailOrMobile(e.target.value)}
                    required
                    className="h-11"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                    <Link
                      href="/forgot-password"
                      className="text-sm text-primary hover:underline"
                    >
                      Forgot?
                    </Link>
                  </div>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="h-11 pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full h-11 bg-primary hover:bg-primary/90"
                  size="lg"
                >
                  Sign In
                </Button>
              </form>

              <div className="mt-6 text-center text-sm text-muted-foreground">
                Need help?{' '}
                <Link href="/support" className="text-primary hover:underline">
                  Contact Support
                </Link>
              </div>
            </CardContent>
          </Card>

          <p className="mt-6 text-center text-xs text-muted-foreground">
            © 2024 VidhyaKendra. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  )
}
