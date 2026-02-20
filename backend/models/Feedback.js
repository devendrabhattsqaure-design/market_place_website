/**
 * Feedback Model
 * Collects user feedback from various touchpoints
 */

import { Schema, model, Document, Types } from 'mongoose'
import { FEEDBACK_CONTEXT, FEEDBACK_TYPES, RATING_LIMITS } from '../config/constants'

export interface IFeedback extends Document {
  _id: Types.ObjectId
  userId?: Types.ObjectId // Reference to User (optional for anonymous)
  userEmail?: string
  userName?: string
  
  // Feedback Details
  context: 'product' | 'cart' | 'contact' | 'general' | 'order'
  type: 'improvement' | 'issue' | 'suggestion' | 'complaint' | 'praise'
  rating: number // 1-5 stars
  message: string
  
  // Related Info
  relatedId?: Types.ObjectId // Reference to Product/Order/Business if applicable
  relatedType?: string // 'product' | 'order' | 'business'
  
  // Status
  isRead: boolean
  isResolved: boolean
  adminResponse?: string
  respondedAt?: Date
  
  // Meta
  ipAddress?: string
  userAgent?: string
  createdAt: Date
  updatedAt: Date
}

const feedbackSchema = new Schema<IFeedback>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      sparse: true,
      index: true,
    },
    userEmail: {
      type: String,
      trim: true,
      lowercase: true,
    },
    userName: {
      type: String,
      trim: true,
    },
    
    // Feedback Details
    context: {
      type: String,
      enum: Object.values(FEEDBACK_CONTEXT),
      required: true,
      index: true,
    },
    type: {
      type: String,
      enum: Object.values(FEEDBACK_TYPES),
      required: true,
      index: true,
    },
    rating: {
      type: Number,
      required: true,
      min: RATING_LIMITS.MIN_RATING,
      max: RATING_LIMITS.MAX_RATING,
    },
    message: {
      type: String,
      required: true,
      trim: true,
      minlength: 5,
      maxlength: 2000,
    },
    
    // Related Info
    relatedId: {
      type: Schema.Types.ObjectId,
      sparse: true,
      index: true,
    },
    relatedType: {
      type: String,
      enum: ['product', 'order', 'business'],
      sparse: true,
    },
    
    // Status
    isRead: {
      type: Boolean,
      default: false,
      index: true,
    },
    isResolved: {
      type: Boolean,
      default: false,
      index: true,
    },
    adminResponse: String,
    respondedAt: Date,
    
    // Meta
    ipAddress: String,
    userAgent: String,
  },
  {
    timestamps: true,
  }
)

// Indexes
feedbackSchema.index({ userId: 1, createdAt: -1 })
feedbackSchema.index({ context: 1, isRead: 1 })
feedbackSchema.index({ rating: 1, type: 1 })
feedbackSchema.index({ createdAt: -1 })

export const Feedback = model<IFeedback>('Feedback', feedbackSchema)
export default Feedback
