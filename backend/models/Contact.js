/**
 * Contact Model
 * Stores contact form submissions
 */

import { Schema, model, Document, Types } from 'mongoose'
import { CONTACT_STATUS } from '../config/constants'

export interface IContact extends Document {
  _id: Types.ObjectId
  name: string
  email: string
  phone: string
  subject: string
  message: string
  
  // Status
  status: 'new' | 'reviewed' | 'resolved'
  priority?: 'low' | 'medium' | 'high'
  
  // Admin Response
  adminResponse?: string
  respondedBy?: Types.ObjectId // Reference to Admin User
  respondedAt?: Date
  
  // Meta
  ipAddress?: string
  userAgent?: string
  category?: string
  createdAt: Date
  updatedAt: Date
}

const contactSchema = new Schema<IContact>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 100,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    subject: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 200,
    },
    message: {
      type: String,
      required: true,
      trim: true,
      minlength: 10,
      maxlength: 5000,
    },
    
    // Status
    status: {
      type: String,
      enum: Object.values(CONTACT_STATUS),
      default: CONTACT_STATUS.NEW,
      index: true,
    },
    priority: {
      type: String,
      enum: ['low', 'medium', 'high'],
      default: 'medium',
    },
    
    // Admin Response
    adminResponse: String,
    respondedBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      sparse: true,
    },
    respondedAt: Date,
    
    // Meta
    ipAddress: String,
    userAgent: String,
    category: String,
  },
  {
    timestamps: true,
  }
)

// Indexes
contactSchema.index({ email: 1 })
contactSchema.index({ status: 1, createdAt: -1 })
contactSchema.index({ createdAt: -1 })
contactSchema.index({ priority: 1, status: 1 })

export const Contact = model<IContact>('Contact', contactSchema)
export default Contact
