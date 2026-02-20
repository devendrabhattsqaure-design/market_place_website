/**
 * Backend Entry Point
 * Starts the Express server
 */

import { validateConfig } from './config/environment'
import { startServer } from './server'

// Validate environment variables
validateConfig()

// Start the server
startServer().catch((error) => {
  console.error('Fatal error:', error)
  process.exit(1)
})
