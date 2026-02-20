'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Star, MessageCircle, ShoppingBag, Award } from 'lucide-react'
import { mockBusinesses } from '@/lib/mockData'
import { useCart } from '@/context/CartContext'
import VerifiedBadge from '@/components/ui/VerifiedBadge'
import ProductCard from '@/components/product/ProductCard'
import SuccessAnimation from '@/components/ui/SuccessAnimation'
import { Sparkle, Confetti } from '@/components/ui/Sparkle'
import { FeedbackModal } from '@/components/ui/FeedbackModal'

export default function BusinessProfilePage() {
  const params = useParams()
  const router = useRouter()
  const businessId = params.businessId
  const { addToCart, getBusinessCart } = useCart()
  const [business, setBusiness] = useState(null)
  const [showSuccess, setShowSuccess] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  const [sparklePos, setSparklePos] = useState({ x: 0, y: 0 })
  const [showSparkle, setShowSparkle] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)
  const [feedbackOpen, setFeedbackOpen] = useState(false)
  const [cartItemCount, setCartItemCount] = useState(0)

  useEffect(() => {
    const found = mockBusinesses.find((b) => b.id === businessId)
    if (found) {
      setBusiness(found)
    }
  }, [businessId])

  useEffect(() => {
    const cart = getBusinessCart(businessId)
    setCartItemCount(cart?.items.length || 0)
  }, [businessId, getBusinessCart])

  const handleAddToCart = (product, e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = rect.left + rect.width / 2
    const y = rect.top + rect.height / 2

    // Trigger sparkle effect
    setSparklePos({ x, y })
    setShowSparkle(true)

    // Add to cart
    addToCart(businessId, business.name, business.whatsapp, {
      productId: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.image,
    })

    // Update count
    const cart = getBusinessCart(businessId)
    setCartItemCount(cart?.items.length || 0)

    setSuccessMessage(`${product.name} added to cart!`)
    setShowSuccess(true)

    // Show feedback modal after 2 seconds
    setTimeout(() => {
      setFeedbackOpen(true)
    }, 2000)
  }

  const handleContact = () => {
    window.open(`https://wa.me/${business.whatsapp.replace(/[^0-9]/g, '')}`, '_blank')
  }

  if (!business) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-muted-foreground">Business not found</p>
      </div>
    )
  }

  return (
    <>
      {showSparkle && <Sparkle x={sparklePos.x} y={sparklePos.y} />}
      {showConfetti && <Confetti />}

      <div className="min-h-screen bg-muted/30 fade-in">
        {/* Header with Cart */}
        <div className="bg-white border-b border-border sticky top-16 z-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
            <Link href="/" className="inline-flex items-center gap-2 text-primary hover:underline transition-colors">
              <ArrowLeft className="w-4 h-4" />
              Back to Businesses
            </Link>

            {cartItemCount > 0 && (
              <Link
                href={`/buyer/${businessId}/cart`}
                className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-all active:scale-95 relative"
              >
                <ShoppingBag className="w-5 h-5" />
                Cart ({cartItemCount})
                <span className="absolute -top-2 -right-2 bg-accent text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold animate-bounce-in">
                  {cartItemCount}
                </span>
              </Link>
            )}
          </div>
        </div>

        {/* Business Header */}
        <div className="bg-white border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Business Info */}
              <div className="md:col-span-2">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h1 className="text-4xl font-bold text-foreground mb-2">{business.name}</h1>
                    <VerifiedBadge verified={business.verified} className="mb-4" />
                  </div>
                </div>

                {/* Rating and Info */}
                <div className="flex flex-wrap gap-6 mb-4">
                  <div className="flex items-center gap-2">
                    <Star className="w-5 h-5 fill-warning text-warning" />
                    <span className="font-semibold text-foreground">{business.rating}</span>
                    <span className="text-muted-foreground">Rating</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ShoppingBag className="w-5 h-5 text-primary" />
                    <span className="font-semibold text-foreground">{business.totalSales}</span>
                    <span className="text-muted-foreground">Sales</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Award className="w-5 h-5 text-success" />
                    <span className="text-success font-semibold">Verified Seller</span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-muted-foreground mb-6">
                  Trusted business with {business.products.length} quality products available. Direct communication via WhatsApp for personalized service.
                </p>

                {/* Trust Indicators */}
                <div className="flex flex-wrap gap-3">
                  <div className="flex items-center gap-2 bg-success/10 px-3 py-2 rounded-lg border border-success">
                    <Award className="w-4 h-4 text-success" />
                    <span className="text-sm text-success">Verified Business</span>
                  </div>
                  <div className="flex items-center gap-2 bg-primary/10 px-3 py-2 rounded-lg border border-primary">
                    <ShoppingBag className="w-4 h-4 text-primary" />
                    <span className="text-sm text-primary">{business.products.length} Products</span>
                  </div>
                </div>
              </div>

              {/* Contact Card */}
              <div className="card-hover bg-gradient-to-br from-primary/5 to-accent/5 rounded-lg border border-border p-6">
                <h3 className="font-bold text-foreground mb-4">Get in Touch</h3>

                <div className="space-y-3 mb-6">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Email</p>
                    <a href={`mailto:${business.email}`} className="text-primary font-semibold hover:underline break-all">
                      {business.email}
                    </a>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Phone</p>
                    <a href={`tel:${business.phone}`} className="text-primary font-semibold hover:underline">
                      {business.phone}
                    </a>
                  </div>
                </div>

                <button
                  onClick={handleContact}
                  className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-all button-hover flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  Contact via WhatsApp
                </button>

                {/* Trust Note */}
                <div className="mt-4 p-3 bg-success/10 border border-success rounded-lg">
                  <p className="text-xs text-success font-semibold">Direct communication with verified seller</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Products Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-2">Products</h2>
            <p className="text-muted-foreground">{business.products.length} available products</p>
          </div>

          {business.products.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 slide-up">
              {business.products.map((product) => (
                <ProductCard key={product.id} product={product} onAddToCart={handleAddToCart} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-lg border border-border">
              <ShoppingBag className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
              <p className="text-muted-foreground">No products available at the moment</p>
            </div>
          )}
        </div>

        {/* FAQ Section */}
        <div className="bg-white border-t border-border py-12 mt-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h3 className="text-2xl font-bold text-foreground mb-6">How It Works</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 border border-border rounded-lg card-hover">
                <div className="w-10 h-10 bg-primary text-white rounded-lg flex items-center justify-center font-bold mb-4">1</div>
                <h4 className="font-semibold text-foreground mb-2">Browse Products</h4>
                <p className="text-muted-foreground text-sm">Explore all available products from verified businesses</p>
              </div>

              <div className="p-6 border border-border rounded-lg card-hover">
                <div className="w-10 h-10 bg-primary text-white rounded-lg flex items-center justify-center font-bold mb-4">2</div>
                <h4 className="font-semibold text-foreground mb-2">Contact Seller</h4>
                <p className="text-muted-foreground text-sm">Reach out directly via WhatsApp to confirm order details</p>
              </div>

              <div className="p-6 border border-border rounded-lg card-hover">
                <div className="w-10 h-10 bg-primary text-white rounded-lg flex items-center justify-center font-bold mb-4">3</div>
                <h4 className="font-semibold text-foreground mb-2">Complete Purchase</h4>
                <p className="text-muted-foreground text-sm">Arrange payment and delivery through direct communication</p>
              </div>
            </div>
          </div>
        </div>

        {showSuccess && <SuccessAnimation message={successMessage} />}
      </div>

      <FeedbackModal
        isOpen={feedbackOpen}
        onClose={() => setFeedbackOpen(false)}
        title="Product Added!"
        message="We'd love your feedback about this product"
        context="product"
      />
    </>
  )
}