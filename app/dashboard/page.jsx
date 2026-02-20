'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Plus, Edit2, Trash2, ShoppingBag, DollarSign, TrendingUp, Award } from 'lucide-react'
import { getCurrentUser, isBusinessUser } from '@/lib/auth'
import { mockBusinesses } from '@/lib/mockData'
import  { User } from '@/lib/mockData'
import SuccessAnimation from '@/components/ui/SuccessAnimation'

export default function DashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [business, setBusiness] = useState<any>(null)
  const [showSuccess, setShowSuccess] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')

  useEffect(() => {
    const currentUser = getCurrentUser()
    if (!currentUser || !isBusinessUser()) {
      router.push('/login')
      return
    }

    setUser(currentUser)

    // Get business data (first business for demo)
    const businessData = mockBusinesses[0]
    setBusiness(businessData)

    // Check for success from product addition
    const params = new URLSearchParams(window.location.search)
    if (params.get('success') === 'true') {
      setSuccessMessage('Product added successfully!')
      setShowSuccess(true)
    }
  }, [router])

  if (!user || !business) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>
  }

  const handleDeleteProduct = (productId) => {
    if (confirm('Are you sure you want to delete this product?')) {
      setSuccessMessage('Product deleted successfully!')
      setShowSuccess(true)
    }
  }

  return (
    <div className="min-h-screen bg-muted/30 fade-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Business Info Card */}
          <div className="card-hover bg-white rounded-lg border border-border p-6 shadow-sm">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">{business.name}</h1>
                <p className="text-muted-foreground flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-success"></span>
                  Verified Business
                </p>
              </div>
              <Award className="w-8 h-8 text-primary" />
            </div>
            <div className="space-y-2 text-sm">
              <p className="text-foreground">
                <span className="text-muted-foreground">Email:</span> {business.email}
              </p>
              <p className="text-foreground">
                <span className="text-muted-foreground">Phone:</span> {business.phone}
              </p>
              <p className="text-foreground">
                <span className="text-muted-foreground">WhatsApp:</span> {business.whatsapp}
              </p>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4">
            {/* Total Products */}
            <div className="card-hover bg-white rounded-lg border border-border p-6 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <ShoppingBag className="w-5 h-5 text-primary" />
                <span className="text-2xl font-bold text-primary">{business.products.length}</span>
              </div>
              <p className="text-xs text-muted-foreground">Total Products</p>
            </div>

            {/* Total Sales */}
            <div className="card-hover bg-white rounded-lg border border-border p-6 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <TrendingUp className="w-5 h-5 text-success" />
                <span className="text-2xl font-bold text-success">{business.totalSales}</span>
              </div>
              <p className="text-xs text-muted-foreground">Total Sales</p>
            </div>

            {/* Rating */}
            <div className="card-hover bg-white rounded-lg border border-border p-6 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <Award className="w-5 h-5 text-warning" />
                <span className="text-2xl font-bold text-warning">{business.rating}</span>
              </div>
              <p className="text-xs text-muted-foreground">Customer Rating</p>
            </div>

            {/* Revenue Estimate */}
            <div className="card-hover bg-white rounded-lg border border-border p-6 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <DollarSign className="w-5 h-5 text-primary" />
                <span className="text-2xl font-bold text-primary">
                  $
                  {(
                    business.products.reduce((sum, p) => sum + p.price * 5, 0) * (business.totalSales / business.products.length)
                  ).toFixed(0)}
                </span>
              </div>
              <p className="text-xs text-muted-foreground">Est. Revenue</p>
            </div>
          </div>
        </div>

        {/* Products Section */}
        <div className="bg-white rounded-lg border border-border shadow-sm overflow-hidden slide-up">
          {/* Header */}
          <div className="px-6 py-4 border-b border-border flex items-center justify-between bg-muted/30">
            <h2 className="text-xl font-bold text-foreground">Your Products</h2>
            <Link href="/dashboard/add-product">
              <button className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-opacity-90 transition-all button-hover">
                <Plus className="w-4 h-4" />
                Add Product
              </button>
            </Link>
          </div>

          {/* Products Grid */}
          {business.products.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-6">
              {business.products.map((product) => (
                <div key={product.id} className="card-hover border border-border rounded-lg p-4">
                  {/* Product Image */}
                  <img src={product.image} alt={product.name} className="w-full h-40 object-cover rounded-lg mb-3" />

                  {/* Product Info */}
                  <h3 className="font-semibold text-foreground mb-2 line-clamp-2">{product.name}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{product.description}</p>

                  {/* Price */}
                  <div className="flex items-center justify-between mb-4 py-2 border-t border-border">
                    <span className="text-lg font-bold text-primary">${product.price.toFixed(2)}</span>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <button className="flex-1 flex items-center justify-center gap-2 border border-primary text-primary px-3 py-2 rounded-lg hover:bg-primary/5 transition-all">
                      <Edit2 className="w-4 h-4" />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteProduct(product.id)}
                      className="flex-1 flex items-center justify-center gap-2 border border-accent text-accent px-3 py-2 rounded-lg hover:bg-accent/5 transition-all"
                    >
                      <Trash2 className="w-4 h-4" />
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-12 text-center">
              <ShoppingBag className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
              <p className="text-muted-foreground mb-4">No products yet. Start by adding your first product!</p>
              <Link href="/dashboard/add-product">
                <button className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-opacity-90 transition-all button-hover">
                  Add First Product
                </button>
              </Link>
            </div>
          )}
        </div>

        {/* Trust & Security Info */}
        <div className="mt-8 bg-success/5 border border-success rounded-lg p-6">
          <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
            <Award className="w-5 h-5 text-success" />
            Your Trust Badge
          </h3>
          <p className="text-sm text-foreground mb-3">Your business is verified and displays a trust badge to all buyers. This helps build customer confidence and increases sales.</p>
          <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-lg border border-success">
            <Award className="w-4 h-4 text-success" />
            <span className="text-sm font-semibold text-success">Verified</span>
          </div>
        </div>
      </div>

      {showSuccess && <SuccessAnimation message={successMessage} />}
    </div>
  )
}
