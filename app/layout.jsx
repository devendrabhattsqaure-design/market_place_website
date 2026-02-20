import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { CartProvider } from '@/context/CartContext'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

/**
 * @type {import('next').Metadata}
 */
export const metadata = {
  title: 'MarketHub - Premium B2B Marketplace',
  description: 'Connect with trusted businesses and find quality products on MarketHub. Safe, secure, and verified marketplace for buyers and sellers.',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

/**
 * Root layout component for the entire application
 * @param {Object} props
 * @param {React.ReactNode} props.children - Child components
 */
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="font-sans antialiased bg-background text-foreground">
        <CartProvider>
          <Navbar />
          <main className="min-h-screen">
            {children}
          </main>
          <Footer />
        </CartProvider>
        <Analytics />
      </body>
    </html>
  )
}
