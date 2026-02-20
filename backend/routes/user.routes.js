/**
 * User Routes
 */

import { Router } from 'express'
import userController from '../controllers/user.controller'

const router = Router()

/**
 * Public routes
 */

// GET /api/users/:userId
router.get('/:userId', userController.getUserById)

// GET /api/users/business/:businessId
router.get('/business/:businessId', userController.getBusinessProfile)

// GET /api/users/business/:businessId/stats
router.get('/business/:businessId/stats', userController.getBusinessStats)

/**
 * Protected routes
 * (Add auth middleware here)
 */

// GET /api/users/profile
router.get('/profile', userController.getProfile)

// PUT /api/users/profile
router.put('/profile', userController.updateProfile)

// POST /api/users/change-password
router.post('/change-password', userController.changePassword)

// POST /api/users/profile-image
router.post('/profile-image', userController.uploadProfileImage)

// DELETE /api/users/account
router.delete('/account', userController.deleteAccount)

export default router
