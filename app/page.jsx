'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Search, TrendingUp, Users, ShieldCheck, Sparkles } from 'lucide-react'
import { mockBusinesses } from '@/lib/mockData'
import BusinessCard from '@/components/business/BusinessCard'
import { FeedbackModal } from '@/components/ui/FeedbackModal'
import { Sparkle } from '@/components/ui/Sparkle'

export default function BuyerHome() {
  const [searchQuery, setSearchQuery] = useState('')
  const [filteredBusinesses, setFilteredBusinesses] = useState(mockBusinesses)
  const [stats, setStats] = useState({ activeBusinesses: 0, totalProducts: 0, buyersSaved: 0 })
  const [feedbackOpen, setFeedbackOpen] = useState(false)
  const [sparklePos, setSparklePos] = useState({ x: 0, y: 0 })
  const [showSparkle, setShowSparkle] = useState(false)
  const [interactionCount, setInteractionCount] = useState(0)

  useEffect(() => {
    // Calculate stats with animation
    const totalProducts = mockBusinesses.reduce((sum, b) => sum + b.products.length, 0)
    setStats({
      activeBusinesses: mockBusinesses.length,
      totalProducts: totalProducts,
      buyersSaved: 1240,
    })

    // Show feedback after some interactions
    const timer = setTimeout(() => {
      if (interactionCount >= 2) {
        setFeedbackOpen(true)
      }
    }, 3000)

    return () => clearTimeout(timer)
  }, [interactionCount])

  useEffect(() => {
    const filtered = mockBusinesses.filter(
      (business) =>
        business.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        business.products.some((p) => p.name.toLowerCase().includes(searchQuery.toLowerCase()))
    )
    setFilteredBusinesses(filtered)
  }, [searchQuery])

  const handleSearchInteraction = (e) => {
    setInteractionCount(prev => prev + 1)

    const rect = e.currentTarget.getBoundingClientRect()
    const x = rect.left + rect.width / 2
    const y = rect.top + rect.height / 2

    setSparklePos({ x, y })
    setShowSparkle(true)
    setTimeout(() => setShowSparkle(false), 600)
  }

  return (
    <>
      {showSparkle && <Sparkle x={sparklePos.x} y={sparklePos.y} color="#6D9E51" />}

      <div className="min-h-screen bg-muted/30">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/10 via-white to-accent/5 py-16 fade-in relative overflow-hidden">
          {/* Animated background elements */}
          <div className="absolute top-20 right-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl float"></div>
          <div className="absolute bottom-0 left-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl float" style={{ animationDelay: '1s' }}></div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-12">
              <div className="inline-block mb-4 px-4 py-1 bg-primary/10 rounded-full">
                <p className="text-sm font-semibold text-primary flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  Welcome to MarketHub
                </p>
              </div>

              <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-4 leading-tight">
                Discover <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Trusted Businesses</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
                Browse premium products from verified businesses. Safe, secure, and transparent marketplace for quality goods.
              </p>
            </div>

            {/* Interactive Search Bar */}
            <div className="max-w-3xl mx-auto mb-12 scale-in">
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-accent rounded-lg blur opacity-0 group-hover:opacity-75 transition duration-300"></div>
                <div className="relative bg-white rounded-lg p-1">
                  <div className="relative flex items-center">
                    <Search className="absolute left-4 w-5 h-5 text-muted-foreground" />
                    <input
                      type="text"
                      placeholder="Search businesses, products, categories..."
                      value={searchQuery}
                      onChange={(e) => {
                        setSearchQuery(e.target.value)
                        handleSearchInteraction(e)
                      }}
                      onClick={handleSearchInteraction}
                      className="w-full pl-12 pr-6 py-4 border-0 focus:outline-none focus:ring-0 text-foreground placeholder-muted-foreground font-medium"
                    />
                  </div>
                </div>
              </div>
            </div>

          {/* Stats with glow effect */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="card-hover bg-white rounded-lg p-6 border border-border glow-pulse">
              <div className="flex items-center justify-between mb-3">
                <ShieldCheck className="w-8 h-8 text-success pulse-scale" />
                <span className="text-3xl font-bold text-primary">{stats.activeBusinesses}</span>
              </div>
              <p className="text-muted-foreground text-sm font-medium">Verified Businesses</p>
            </div>

            <div className="card-hover bg-white rounded-lg p-6 border border-border glow-pulse">
              <div className="flex items-center justify-between mb-3">
                <TrendingUp className="w-8 h-8 text-primary pulse-scale" />
                <span className="text-3xl font-bold text-primary">{stats.totalProducts}</span>
              </div>
              <p className="text-muted-foreground text-sm font-medium">Premium Products</p>
            </div>

            <div className="card-hover bg-white rounded-lg p-6 border border-border glow-pulse">
              <div className="flex items-center justify-between mb-3">
                <Users className="w-8 h-8 text-accent pulse-scale" />
                <span className="text-3xl font-bold text-primary">{stats.buyersSaved}</span>
              </div>
              <p className="text-muted-foreground text-sm font-medium">Satisfied Buyers</p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust & Safety Banner */}
      <section className="bg-success/5 border-y border-success py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="md:flex-1">
              <h3 className="text-lg font-bold text-foreground mb-2 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-success" />
                Your Safety is Our Priority
              </h3>
              <p className="text-muted-foreground text-sm">
                All businesses on MarketHub are verified. We ensure safe transactions and buyer protection on every purchase.
              </p>
            </div>
            <div className="flex items-center gap-4 text-sm text-success">
              <div>✓ Verified Sellers</div>
              <div>✓ Secure Payments</div>
              <div>✓ Buyer Protection</div>
            </div>
          </div>
        </div>
      </section>

      {/* Businesses Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-2">Featured Businesses</h2>
            <p className="text-muted-foreground">
              {filteredBusinesses.length} of {mockBusinesses.length} businesses matching your search
            </p>
          </div>

          {filteredBusinesses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 slide-up">
              {filteredBusinesses.map((business) => (
                <BusinessCard key={business.id} business={business} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
              <h3 className="text-lg font-semibold text-foreground mb-2">No businesses found</h3>
              <p className="text-muted-foreground mb-4">Try searching with different keywords</p>
              <button
                onClick={() => setSearchQuery('')}
                className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-opacity-90 transition-all button-hover"
              >
                View All Businesses
              </button>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary text-white py-12 mt-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Are You a Business Owner?</h2>
          <p className="text-lg mb-6 opacity-90">
            Join thousands of verified sellers on MarketHub and reach more customers today.
          </p>
          <Link href="/signup">
            <button className="bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-all button-hover">
              Register Your Business
            </button>
          </Link>
        </div>
      </section>
    </div>

    <FeedbackModal
      isOpen={feedbackOpen}
      onClose={() => setFeedbackOpen(false)}
      title="How's Your Experience?"
      message="Help us improve MarketHub for you"
      context="general"
    />
    </>
  )
}
