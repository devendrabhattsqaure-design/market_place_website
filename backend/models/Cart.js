/**
 * Cart Model
 * Shopping cart for each buyer-business relationship
 */

import { Schema, model, Document, Types } from 'mongoose'

export interface ICartItem {
  productId: Types.ObjectId
  quantity: number
  price: number // Price at time of adding to cart
  name: string
  image?: string
}

export interface ICart extends Document {
  _id: Types.ObjectId
  buyerId: Types.ObjectId // Reference to User (buyer)
  businessId: Types.ObjectId // Reference to User (business)
  
  // Items
  items: ICartItem[]
  
  // Pricing
  subtotal: number
  tax: number
  discount?: number
  total: number
  
  // Status
  isActive: boolean
  
  // Meta
  expiresAt?: Date
  createdAt: Date
  updatedAt: Date
}

const cartItemSchema = new Schema<ICartItem>(
  {
    productId: {
      type: Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    name: {
      type: String,
      required: true,
    },
    image: String,
  },
  { _id: false }
)

const cartSchema = new Schema<ICart>(
  {
    buyerId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    businessId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    
    // Items
    items: {
      type: [cartItemSchema],
      default: [],
    },
    
    // Pricing
    subtotal: {
      type: Number,
      default: 0,
      min: 0,
    },
    tax: {
      type: Number,
      default: 0,
      min: 0,
    },
    discount: {
      type: Number,
      default: 0,
      min: 0,
    },
    total: {
      type: Number,
      default: 0,
      min: 0,
    },
    
    // Status
    isActive: {
      type: Boolean,
      default: true,
      index: true,
    },
    
    // Meta
    expiresAt: {
      type: Date,
      default: () => new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
      index: true,
    },
  },
  {
    timestamps: true,
  }
)

// Indexes
cartSchema.index({ buyerId: 1, businessId: 1, isActive: 1 })
cartSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 }) // TTL index

// Virtual for item count
cartSchema.virtual('itemCount').get(function () {
  return this.items.reduce((sum, item) => sum + item.quantity, 0)
})

// Virtual for formatted total
cartSchema.virtual('formattedTotal').get(function () {
  return this.total.toFixed(2)
})

export const Cart = model<ICart>('Cart', cartSchema)
export default Cart
