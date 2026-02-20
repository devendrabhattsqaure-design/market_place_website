/**
 * Order Model
 * Represents orders placed by buyers
 */

import { Schema, model, Document, Types } from 'mongoose'
import { ORDER_STATUS, PAYMENT_STATUS, PAYMENT_METHODS } from '../config/constants'

export interface IOrderItem {
  productId: Types.ObjectId
  productName: string
  quantity: number
  pricePerUnit: number
  totalPrice: number
  image?: string
}

export interface IAddress {
  street: string
  city: string
  state: string
  zipCode: string
  country: string
  phone: string
}

export interface IOrder extends Document {
  _id: Types.ObjectId
  orderNumber: string
  buyerId: Types.ObjectId // Reference to User
  businessId: Types.ObjectId // Reference to User
  
  // Items
  items: IOrderItem[]
  
  // Pricing
  subtotal: number
  tax: number
  discount?: number
  shippingCost?: number
  total: number
  
  // Shipping
  shippingAddress: IAddress
  shippingTrackingId?: string
  estimatedDelivery?: Date
  
  // Payment
  paymentMethod: string
  paymentStatus: 'pending' | 'completed' | 'failed' | 'refunded'
  transactionId?: string
  
  // Status & Timeline
  status: string
  notes?: string
  cancellationReason?: string
  
  timestamps: {
    confirmed?: Date
    processing?: Date
    shipped?: Date
    delivered?: Date
    cancelled?: Date
  }
  
  // Meta
  createdAt: Date
  updatedAt: Date
}

const orderItemSchema = new Schema<IOrderItem>(
  {
    productId: {
      type: Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
    productName: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
    pricePerUnit: {
      type: Number,
      required: true,
      min: 0,
    },
    totalPrice: {
      type: Number,
      required: true,
      min: 0,
    },
    image: String,
  },
  { _id: false }
)

const addressSchema = new Schema<IAddress>(
  {
    street: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    zipCode: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
  },
  { _id: false }
)

const orderSchema = new Schema<IOrder>(
  {
    orderNumber: {
      type: String,
      unique: true,
      required: true,
      index: true,
    },
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
      type: [orderItemSchema],
      required: true,
    },
    
    // Pricing
    subtotal: {
      type: Number,
      required: true,
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
    shippingCost: {
      type: Number,
      default: 0,
      min: 0,
    },
    total: {
      type: Number,
      required: true,
      min: 0,
    },
    
    // Shipping
    shippingAddress: {
      type: addressSchema,
      required: true,
    },
    shippingTrackingId: String,
    estimatedDelivery: Date,
    
    // Payment
    paymentMethod: {
      type: String,
      enum: Object.values(PAYMENT_METHODS),
      required: true,
    },
    paymentStatus: {
      type: String,
      enum: Object.values(PAYMENT_STATUS),
      default: PAYMENT_STATUS.PENDING,
      index: true,
    },
    transactionId: String,
    
    // Status
    status: {
      type: String,
      enum: Object.values(ORDER_STATUS),
      default: ORDER_STATUS.PENDING,
      index: true,
    },
    notes: String,
    cancellationReason: String,
    
    // Timeline
    timestamps: {
      confirmed: Date,
      processing: Date,
      shipped: Date,
      delivered: Date,
      cancelled: Date,
    },
  },
  {
    timestamps: true,
  }
)

// Indexes
orderSchema.index({ buyerId: 1, createdAt: -1 })
orderSchema.index({ businessId: 1, createdAt: -1 })
orderSchema.index({ status: 1, paymentStatus: 1 })
orderSchema.index({ createdAt: -1 })

// Virtual for item count
orderSchema.virtual('itemCount').get(function () {
  return this.items.reduce((sum, item) => sum + item.quantity, 0)
})

export const Order = model<IOrder>('Order', orderSchema)
export default Order
