/**
 * Express Server Setup
 * Main server configuration and middleware setup
 */

import express, { Application } from 'express'
import cors from 'cors'
import helmet from 'helmet'
import mongoSanitize from 'express-mongo-sanitize'
import compression from 'compression'

import { config } from './config/environment'
import { connectDatabase } from './config/database'

// Middleware imports
import { requestLogger, errorLogger, performanceMonitor } from './middleware/logging'
import { errorHandler, notFoundHandler } from './middleware/errorHandler'

// Route imports
import authRoutes from './routes/auth.routes'
import userRoutes from './routes/user.routes'
import productRoutes from './routes/product.routes'
import cartRoutes from './routes/cart.routes'
import orderRoutes from './routes/order.routes'
import feedbackRoutes from './routes/feedback.routes'
import contactRoutes from './routes/contact.routes'
import reviewRoutes from './routes/review.routes'

/**
 * Create and configure Express app
 */
export const createApp = (): Application => {
  const app = express()

  // Trust proxy
  app.set('trust proxy', 1)

  // Body parser middleware
  app.use(express.json({ limit: '10mb' }))
  app.use(express.urlencoded({ limit: '10mb', extended: true }))

  // Security middleware
  app.use(helmet())
  app.use(mongoSanitize())

  // CORS configuration
  app.use(
    cors({
      origin: config.FRONTEND_URL,
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization'],
    })
  )

  // Compression middleware
  app.use(compression())

  // Logging middleware
  app.use(performanceMonitor(1000)) // Log requests slower than 1 second
  app.use(requestLogger)
  app.use(errorLogger)

  // Health check route
  app.get('/health', (req, res) => {
    res.json({
      status: 'ok',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
    })
  })

  // API routes
  app.use('/api/auth', authRoutes)
  app.use('/api/users', userRoutes)
  app.use('/api/products', productRoutes)
  app.use('/api/cart', cartRoutes)
  app.use('/api/orders', orderRoutes)
  app.use('/api/feedback', feedbackRoutes)
  app.use('/api/contact', contactRoutes)
  app.use('/api/reviews', reviewRoutes)

  // 404 handler
  app.use(notFoundHandler)

  // Global error handler (must be last)
  app.use(errorHandler)

  return app
}

/**
 * Start the server
 */
export const startServer = async (): Promise<void> => {
  try {
    // Connect to database
    await connectDatabase()

    // Create app
    const app = createApp()

    // Start listening
    const server = app.listen(config.PORT, () => {
      console.log(`Server running on port ${config.PORT}`)
      console.log(`Environment: ${config.NODE_ENV}`)
    })

    // Graceful shutdown
    process.on('SIGTERM', () => {
      console.log('SIGTERM signal received: closing HTTP server')
      server.close(() => {
        console.log('HTTP server closed')
        process.exit(0)
      })
    })

    process.on('SIGINT', () => {
      console.log('SIGINT signal received: closing HTTP server')
      server.close(() => {
        console.log('HTTP server closed')
        process.exit(0)
      })
    })
  } catch (error) {
    console.error('Failed to start server:', error)
    process.exit(1)
  }
}

export default { createApp, startServer }
