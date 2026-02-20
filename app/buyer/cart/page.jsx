'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, ShoppingCart, Trash2, MessageCircle } from 'lucide-react'
import { generateWhatsAppLink, openWhatsAppChat } from '@/lib/whatsappUtils'
import SuccessAnimation from '@/components/ui/SuccessAnimation'

export default function CartPage() {
  const [cart, setCart] = useState([
    {
      productId: '1-1',
      businessId: '1',
      name: 'Organic Cotton Fabric',
      price: 45.99,
      quantity: 1,
      businessName: 'Premium Textiles Co.',
      whatsapp: '+13125551234',
    },
    {
      productId: '3-1',
      businessId: '3',
      name: 'Organic Coffee Beans',
      price: 24.99,
      quantity: 2,
      businessName: 'Artisan Food Goods',
      whatsapp: '+13125553456',
    },
  ])

  const [buyerInfo, setBuyerInfo] = useState({
    name: '',
    phone: '',
  })

  const [showSuccess, setShowSuccess] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')

  const calculateTotal = () => {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  }

  const handleInputChange = (e) => {
    setBuyerInfo({
      ...buyerInfo,
      [e.target.name]: e.target.value,
    })
  }

  const handleCheckout = (businessId) => {
    if (!buyerInfo.name || !buyerInfo.phone) {
      alert('Please fill in your name and phone number')
      return
    }

    const businessCart = cart.filter((item) => item.businessId === businessId)
    const total = businessCart.reduce((sum, item) => sum + item.price * item.quantity, 0)
    const business = businessCart[0]

    const whatsappLink = generateWhatsAppLink(
      business.whatsapp,
      buyerInfo.name,
      buyerInfo.phone,
      businessCart,
      business.businessName,
      total
    )

    setSuccessMessage('Opening WhatsApp...')
    setShowSuccess(true)

    setTimeout(() => {
      openWhatsAppChat(whatsappLink)
    }, 500)
  }

  const handleRemoveItem = (businessId, productId) => {
    setCart(cart.filter(item => !(item.businessId === businessId && item.productId === productId)))
    setSuccessMessage('Item removed from cart')
    setShowSuccess(true)
    setTimeout(() => setShowSuccess(false), 2000)
  }

  // Group by business
  const cartByBusiness = cart.reduce((acc, item) => {
    if (!acc[item.businessId]) {
      acc[item.businessId] = []
    }
    acc[item.businessId].push(item)
    return acc
  }, {})

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-muted/30 py-12 fade-in">
        <div className="max-w-4xl mx-auto px-4">
          <Link href="/" className="inline-flex items-center gap-2 text-primary hover:underline mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Continue Shopping
          </Link>

          <div className="bg-white rounded-lg border border-border p-12 text-center">
            <ShoppingCart className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
            <h1 className="text-2xl font-bold text-foreground mb-2">Your Cart is Empty</h1>
            <p className="text-muted-foreground mb-6">Start shopping to add products to your cart</p>
            <Link href="/">
              <button className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-opacity-90 transition-all button-hover">
                Browse Businesses
              </button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-muted/30 py-12 fade-in">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center gap-2 text-primary hover:underline mb-4 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Continue Shopping
          </Link>
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
            <ShoppingCart className="w-8 h-8 text-primary" />
            Shopping Cart
          </h1>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            {Object.entries(cartByBusiness).map(([businessId, items]) => (
              <div key={businessId} className="bg-white rounded-lg border border-border p-6 mb-6 scale-in">
                <h3 className="font-bold text-lg text-foreground mb-4 border-b border-border pb-4">{items[0].businessName}</h3>

                <div className="space-y-4">
                  {items.map((item, index) => (
                    <div key={index} className="flex items-start gap-4 pb-4 border-b border-muted last:border-0">
                      <div className="flex-1">
                        <h4 className="font-semibold text-foreground mb-1">{item.name}</h4>
                        <p className="text-muted-foreground text-sm">Qty: {item.quantity}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-primary">${(item.price * item.quantity).toFixed(2)}</p>
                        <p className="text-xs text-muted-foreground">${item.price.toFixed(2)} each</p>
                      </div>
                      <button 
                        onClick={() => handleRemoveItem(item.businessId, item.productId)}
                        className="text-accent hover:bg-accent/10 p-2 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>

                {/* Subtotal */}
                <div className="mt-4 pt-4 border-t border-border flex justify-between items-center">
                  <span className="font-semibold text-foreground">Subtotal:</span>
                  <span className="font-bold text-primary text-lg">
                    ${items.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary & Checkout */}
          <div className="lg:sticky lg:top-24">
            <div className="bg-white rounded-lg border border-border p-6 shadow-lg scale-in">
              <h3 className="font-bold text-lg text-foreground mb-6">Order Summary</h3>

              {/* Buyer Info Form */}
              <div className="mb-6 pb-6 border-b border-border">
                <label className="block text-sm font-semibold text-foreground mb-2">Your Name *</label>
                <input
                  type="text"
                  name="name"
                  value={buyerInfo.name}
                  onChange={handleInputChange}
                  placeholder="John Doe"
                  className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent mb-4"
                />

                <label className="block text-sm font-semibold text-foreground mb-2">Your Phone *</label>
                <input
                  type="tel"
                  name="phone"
                  value={buyerInfo.phone}
                  onChange={handleInputChange}
                  placeholder="+1 (555) 000-0000"
                  className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>

              {/* Total */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-muted-foreground">Subtotal:</span>
                  <span className="text-foreground">${calculateTotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-muted-foreground">Shipping:</span>
                  <span className="text-foreground">Direct with seller</span>
                </div>
                <div className="border-t border-border pt-4 flex justify-between items-center">
                  <span className="font-bold text-foreground">Total:</span>
                  <span className="font-bold text-xl text-primary">${calculateTotal().toFixed(2)}</span>
                </div>
              </div>

              {/* Info Box */}
              <div className="bg-primary/5 border border-primary rounded-lg p-4 mb-6">
                <p className="text-xs text-foreground font-semibold mb-2">How to Complete Your Order:</p>
                <ol className="text-xs text-muted-foreground space-y-1">
                  <li>1. Enter your details above</li>
                  <li>2. Click &quot;Complete Order&quot; for each seller</li>
                  <li>3. Chat directly via WhatsApp to confirm</li>
                  <li>4. Arrange payment & delivery</li>
                </ol>
              </div>

              {/* Checkout Buttons */}
              <div className="space-y-2">
                {Object.entries(cartByBusiness).map(([businessId, items]) => (
                  <button
                    key={businessId}
                    onClick={() => handleCheckout(businessId)}
                    className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-all button-hover flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="w-4 h-4" />
                    Chat with {items[0].businessName}
                  </button>
                ))}
              </div>

              {/* Trust Note */}
              <div className="mt-6 p-3 bg-success/10 border border-success rounded-lg">
                <p className="text-xs text-success font-semibold text-center">
                  ✓ All businesses are verified. Direct communication for safe transactions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showSuccess && <SuccessAnimation message={successMessage} />}
    </div>
  )
}