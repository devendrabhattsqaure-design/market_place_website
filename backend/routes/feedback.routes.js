/**
 * Feedback Routes
 */

import { Router } from 'express'
import feedbackController from '../controllers/feedback.controller'

const router = Router()

/**
 * Public routes
 */

// POST /api/feedback
router.post('/', feedbackController.submitFeedback)

/**
 * Protected routes
 * (Add auth middleware here)
 */

// GET /api/feedback
router.get('/', feedbackController.getAllFeedback)

// GET /api/feedback/stats
router.get('/stats', feedbackController.getFeedbackStats)

// GET /api/feedback/context/:context
router.get('/context/:context', feedbackController.getFeedbackByContext)

// GET /api/feedback/user/me
router.get('/user/me', feedbackController.getUserFeedback)

// GET /api/feedback/:feedbackId
router.get('/:feedbackId', feedbackController.getFeedbackById)

// PUT /api/feedback/:feedbackId/read
router.put('/:feedbackId/read', feedbackController.markAsRead)

// PUT /api/feedback/:feedbackId/resolve
router.put('/:feedbackId/resolve', feedbackController.markAsResolved)

// PUT /api/feedback/:feedbackId/response
router.put('/:feedbackId/response', feedbackController.addResponse)

// DELETE /api/feedback/:feedbackId
router.delete('/:feedbackId', feedbackController.deleteFeedback)

export default router
