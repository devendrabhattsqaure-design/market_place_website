'use client'

import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { useState } from 'react'
import { ArrowLeft, Trash2, Plus, Minus, MessageCircle, AlertCircle } from 'lucide-react'
import { useCart } from '@/context/CartContext'
import { Sparkle, Confetti } from '@/components/ui/Sparkle'
import { FeedbackModal } from '@/components/ui/FeedbackModal'

export default function BusinessCartPage() {
  const params = useParams()
  const router = useRouter()
  const businessId = params.businessId
  const { getBusinessCart, removeFromCart, updateQuantity, clearBusinessCart } = useCart()
  const cart = getBusinessCart(businessId)
  const [showSparkle, setShowSparkle] = useState(false)
  const [sparklePos, setSparklePos] = useState({ x: 0, y: 0 })
  const [showConfetti, setShowConfetti] = useState(false)
  const [feedbackOpen, setFeedbackOpen] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  if (!cart || cart.items.length === 0) {
    return (
      <div className="min-h-screen bg-muted/30">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <Link href={`/buyer/${businessId}`} className="inline-flex items-center gap-2 text-primary hover:underline mb-8">
            <ArrowLeft className="w-4 h-4" />
            Back to Business
          </Link>

          <div className="bg-white rounded-lg border border-border p-12 text-center">
            <div className="mb-4 text-5xl">🛒</div>
            <h2 className="text-2xl font-bold text-foreground mb-2">Your cart is empty</h2>
            <p className="text-muted-foreground mb-6">Add some products to your cart to proceed</p>
            <Link
              href={`/buyer/${businessId}`}
              className="inline-block bg-primary text-white px-6 py-2 rounded-lg font-semibold hover:bg-primary/90 transition-all"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const total = cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0)

  const handleRemoveItem = (productId) => {
    removeFromCart(businessId, productId)
  }

  const handleQuantityChange = (productId, quantity) => {
    if (quantity > 0) {
      updateQuantity(businessId, productId, quantity)
    }
  }

  const handleCheckout = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = rect.left + rect.width / 2
    const y = rect.top + rect.height / 2

    // Trigger sparkle and confetti
    setSparklePos({ x, y })
    setShowSparkle(true)
    setShowConfetti(true)

    // Build WhatsApp message
    const name = prompt('Please enter your name:') || 'Customer'
    const phone = prompt('Please enter your phone number:') || '+1-XXX-XXX-XXXX'

    if (name && phone) {
      const itemsList = cart.items
        .map((item) => `- ${item.name} (₹${item.price}) x ${item.quantity} = ₹${item.price * item.quantity}`)
        .join('\n')

      const message = `Hello, my name is ${name}.
My phone number is ${phone}.

I am interested in:
${itemsList}

Total: ₹${total.toFixed(2)}

Please confirm availability and arrange delivery. Thank you!`

      const encodedMessage = encodeURIComponent(message)
      const whatsappUrl = `https://wa.me/${cart.businessPhone.replace(/[^0-9]/g, '')}?text=${encodedMessage}`

      // Show feedback modal before redirecting
      setTimeout(() => {
        setFeedbackOpen(true)
      }, 500)

      // Redirect after delay
      setTimeout(() => {
        window.open(whatsappUrl, '_blank')
        clearBusinessCart(businessId)
        router.push('/')
      }, 3000)
    }
  }

  return (
    <>
      {showSparkle && <Sparkle x={sparklePos.x} y={sparklePos.y} />}
      {showConfetti && <Confetti />}

      <div className="min-h-screen bg-muted/30 fade-in">
        <div className="max-w-4xl mx-auto px-4 py-8">
          {/* Header */}
          <Link href={`/buyer/${businessId}`} className="inline-flex items-center gap-2 text-primary hover:underline mb-8">
            <ArrowLeft className="w-4 h-4" />
            Back to Business
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              <h1 className="text-3xl font-bold text-foreground mb-6">Shopping Cart</h1>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex gap-3">
                <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-blue-900">Direct Purchase</p>
                  <p className="text-xs text-blue-800">You'll contact {cart.businessName} directly via WhatsApp to confirm and complete this purchase.</p>
                </div>
              </div>

              {cart.items.map((item) => (
                <div key={item.productId} className="bg-white rounded-lg border border-border p-4 flex gap-4 card-hover">
                  {/* Product Image */}
                  <div className="w-24 h-24 bg-muted rounded-lg overflow-hidden flex-shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground mb-1">{item.name}</h3>
                    <p className="text-sm text-muted-foreground mb-3">₹{item.price}</p>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleQuantityChange(item.productId, item.quantity - 1)}
                        className="p-1 hover:bg-muted rounded transition-colors"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="px-3 py-1 bg-muted rounded font-semibold min-w-12 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => handleQuantityChange(item.productId, item.quantity + 1)}
                        className="p-1 hover:bg-muted rounded transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Price and Delete */}
                  <div className="text-right flex flex-col items-end justify-between">
                    <p className="font-bold text-foreground">₹{(item.price * item.quantity).toFixed(2)}</p>
                    <button
                      onClick={() => handleRemoveItem(item.productId)}
                      className="p-2 hover:bg-red-50 rounded transition-colors text-destructive"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg border border-border p-6 sticky top-24 card-hover">
                <h2 className="text-xl font-bold text-foreground mb-6">Order Summary</h2>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-muted-foreground">
                    <span>Subtotal</span>
                    <span>₹{total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Delivery</span>
                    <span>To be confirmed</span>
                  </div>

                  <div className="border-t border-border pt-4 flex justify-between font-bold text-lg text-foreground">
                    <span>Total</span>
                    <span className="text-primary">₹{total.toFixed(2)}</span>
                  </div>
                </div>

                {/* Trust Badge */}
                <div className="bg-success/10 border border-success rounded-lg p-4 mb-6">
                  <p className="text-xs font-semibold text-success mb-1">Safe Purchase</p>
                  <p className="text-xs text-success">Direct verification with seller</p>
                </div>

                {/* Checkout Button */}
                <button
                  onClick={handleCheckout}
                  className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-primary/90 transition-all active:scale-95 flex items-center justify-center gap-2 button-hover"
                >
                  <MessageCircle className="w-5 h-5" />
                  Contact via WhatsApp
                </button>

                <p className="text-xs text-muted-foreground text-center mt-4">
                  You will send the cart details to {cart.businessName} via WhatsApp
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <FeedbackModal
        isOpen={feedbackOpen}
        onClose={() => setFeedbackOpen(false)}
        title="Order Placed!"
        message="Thank you for using MarketHub. We'd love your feedback."
        context="cart"
      />
    </>
  )
}