/**
 * MongoDB Database Configuration
 * Handles connection, disconnection, and initialization
 */

import mongoose, { Connection } from 'mongoose'
import { config } from './environment'

let cachedConnection: Connection | null = null

/**
 * Connect to MongoDB
 */
export const connectDatabase = async (): Promise<Connection> => {
  if (cachedConnection) {
    console.log('[DB] Using cached connection')
    return cachedConnection
  }

  try {
    console.log('[DB] Connecting to MongoDB...')
    
    const connection = await mongoose.connect(config.MONGODB_URI, {
      retryWrites: true,
      w: 'majority',
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    })

    cachedConnection = connection.connection
    
    console.log('[DB] MongoDB connected successfully')
    return cachedConnection
  } catch (error) {
    console.error('[DB] MongoDB connection error:', error)
    throw error
  }
}

/**
 * Disconnect from MongoDB
 */
export const disconnectDatabase = async (): Promise<void> => {
  if (cachedConnection) {
    await mongoose.disconnect()
    cachedConnection = null
    console.log('[DB] MongoDB disconnected')
  }
}

/**
 * Get current connection status
 */
export const getConnectionStatus = (): string => {
  const states: Record<number, string> = {
    0: 'disconnected',
    1: 'connected',
    2: 'connecting',
    3: 'disconnecting',
  }
  return states[mongoose.connection.readyState] || 'unknown'
}

/**
 * Initialize indexes for all collections
 */
export const initializeIndexes = async (): Promise<void> => {
  try {
    console.log('[DB] Initializing database indexes...')
    // Indexes will be created automatically by Mongoose schemas
    console.log('[DB] Database indexes initialized')
  } catch (error) {
    console.error('[DB] Error initializing indexes:', error)
    throw error
  }
}

export default {
  connectDatabase,
  disconnectDatabase,
  getConnectionStatus,
  initializeIndexes,
}
