'use client'

import { Award, Heart, Zap, Users, TrendingUp, Shield } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

export default function AboutPage() {
  const [activeValue, setActiveValue] = useState(0)

  const values = [
    {
      icon: <Heart className="w-8 h-8" />,
      title: 'Trust First',
      description: 'Every business is verified. We prioritize your safety and satisfaction above all.',
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: 'Innovation',
      description: 'Cutting-edge technology for seamless buying and selling experiences.',
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Community',
      description: 'Building a vibrant marketplace where businesses and buyers thrive together.',
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: 'Security',
      description: 'Industry-leading security standards to protect every transaction.',
    },
  ]

  const team = [
    {
      name: 'Sarah Johnson',
      role: 'Founder & CEO',
      image: '👩‍💼',
    },
    {
      name: 'Mike Chen',
      role: 'CTO',
      image: '👨‍💻',
    },
    {
      name: 'Emma Wilson',
      role: 'Head of Trust & Safety',
      image: '👩‍⚖️',
    },
    {
      name: 'David Kumar',
      role: 'VP of Operations',
      image: '👨‍📊',
    },
  ]

  return (
    <div className="min-h-screen bg-background fade-in">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5"></div>
        <div className="absolute top-10 right-20 w-72 h-72 bg-primary/10 rounded-full blur-3xl float"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl" style={{ animationName: 'float', animationDelay: '1s' }}></div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 slide-up text-balance">
            Revolutionizing Commerce Through <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Trust</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mb-8 slide-up">
            MarketHub is a premium B2B marketplace connecting verified businesses with buyers worldwide. We believe in transparent transactions, verified sellers, and buyer protection.
          </p>

          <div className="flex flex-wrap gap-4 slide-up">
            <Link href="/signup" className="px-8 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-all button-hover">
              Join Us
            </Link>
            <Link href="/" className="px-8 py-3 border-2 border-primary text-primary rounded-lg font-semibold hover:bg-primary/5 transition-all">
              Browse Businesses
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { label: 'Verified Businesses', value: '500+' },
              { label: 'Premium Products', value: '2,500+' },
              { label: 'Safe Transactions', value: '50K+' },
              { label: 'Satisfied Buyers', value: '25K+' },
            ].map((stat, i) => (
              <div key={i} className="text-center card-hover">
                <p className="text-4xl font-bold text-primary mb-2 bounce-text" style={{ animationDelay: `${i * 0.1}s` }}>
                  {stat.value}
                </p>
                <p className="text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-foreground mb-4 text-center slide-up">Our Core Values</h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto slide-up">
            These principles guide everything we do at MarketHub
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {values.map((value, i) => (
              <div
                key={i}
                onClick={() => setActiveValue(i)}
                className={`p-8 rounded-lg border-2 transition-all duration-300 cursor-pointer card-hover ${
                  activeValue === i
                    ? 'border-primary bg-primary/5'
                    : 'border-border bg-white'
                }`}
              >
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 transition-colors ${
                  activeValue === i
                    ? 'bg-primary text-white'
                    : 'bg-muted text-primary'
                }`}>
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">{value.title}</h3>
                <p className="text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Started */}
      <section className="py-20 bg-white border-y border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-foreground mb-12 text-center slide-up">Our Story</h2>

          <div className="space-y-8">
            <div className="flex gap-6 md:gap-12 items-start slide-up">
              <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center flex-shrink-0 font-bold text-lg">
                1
              </div>
              <div>
                <h3 className="text-xl font-bold text-foreground mb-2">Founded in 2023</h3>
                <p className="text-muted-foreground">
                  MarketHub was founded with a simple mission: to create a trustworthy marketplace where businesses can
                  grow and buyers can shop with confidence.
                </p>
              </div>
            </div>

            <div className="flex gap-6 md:gap-12 items-start slide-up" style={{ animationDelay: '0.1s' }}>
              <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center flex-shrink-0 font-bold text-lg">
                2
              </div>
              <div>
                <h3 className="text-xl font-bold text-foreground mb-2">Rapid Growth</h3>
                <p className="text-muted-foreground">
                  In just one year, we onboarded 500+ verified businesses and processed thousands of successful transactions,
                  earning the trust of over 25,000 satisfied buyers.
                </p>
              </div>
            </div>

            <div className="flex gap-6 md:gap-12 items-start slide-up" style={{ animationDelay: '0.2s' }}>
              <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center flex-shrink-0 font-bold text-lg">
                3
              </div>
              <div>
                <h3 className="text-xl font-bold text-foreground mb-2">Today & Beyond</h3>
                <p className="text-muted-foreground">
                  We continue to innovate with direct seller communication, real-time verification, and dedicated buyer
                  protection, expanding our marketplace globally.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-foreground mb-4 text-center slide-up">Meet Our Team</h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto slide-up">
            Dedicated professionals building the future of e-commerce
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, i) => (
              <div
                key={i}
                className="text-center card-hover bg-white rounded-lg p-6 border border-border"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="text-6xl mb-4">{member.image}</div>
                <h3 className="text-xl font-bold text-foreground mb-1">{member.name}</h3>
                <p className="text-sm text-muted-foreground">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-accent text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4 slide-up">Ready to Join MarketHub?</h2>
          <p className="text-xl opacity-90 mb-8 slide-up">
            Whether you're a buyer or seller, start your journey with us today.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup" className="px-8 py-3 bg-white text-primary rounded-lg font-semibold hover:bg-opacity-90 transition-all button-hover">
              Register Business
            </Link>
            <Link href="/" className="px-8 py-3 border-2 border-white text-white rounded-lg font-semibold hover:bg-white/10 transition-all">
              Start Shopping
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
