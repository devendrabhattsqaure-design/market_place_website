'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Package, Image as ImageIcon, AlertCircle } from 'lucide-react'
import { getCurrentUser, isBusinessUser } from '@/lib/auth'
import  { User } from '@/lib/mockData'

export default function AddProductPage() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [imageLoading, setImageLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    image: '',
  })
  const [imagePreview, setImagePreview] = useState('')

  useEffect(() => {
    const currentUser = getCurrentUser()
    if (!currentUser || !isBusinessUser()) {
      router.push('/login')
      return
    }
    setUser(currentUser)
  }, [router])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
    setError('')
  }

  const handleImageUrlChange = async (e) => {
    const url = e.target.value
    setFormData({ ...formData, image: url })

    if (url) {
      setImageLoading(true)
      try {
        const img = new Image()
        img.onload = () => {
          setImagePreview(url)
          setImageLoading(false)
        }
        img.onerror = () => {
          setError('Invalid image URL')
          setImageLoading(false)
        }
        img.crossOrigin = 'anonymous'
        img.src = url
      } catch (err) {
        setError('Failed to load image')
        setImageLoading(false)
      }
    }
  }

  const validateForm = () => {
    if (!formData.name || !formData.price || !formData.description || !formData.image) {
      setError('Please fill in all fields')
      return false
    }
    if (isNaN(parseFloat(formData.price)) || parseFloat(formData.price) <= 0) {
      setError('Please enter a valid price')
      return false
    }
    return true
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) return

    setLoading(true)
    setError('')

    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // In a real app, save to database
    router.push('/dashboard?success=true')
  }

  if (!user) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>
  }

  return (
    <div className="min-h-screen bg-muted/30 py-12 fade-in">
      <div className="max-w-2xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <Link href="/dashboard" className="inline-flex items-center gap-2 text-primary hover:underline mb-4 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Link>
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
            <Package className="w-8 h-8 text-primary" />
            Add New Product
          </h1>
          <p className="text-muted-foreground mt-2">Create a new product listing for your business</p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-lg border border-border shadow-lg p-8 scale-in">
          {/* Error Message */}
          {error && (
            <div className="bg-accent/10 border border-accent text-accent rounded-lg p-3 mb-6 flex items-center gap-2 animate-in fade-in">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span className="text-sm">{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Product Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-semibold text-foreground mb-2">
                Product Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g., Premium Cotton Fabric"
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                disabled={loading}
                required
              />
              <p className="text-xs text-muted-foreground mt-1">Make it clear and descriptive</p>
            </div>

            {/* Price */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="price" className="block text-sm font-semibold text-foreground mb-2">
                  Price (USD) *
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2 text-muted-foreground">$</span>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    placeholder="0.00"
                    step="0.01"
                    min="0"
                    className="w-full pl-7 pr-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    disabled={loading}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-semibold text-foreground mb-2">
                Description *
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Provide details about your product, materials, uses, etc."
                rows={4}
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none"
                disabled={loading}
                required
              ></textarea>
              <p className="text-xs text-muted-foreground mt-1">Be detailed to attract more buyers</p>
            </div>

            {/* Image URL */}
            <div>
              <label htmlFor="image" className="block text-sm font-semibold text-foreground mb-2">
                Product Image URL *
              </label>
              <div className="relative">
                <ImageIcon className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                <input
                  type="url"
                  id="image"
                  name="image"
                  value={formData.image}
                  onChange={handleImageUrlChange}
                  placeholder="https://example.com/image.jpg"
                  className="w-full pl-10 pr-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  disabled={loading}
                  required
                />
              </div>
              <p className="text-xs text-muted-foreground mt-1">Use a high-quality image URL</p>
            </div>

            {/* Image Preview */}
            {imagePreview && (
              <div className="border border-border rounded-lg p-4 bg-muted/50">
                <p className="text-sm font-semibold text-foreground mb-3">Image Preview</p>
                <img src={imagePreview} alt="Product preview" className="w-full h-48 object-cover rounded-lg" />
              </div>
            )}

            {imageLoading && (
              <div className="border border-primary/30 rounded-lg p-4 bg-primary/5 text-center">
                <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
                <p className="text-xs text-muted-foreground mt-2">Loading image...</p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading || imageLoading}
              className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-all button-hover disabled:opacity-75 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  Adding Product...
                </>
              ) : (
                <>
                  <Package className="w-4 h-4" />
                  Add Product
                </>
              )}
            </button>
          </form>

          {/* Help Section */}
          <div className="mt-8 p-4 bg-muted rounded-lg border border-border">
            <p className="text-xs text-foreground font-semibold mb-2">Tips for success:</p>
            <ul className="text-xs text-muted-foreground space-y-1">
              <li>✓ Use clear, descriptive product names</li>
              <li>✓ Include relevant details in the description</li>
              <li>✓ Use high-quality product images</li>
              <li>✓ Price competitively to attract buyers</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
