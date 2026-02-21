'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Upload, Package, Tag, FileText, DollarSign, AlertCircle } from 'lucide-react'
import { useCart } from '@/context/CartContext'
import { Sparkle, Confetti } from '@/components/ui/Sparkle'

export default function AddProductPage() {
  const router = useRouter()
  const { addToCart } = useCart()
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    image: '',
    stock: '',
    unit: 'piece'
  })
  const [imagePreview, setImagePreview] = useState(null)
  const [errors, setErrors] = useState({})
  const [showSparkle, setShowSparkle] = useState(false)
  const [sparklePos, setSparklePos] = useState({ x: 0, y: 0 })
  const [showConfetti, setShowConfetti] = useState(false)

  const categories = [
    'Groceries',
    'Vegetables',
    'Fruits',
    'Dairy',
    'Bakery',
    'Beverages',
    'Snacks',
    'Household'
  ]

  const units = ['piece', 'kg', 'g', 'liter', 'ml', 'dozen', 'pack']

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result)
        setFormData(prev => ({
          ...prev,
          image: reader.result
        }))
      }
      reader.readAsDataURL(file)
    }
  }

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.name.trim()) {
      newErrors.name = 'Product name is required'
    }
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required'
    }
    if (!formData.price) {
      newErrors.price = 'Price is required'
    } else if (isNaN(formData.price) || parseFloat(formData.price) <= 0) {
      newErrors.price = 'Please enter a valid price'
    }
    if (!formData.category) {
      newErrors.category = 'Please select a category'
    }
    if (!formData.image) {
      newErrors.image = 'Product image is required'
    }
    if (!formData.stock) {
      newErrors.stock = 'Stock quantity is required'
    } else if (isNaN(formData.stock) || parseInt(formData.stock) < 0) {
      newErrors.stock = 'Please enter a valid stock quantity'
    }

    return newErrors
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    const newErrors = validateForm()
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      // Scroll to top to show errors
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }

    // Trigger celebration
    const rect = e.currentTarget.getBoundingClientRect()
    setSparklePos({ x: rect.left + rect.width / 2, y: rect.top })
    setShowSparkle(true)
    setShowConfetti(true)

    // Simulate product addition
    setTimeout(() => {
      // Add to cart logic would go here
      router.push('/dashboard?success=true')
    }, 1500)
  }

  return (
    <>
      {showSparkle && <Sparkle x={sparklePos.x} y={sparklePos.y} />}
      {showConfetti && <Confetti />}

      <div className="min-h-screen bg-muted/30 fade-in">
        <div className="max-w-4xl mx-auto px-4 py-8">
          {/* Header */}
          <Link href="/dashboard" className="inline-flex items-center gap-2 text-primary hover:underline mb-8">
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Link>

          {/* Form Card */}
          <div className="bg-white rounded-lg border border-border shadow-sm overflow-hidden slide-up">
            <div className="px-6 py-4 border-b border-border bg-muted/30">
              <h1 className="text-2xl font-bold text-foreground">Add New Product</h1>
              <p className="text-sm text-muted-foreground mt-1">Fill in the details below to add a new product to your store</p>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {/* Error Summary */}
              {Object.keys(errors).length > 0 && (
                <div className="bg-accent/10 border border-accent rounded-lg p-4 flex gap-3">
                  <AlertCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-accent">Please fix the following errors:</p>
                    <ul className="text-xs text-accent mt-1 list-disc list-inside">
                      {Object.values(errors).map((error, index) => (
                        <li key={index}>{error}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {/* Product Name */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-foreground flex items-center gap-2">
                  <Tag className="w-4 h-4" />
                  Product Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g., Fresh Organic Apples"
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all ${
                    errors.name ? 'border-accent' : 'border-border'
                  }`}
                />
                {errors.name && <p className="text-xs text-accent">{errors.name}</p>}
              </div>

              {/* Description */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-foreground flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Describe your product in detail..."
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none ${
                    errors.description ? 'border-accent' : 'border-border'
                  }`}
                />
                {errors.description && <p className="text-xs text-accent">{errors.description}</p>}
              </div>

              {/* Price and Stock */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Price */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-foreground flex items-center gap-2">
                    <DollarSign className="w-4 h-4" />
                    Price
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-2 text-muted-foreground">$</span>
                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleChange}
                      placeholder="0.00"
                      step="0.01"
                      min="0"
                      className={`w-full pl-8 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all ${
                        errors.price ? 'border-accent' : 'border-border'
                      }`}
                    />
                  </div>
                  {errors.price && <p className="text-xs text-accent">{errors.price}</p>}
                </div>

                {/* Stock */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-foreground flex items-center gap-2">
                    <Package className="w-4 h-4" />
                    Stock Quantity
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      name="stock"
                      value={formData.stock}
                      onChange={handleChange}
                      placeholder="100"
                      min="0"
                      className={`flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all ${
                        errors.stock ? 'border-accent' : 'border-border'
                      }`}
                    />
                    <select
                      name="unit"
                      value={formData.unit}
                      onChange={handleChange}
                      className="px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all bg-white"
                    >
                      {units.map(unit => (
                        <option key={unit} value={unit}>{unit}</option>
                      ))}
                    </select>
                  </div>
                  {errors.stock && <p className="text-xs text-accent">{errors.stock}</p>}
                </div>
              </div>

              {/* Category */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-foreground flex items-center gap-2">
                  <Package className="w-4 h-4" />
                  Category
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all bg-white ${
                    errors.category ? 'border-accent' : 'border-border'
                  }`}
                >
                  <option value="">Select a category</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
                {errors.category && <p className="text-xs text-accent">{errors.category}</p>}
              </div>

              {/* Image Upload */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-foreground flex items-center gap-2">
                  <Upload className="w-4 h-4" />
                  Product Image
                </label>
                
                <div className="flex items-start gap-4">
                  {/* Image Preview */}
                  {imagePreview && (
                    <div className="w-24 h-24 rounded-lg overflow-hidden border border-border">
                      <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                    </div>
                  )}

                  {/* Upload Area */}
                  <div className="flex-1">
                    <div className={`border-2 border-dashed rounded-lg p-6 text-center ${
                      errors.image ? 'border-accent' : 'border-border hover:border-primary/50'
                    } transition-colors`}>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                        id="image-upload"
                      />
                      <label
                        htmlFor="image-upload"
                        className="cursor-pointer"
                      >
                        <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                        <p className="text-sm text-muted-foreground">
                          Click to upload or drag and drop
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          PNG, JPG, GIF up to 10MB
                        </p>
                      </label>
                    </div>
                    {errors.image && <p className="text-xs text-accent mt-1">{errors.image}</p>}
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-4 border-t border-border">
                <button
                  type="submit"
                  className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-primary/90 transition-all active:scale-95 button-hover"
                >
                  Add Product
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}