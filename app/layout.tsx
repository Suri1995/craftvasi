import React from "react"
import type { Metadata, Viewport } from 'next'
import { Poppins, Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-heading',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-sans',
})

export const metadata: Metadata = {
  title: 'Craftvasi - Interior Design & Construction | Hyderabad',
  description:
    'Premium interior design and construction services in Hyderabad. Transform your space with our expert team.',
  keywords: [
    'interior design',
    'construction',
    'home renovation',
    'Hyderabad',
    'interior studio',
  ],
  authors: [{ name: 'Craftvasi Interior Studio' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://craftvasi.com',
    title: 'Craftvasi - Interior Design & Construction',
    description: 'Premium interior design and construction services in Hyderabad',
    siteName: 'Craftvasi',
  },
    generator: 'v0.app'
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: '#2c2c2c',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${poppins.variable} ${inter.variable}`}>
      <body className="font-sans antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
