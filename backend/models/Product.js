/**
 * Product Model
 * Represents products listed by business owners
 */

import { Schema, model, Document, Types } from 'mongoose'
import { PRODUCT_STATUS, BUSINESS_CATEGORIES } from '../config/constants'

export interface IProduct extends Document {
  _id: Types.ObjectId
  businessId: Types.ObjectId // Reference to User (business owner)
  name: string
  description: string
  category: string
  price: number
  discountedPrice?: number
  discount?: number // Percentage
  
  // Media
  images: string[] // Array of image URLs
  thumbnail?: string
  
  // Product Details
  specifications?: Record<string, string>
  sku?: string
  barcode?: string
  
  // Inventory
  stock: number
  unitsSold: number
  
  // Ratings & Reviews
  averageRating: number
  reviewCount: number
  
  // Status
  status: 'active' | 'inactive' | 'out_of_stock'
  isDeleted: boolean
  deletedAt?: Date
  
  // Meta
  createdAt: Date
  updatedAt: Date
}

const productSchema = new Schema<IProduct>(
  {
    businessId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      enum: BUSINESS_CATEGORIES,
      required: true,
      index: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    discountedPrice: {
      type: Number,
      min: 0,
    },
    discount: {
      type: Number,
      min: 0,
      max: 100,
    },
    
    // Media
    images: {
      type: [String],
      default: [],
    },
    thumbnail: String,
    
    // Product Details
    specifications: {
      type: Map,
      of: String,
    },
    sku: {
      type: String,
      sparse: true,
      unique: true,
    },
    barcode: String,
    
    // Inventory
    stock: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
    },
    unitsSold: {
      type: Number,
      default: 0,
      min: 0,
    },
    
    // Ratings
    averageRating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    reviewCount: {
      type: Number,
      default: 0,
      min: 0,
    },
    
    // Status
    status: {
      type: String,
      enum: PRODUCT_STATUS,
      default: PRODUCT_STATUS.ACTIVE,
      index: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
      index: true,
    },
    deletedAt: Date,
  },
  {
    timestamps: true,
  }
)

// Indexes
productSchema.index({ businessId: 1, isDeleted: 1 })
productSchema.index({ category: 1, status: 1 })
productSchema.index({ name: 'text', description: 'text' })
productSchema.index({ createdAt: -1 })
productSchema.index({ averageRating: -1 })

// Virtual for discount percentage
productSchema.virtual('discountPercentage').get(function () {
  if (!this.discountedPrice) return 0
  return Math.round(((this.price - this.discountedPrice) / this.price) * 100)
})

// Virtual for final price
productSchema.virtual('finalPrice').get(function () {
  return this.discountedPrice || this.price
})

// Virtual for stock status
productSchema.virtual('inStock').get(function () {
  return this.stock > 0
})

export const Product = model<IProduct>('Product', productSchema)
export default Product
