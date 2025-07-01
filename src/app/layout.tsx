import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { AuthProvider } from '@/context/AuthContext'
import { CartProvider } from '@/context/CartContext'
import { WishlistProvider } from '@/context/WishlistContext'
import { NewsletterProvider } from '@/context/NewsletterContext'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Vendora - Premium eCommerce Template | Demo Store',
  description: 'Premium eCommerce template showcasing modern design, responsive layout, and professional functionality. Perfect for luxury brands and high-end retail businesses.',
  keywords: 'ecommerce template, premium website design, responsive template, luxury store template, modern ui, business template, online store, retail template',
  authors: [{ name: 'Premium Template Team' }],
  creator: 'Vendora Template',
  publisher: 'Vendora Template',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://vendora.com',
    title: 'Vendora - Premium eCommerce Template | Demo Store',
    description: 'Premium eCommerce template showcasing modern design, responsive layout, and professional functionality. Perfect for luxury brands.',
    siteName: 'Vendora',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vendora - Premium eCommerce Template | Demo Store',
    description: 'Premium eCommerce template showcasing modern design, responsive layout, and professional functionality. Perfect for luxury brands.',
    creator: '@vendora',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <CartProvider>
            <WishlistProvider>
              <NewsletterProvider>
                <div className="min-h-screen flex flex-col">
                  <Header />
                  <main className="flex-1">
                    {children}
                  </main>
                  <Footer />
                </div>
              </NewsletterProvider>
            </WishlistProvider>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  )
}