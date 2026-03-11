import React from "react"
import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
// import { Analytics } from '@vercel/analytics/next'
// import { AuthProvider } from '@/lib/auth-context'
import './globals.css'

const _geist = Geist({ subsets: ['latin'] })
const _geistMono = Geist_Mono({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'VidhyaKendra - School & Coaching Management System',
  description: 'Professional CMS-style admin panel for managing schools and coaching centers',
  generator: 'Next.js',
   icons: {
    icon: [ 
      {
        url: '/vidhyakendra-logo.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/vidhyakendra-logo.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/vidhyakendra-logo.png',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}   

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans antialiased" suppressHydrationWarning>{children}</body>
    </html>
  )
}
