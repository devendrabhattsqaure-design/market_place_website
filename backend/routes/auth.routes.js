/**
 * Authentication Routes
 */

import { Router } from 'express'
import authController from '../controllers/auth.controller'

const router = Router()

/**
 * Public routes
 */

// POST /api/auth/register
router.post('/register', authController.register)

// POST /api/auth/login
router.post('/login', authController.login)

// POST /api/auth/refresh-token
router.post('/refresh-token', authController.refreshToken)

// GET /api/auth/verify-email/:token
router.get('/verify-email/:token', authController.verifyEmail)

// POST /api/auth/forgot-password
router.post('/forgot-password', authController.forgotPassword)

// POST /api/auth/reset-password/:token
router.post('/reset-password/:token', authController.resetPassword)

/**
 * Protected routes
 * (Add auth middleware here)
 */

// POST /api/auth/logout
router.post('/logout', authController.logout)

export default router
