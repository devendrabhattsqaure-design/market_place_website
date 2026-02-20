/**
 * Custom Error Types
 * Error handling for the application
 */

/**
 * Base Application Error
 */
export class AppError extends Error {
  public readonly statusCode: number
  public readonly code: string
  public readonly details?: any

  constructor(
    message: string,
    statusCode: number = 500,
    code: string = 'INTERNAL_ERROR',
    details?: any
  ) {
    super(message)
    this.statusCode = statusCode
    this.code = code
    this.details = details

    Object.setPrototypeOf(this, AppError.prototype)
  }
}

/**
 * Validation Error
 */
export class ValidationError extends AppError {
  constructor(message: string, details?: any) {
    super(message, 400, 'VALIDATION_ERROR', details)
    Object.setPrototypeOf(this, ValidationError.prototype)
  }
}

/**
 * Authentication Error
 */
export class AuthenticationError extends AppError {
  constructor(message: string = 'Authentication failed') {
    super(message, 401, 'UNAUTHORIZED')
    Object.setPrototypeOf(this, AuthenticationError.prototype)
  }
}

/**
 * Authorization Error
 */
export class AuthorizationError extends AppError {
  constructor(message: string = 'Access denied') {
    super(message, 403, 'FORBIDDEN')
    Object.setPrototypeOf(this, AuthorizationError.prototype)
  }
}

/**
 * Not Found Error
 */
export class NotFoundError extends AppError {
  constructor(resource: string = 'Resource') {
    super(`${resource} not found`, 404, 'NOT_FOUND')
    Object.setPrototypeOf(this, NotFoundError.prototype)
  }
}

/**
 * Duplicate Error (Conflict)
 */
export class DuplicateError extends AppError {
  constructor(field: string, value: string) {
    super(`${field} '${value}' already exists`, 409, 'DUPLICATE_ERROR')
    Object.setPrototypeOf(this, DuplicateError.prototype)
  }
}

/**
 * Bad Request Error
 */
export class BadRequestError extends AppError {
  constructor(message: string, details?: any) {
    super(message, 400, 'BAD_REQUEST', details)
    Object.setPrototypeOf(this, BadRequestError.prototype)
  }
}

/**
 * Service Unavailable Error
 */
export class ServiceUnavailableError extends AppError {
  constructor(service: string = 'Service') {
    super(`${service} is temporarily unavailable`, 503, 'SERVICE_UNAVAILABLE')
    Object.setPrototypeOf(this, ServiceUnavailableError.prototype)
  }
}

/**
 * Rate Limit Error
 */
export class RateLimitError extends AppError {
  constructor(message: string = 'Too many requests') {
    super(message, 429, 'RATE_LIMITED')
    Object.setPrototypeOf(this, RateLimitError.prototype)
  }
}

/**
 * Database Error
 */
export class DatabaseError extends AppError {
  constructor(message: string = 'Database operation failed') {
    super(message, 500, 'DATABASE_ERROR')
    Object.setPrototypeOf(this, DatabaseError.prototype)
  }
}

/**
 * Payment Error
 */
export class PaymentError extends AppError {
  constructor(message: string = 'Payment processing failed') {
    super(message, 400, 'PAYMENT_ERROR')
    Object.setPrototypeOf(this, PaymentError.prototype)
  }
}

/**
 * File Upload Error
 */
export class FileUploadError extends AppError {
  constructor(message: string = 'File upload failed') {
    super(message, 400, 'FILE_UPLOAD_ERROR')
    Object.setPrototypeOf(this, FileUploadError.prototype)
  }
}

/**
 * Email Error
 */
export class EmailError extends AppError {
  constructor(message: string = 'Failed to send email') {
    super(message, 500, 'EMAIL_ERROR')
    Object.setPrototypeOf(this, EmailError.prototype)
  }
}

/**
 * Integration Error (Third-party services)
 */
export class IntegrationError extends AppError {
  constructor(service: string, message: string = '') {
    super(
      message || `Integration with ${service} failed`,
      500,
      'INTEGRATION_ERROR'
    )
    Object.setPrototypeOf(this, IntegrationError.prototype)
  }
}

export default {
  AppError,
  ValidationError,
  AuthenticationError,
  AuthorizationError,
  NotFoundError,
  DuplicateError,
  BadRequestError,
  ServiceUnavailableError,
  RateLimitError,
  DatabaseError,
  PaymentError,
  FileUploadError,
  EmailError,
  IntegrationError,
}
