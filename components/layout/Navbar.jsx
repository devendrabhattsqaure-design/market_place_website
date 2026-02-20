'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { Menu, X, LogOut, Store } from 'lucide-react'

export default function Navbar() {
  const pathname = usePathname()
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const [user, setUser] = useState(null)

  // ✅ Load user from localStorage safely after mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    setUser(null)
    router.push('/')
    setIsOpen(false)
  }

  const isBusinessPage =
    pathname.includes('/dashboard') ||
    pathname.includes('/signup') ||
    pathname.includes('/login')

  return (
    <nav className="sticky top-0 z-50 w-full bg-white border-b border-border shadow-sm fade-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center transition-transform group-hover:scale-110">
              <Store className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-lg text-foreground hidden sm:inline">
              MarketHub
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {!user || user.role === 'buyer' ? (
              <>
                <Link href="/" className="text-foreground hover:text-primary">
                  Buyer Home
                </Link>

                <Link href="/about" className="text-foreground hover:text-primary">
                  About
                </Link>

                <Link href="/contact" className="text-foreground hover:text-primary">
                  Contact
                </Link>

                {!user && (
                  <>
                    <Link href="/login" className="text-foreground hover:text-primary">
                      Business Login
                    </Link>

                    <Link
                      href="/signup"
                      className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-opacity-90 transition-all"
                    >
                      Register Business
                    </Link>
                  </>
                )}
              </>
            ) : (
              <>
                <Link
                  href="/dashboard"
                  className="text-foreground hover:text-primary"
                >
                  Dashboard
                </Link>
                <span className="text-sm text-muted-foreground">
                  Welcome, {user.name || 'Business'}
                </span>
              </>
            )}

            {user && (
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 text-foreground hover:text-accent transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-foreground p-2 hover:bg-muted rounded-lg"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pb-4">
            <div className="flex flex-col gap-3 pt-2">

              {!user || user.role === 'buyer' ? (
                <>
                  <Link href="/" onClick={() => setIsOpen(false)}>
                    Buyer Home
                  </Link>

                  {!user && (
                    <>
                      <Link href="/login" onClick={() => setIsOpen(false)}>
                        Business Login
                      </Link>

                      <Link
                        href="/signup"
                        onClick={() => setIsOpen(false)}
                        className="bg-primary text-white px-3 py-2 rounded-lg"
                      >
                        Register Business
                      </Link>
                    </>
                  )}
                </>
              ) : (
                <>
                  <Link
                    href="/dashboard"
                    onClick={() => setIsOpen(false)}
                  >
                    Dashboard
                  </Link>

                  <div className="text-sm text-muted-foreground">
                    Welcome, {user.name || 'Business'}
                  </div>
                </>
              )}

              {user && (
                <button onClick={handleLogout}>
                  Logout
                </button>
              )}

            </div>
          </div>
        )}
      </div>
    </nav>
  )
}