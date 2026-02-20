/**
 * Application Constants
 * Central place for all application-level constants
 */

// User Roles
export const USER_ROLES = {
  BUYER: 'buyer',
  BUSINESS: 'business',
  ADMIN: 'admin',
} as const

// Business Categories
export const BUSINESS_CATEGORIES = [
  'Electronics',
  'Fashion',
  'Home & Living',
  'Beauty & Personal Care',
  'Sports & Outdoors',
  'Books & Media',
  'Food & Beverages',
  'Health & Wellness',
  'Automotive',
  'Pets & Animals',
  'Toys & Games',
  'Office Supplies',
  'Garden & Outdoor',
  'Tools & Hardware',
  'Other',
] as const

// Product Status
export const PRODUCT_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  OUT_OF_STOCK: 'out_of_stock',
} as const

// Order Status
export const ORDER_STATUS = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  PROCESSING: 'processing',
  SHIPPED: 'shipped',
  DELIVERED: 'delivered',
  CANCELLED: 'cancelled',
  RETURNED: 'returned',
} as const

// Payment Status
export const PAYMENT_STATUS = {
  PENDING: 'pending',
  COMPLETED: 'completed',
  FAILED: 'failed',
  REFUNDED: 'refunded',
} as const

// Payment Methods
export const PAYMENT_METHODS = {
  WHATSAPP: 'whatsapp',
  BANK_TRANSFER: 'bank_transfer',
  CASH_ON_DELIVERY: 'cod',
  UPI: 'upi',
  CARD: 'card',
} as const

// Feedback Context
export const FEEDBACK_CONTEXT = {
  PRODUCT: 'product',
  CART: 'cart',
  CONTACT: 'contact',
  GENERAL: 'general',
  ORDER: 'order',
} as const

// Feedback Types
export const FEEDBACK_TYPES = {
  IMPROVEMENT: 'improvement',
  ISSUE: 'issue',
  SUGGESTION: 'suggestion',
  COMPLAINT: 'complaint',
  PRAISE: 'praise',
} as const

// Contact Status
export const CONTACT_STATUS = {
  NEW: 'new',
  REVIEWED: 'reviewed',
  RESOLVED: 'resolved',
} as const

// Rating Limits
export const RATING_LIMITS = {
  MIN_RATING: 1,
  MAX_RATING: 5,
  MIN_REVIEW_LENGTH: 10,
  MAX_REVIEW_LENGTH: 1000,
} as const

// Pagination
export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 20,
  MAX_LIMIT: 100,
} as const

// Cache Durations (in seconds)
export const CACHE_DURATIONS = {
  SHORT: 300, // 5 minutes
  MEDIUM: 3600, // 1 hour
  LONG: 86400, // 24 hours
} as const

// Validation Rules
export const VALIDATION_RULES = {
  PASSWORD_MIN_LENGTH: 8,
  PASSWORD_MAX_LENGTH: 50,
  NAME_MIN_LENGTH: 2,
  NAME_MAX_LENGTH: 100,
  EMAIL_MAX_LENGTH: 254,
  PHONE_MIN_LENGTH: 10,
  PHONE_MAX_LENGTH: 15,
  DESCRIPTION_MAX_LENGTH: 5000,
  CART_EXPIRY_DAYS: 30,
} as const

// Error Codes
export const ERROR_CODES = {
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  UNAUTHORIZED: 'UNAUTHORIZED',
  FORBIDDEN: 'FORBIDDEN',
  NOT_FOUND: 'NOT_FOUND',
  DUPLICATE_ERROR: 'DUPLICATE_ERROR',
  INTERNAL_ERROR: 'INTERNAL_ERROR',
  BAD_REQUEST: 'BAD_REQUEST',
} as const

// HTTP Status Codes
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_ERROR: 500,
} as const

export default {
  USER_ROLES,
  BUSINESS_CATEGORIES,
  PRODUCT_STATUS,
  ORDER_STATUS,
  PAYMENT_STATUS,
  PAYMENT_METHODS,
  FEEDBACK_CONTEXT,
  FEEDBACK_TYPES,
  CONTACT_STATUS,
  RATING_LIMITS,
  PAGINATION,
  CACHE_DURATIONS,
  VALIDATION_RULES,
  ERROR_CODES,
  HTTP_STATUS,
}
