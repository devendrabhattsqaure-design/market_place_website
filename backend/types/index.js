/**
 * Global Types & Interfaces
 * TypeScript types used across the backend
 */

import { Request } from 'express'
import { Types } from 'mongoose'

/**
 * Authentication Types
 */
export interface ITokenPayload {
  id: string
  email: string
  role: 'buyer' | 'business' | 'admin'
  iat?: number
  exp?: number
}

export interface IAuthRequest extends Request {
  user?: ITokenPayload
  token?: string
}

export interface ILoginRequest {
  email: string
  password: string
}

export interface ISignupRequest {
  email: string
  password: string
  confirmPassword: string
  name: string
  phone: string
  role: 'buyer' | 'business'
  businessDetails?: {
    businessName: string
    category: string
    whatsappNumber: string
  }
}

export interface IAuthResponse {
  token: string
  refreshToken: string
  user: {
    id: string
    email: string
    name: string
    role: string
  }
}

/**
 * Pagination Types
 */
export interface IPaginationParams {
  page: number
  limit: number
  skip: number
}

export interface IPaginatedResponse<T> {
  data: T[]
  pagination: {
    total: number
    page: number
    limit: number
    totalPages: number
    hasMore: boolean
  }
}

/**
 * API Response Types
 */
export interface IApiResponse<T = any> {
  success: boolean
  message: string
  data?: T
  error?: string
  statusCode: number
}

export interface IApiErrorResponse {
  success: false
  message: string
  error: string
  statusCode: number
  errors?: Record<string, string[]>
}

/**
 * Query Types
 */
export interface IProductQuery {
  page?: number
  limit?: number
  category?: string
  businessId?: string
  search?: string
  minPrice?: number
  maxPrice?: number
  sortBy?: 'price' | 'rating' | 'newest' | 'popular'
  order?: 'asc' | 'desc'
  inStock?: boolean
}

export interface IOrderQuery {
  page?: number
  limit?: number
  status?: string
  paymentStatus?: string
  startDate?: Date
  endDate?: Date
}

export interface IFeedbackQuery {
  page?: number
  limit?: number
  context?: string
  type?: string
  rating?: number
  userId?: string
  isRead?: boolean
  isResolved?: boolean
}

/**
 * Search & Filter Types
 */
export interface ISearchOptions {
  q?: string
  category?: string
  minPrice?: number
  maxPrice?: number
  rating?: number
  inStock?: boolean
  verified?: boolean
}

/**
 * Validation Types
 */
export interface IValidationError {
  field: string
  message: string
  value?: any
}

/**
 * Transaction Types
 */
export interface ICartItemInput {
  productId: string
  quantity: number
}

export interface IOrderInput {
  items: ICartItemInput[]
  shippingAddress: {
    street: string
    city: string
    state: string
    zipCode: string
    country: string
    phone: string
  }
  paymentMethod: string
  notes?: string
}

/**
 * Review Types
 */
export interface IReviewInput {
  rating: number
  title: string
  comment: string
  images?: string[]
}

/**
 * Contact Form Types
 */
export interface IContactInput {
  name: string
  email: string
  phone: string
  subject: string
  message: string
}

/**
 * Feedback Types
 */
export interface IFeedbackInput {
  context: 'product' | 'cart' | 'contact' | 'general' | 'order'
  type: 'improvement' | 'issue' | 'suggestion' | 'complaint' | 'praise'
  rating: number
  message: string
  relatedId?: string
}

/**
 * File Upload Types
 */
export interface IUploadFile {
  fieldname: string
  originalname: string
  encoding: string
  mimetype: string
  size: number
  filename: string
  path: string
  destination: string
}

/**
 * Email Types
 */
export interface IEmailOptions {
  to: string
  subject: string
  html: string
  text?: string
  attachments?: Array<{
    filename: string
    content: string
    contentType: string
  }>
}

/**
 * Notification Types
 */
export interface INotification {
  id: string
  userId: string
  type: string
  title: string
  message: string
  data?: Record<string, any>
  isRead: boolean
  createdAt: Date
}

/**
 * Dashboard Stats Types
 */
export interface IDashboardStats {
  totalOrders: number
  totalRevenue: number
  totalProducts: number
  totalRating: number
  ratingCount: number
  averageRating: number
  recentOrders: any[]
  topProducts: any[]
}

/**
 * Business Stats Types
 */
export interface IBusinessStats {
  profileViews: number
  totalProducts: number
  totalSales: number
  totalRevenue: number
  averageOrderValue: number
  customerCount: number
  repeatCustomers: number
  cancellationRate: number
}

/**
 * Cache Key Types
 */
export type CacheKey = 
  | `user:${string}`
  | `product:${string}`
  | `products:${string}`
  | `cart:${string}`
  | `order:${string}`
  | `reviews:${string}`
  | `business:${string}`
  | string

export default {}
