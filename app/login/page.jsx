'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Mail, Lock, LogIn, AlertCircle } from 'lucide-react'
import { loginUser, setCurrentUser } from '@/lib/auth'
import SuccessAnimation from '@/components/ui/SuccessAnimation'
import LoadingSpinner from '@/components/ui/LoadingSpinner'

export default function LoginPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showSuccess, setShowSuccess] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 800))

    const result = loginUser(formData.email, formData.password)

    if (result.success && result.user) {
      setCurrentUser(result.user)
      setShowSuccess(true)

      // Redirect after success animation
      setTimeout(() => {
        router.push('/dashboard')
      }, 1500)
    } else {
      setError(result.error || 'Login failed')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-accent/5 flex items-center justify-center px-4 py-12 fade-in">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="bg-white rounded-xl border border-border shadow-lg p-8 scale-in">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mx-auto mb-4">
              <LogIn className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-foreground mb-2">Welcome Back</h1>
            <p className="text-muted-foreground">Sign in to your business account</p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-accent/10 border border-accent text-accent rounded-lg p-3 mb-6 flex items-center gap-2 animate-in fade-in">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span className="text-sm">{error}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john@textiles.com"
                  className="w-full pl-10 pr-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  disabled={loading}
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-foreground mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  disabled={loading}
                  required
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-white py-2 rounded-lg font-semibold hover:bg-opacity-90 transition-all button-hover disabled:opacity-75 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  Signing in...
                </>
              ) : (
                <>
                  <LogIn className="w-4 h-4" />
                  Sign In
                </>
              )}
            </button>
          </form>

          {/* Demo Info */}
          <div className="mt-6 p-4 bg-muted rounded-lg border border-border">
            <p className="text-xs text-muted-foreground mb-2 font-semibold">Demo Credentials:</p>
            <p className="text-xs text-muted-foreground mb-1">
              <span className="text-foreground">Email:</span> john@textiles.com
            </p>
            <p className="text-xs text-muted-foreground">
              <span className="text-foreground">Password:</span> password123
            </p>
          </div>

          {/* Sign Up Link */}
          <p className="text-center text-sm text-muted-foreground mt-6">
            Don't have a business account?{' '}
            <a href="/signup" className="text-primary font-semibold hover:underline transition-colors">
              Register here
            </a>
          </p>
        </div>
      </div>

      {showSuccess && <SuccessAnimation message="Login successful! Redirecting..." />}
    </div>
  )
}
