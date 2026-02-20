/**
 * User Model
 * Represents both business owners and buyers
 */

import { Schema, model, Document } from 'mongoose'
import { USER_ROLES, BUSINESS_CATEGORIES } from '../config/constants'

export interface IUser extends Document {
  // Basic Info
  email: string
  password: string
  name: string
  phone: string
  role: 'buyer' | 'business' | 'admin'
  
  // Profile
  profileImage?: string
  address?: {
    street: string
    city: string
    state: string
    zipCode: string
    country: string
  }
  
  // Business Details (if role === 'business')
  businessDetails?: {
    businessName: string
    description: string
    category: string
    logo?: string
    banner?: string
    whatsappNumber: string
    website?: string
    yearEstablished?: number
  }
  
  // Bank Details (for business)
  bankDetails?: {
    accountName: string
    accountNumber: string
    bankName: string
    ifscCode: string
    upiId?: string
  }
  
  // Verification & Status
  isVerified: boolean
  verificationToken?: string
  verificationTokenExpiry?: Date
  
  // Ratings & Reviews
  totalRating: number
  ratingCount: number
  averageRating: number
  totalSales?: number
  
  // Account Status
  isActive: boolean
  isDeleted: boolean
  deletedAt?: Date
  
  // Meta
  lastLogin?: Date
  createdAt: Date
  updatedAt: Date
}

const userSchema = new Schema<IUser>(
  {
    // Basic Info
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      index: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
      select: false, // Don't return password by default
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    role: {
      type: String,
      enum: [USER_ROLES.BUYER, USER_ROLES.BUSINESS, USER_ROLES.ADMIN],
      default: USER_ROLES.BUYER,
    },
    
    // Profile
    profileImage: String,
    address: {
      street: String,
      city: String,
      state: String,
      zipCode: String,
      country: String,
    },
    
    // Business Details
    businessDetails: {
      businessName: String,
      description: String,
      category: {
        type: String,
        enum: BUSINESS_CATEGORIES,
      },
      logo: String,
      banner: String,
      whatsappNumber: String,
      website: String,
      yearEstablished: Number,
    },
    
    // Bank Details
    bankDetails: {
      accountName: String,
      accountNumber: String,
      bankName: String,
      ifscCode: String,
      upiId: String,
    },
    
    // Verification
    isVerified: {
      type: Boolean,
      default: false,
    },
    verificationToken: String,
    verificationTokenExpiry: Date,
    
    // Ratings
    totalRating: {
      type: Number,
      default: 0,
    },
    ratingCount: {
      type: Number,
      default: 0,
    },
    averageRating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    totalSales: {
      type: Number,
      default: 0,
    },
    
    // Status
    isActive: {
      type: Boolean,
      default: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    deletedAt: Date,
    
    // Meta
    lastLogin: Date,
  },
  {
    timestamps: true,
  }
)

// Indexes
userSchema.index({ email: 1 })
userSchema.index({ role: 1 })
userSchema.index({ isVerified: 1 })
userSchema.index({ 'businessDetails.category': 1 })
userSchema.index({ createdAt: -1 })

// Virtual for full business info
userSchema.virtual('isBusinessOwner').get(function () {
  return this.role === USER_ROLES.BUSINESS
})

export const User = model<IUser>('User', userSchema)
export default User
