/**
 * Review Model
 * Product reviews and ratings
 */

import { Schema, model, Document, Types } from 'mongoose'
import { RATING_LIMITS } from '../config/constants'

export interface IReview extends Document {
  _id: Types.ObjectId
  productId: Types.ObjectId // Reference to Product
  businessId: Types.ObjectId // Reference to User (business owner)
  userId: Types.ObjectId // Reference to User (reviewer)
  
  // Review Content
  rating: number // 1-5 stars
  title: string
  comment: string
  isVerifiedPurchase: boolean
  
  // Helpful Count
  helpfulCount: number
  unhelpfulCount: number
  
  // Media
  images?: string[]
  
  // Status
  isApproved: boolean
  isDeleted: boolean
  deletedAt?: Date
  
  // Meta
  createdAt: Date
  updatedAt: Date
}

const reviewSchema = new Schema<IReview>(
  {
    productId: {
      type: Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
      index: true,
    },
    businessId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    
    // Review Content
    rating: {
      type: Number,
      required: true,
      min: RATING_LIMITS.MIN_RATING,
      max: RATING_LIMITS.MAX_RATING,
    },
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 5,
      maxlength: 200,
    },
    comment: {
      type: String,
      required: true,
      trim: true,
      minlength: RATING_LIMITS.MIN_REVIEW_LENGTH,
      maxlength: RATING_LIMITS.MAX_REVIEW_LENGTH,
    },
    isVerifiedPurchase: {
      type: Boolean,
      default: false,
    },
    
    // Helpful
    helpfulCount: {
      type: Number,
      default: 0,
      min: 0,
    },
    unhelpfulCount: {
      type: Number,
      default: 0,
      min: 0,
    },
    
    // Media
    images: [String],
    
    // Status
    isApproved: {
      type: Boolean,
      default: true,
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
reviewSchema.index({ productId: 1, isDeleted: 1 })
reviewSchema.index({ userId: 1, createdAt: -1 })
reviewSchema.index({ businessId: 1, createdAt: -1 })
reviewSchema.index({ rating: 1 })
reviewSchema.index({ isVerifiedPurchase: 1 })
reviewSchema.index({ createdAt: -1 })

// Compound index for finding a user's review for a product
reviewSchema.index({ productId: 1, userId: 1 }, { unique: true, sparse: true })

export const Review = model<IReview>('Review', reviewSchema)
export default Review
