/**
 * Review Routes
 */

import { Router } from 'express'
import reviewController from '../controllers/review.controller'

const router = Router()

/**
 * Public routes
 */

// GET /api/reviews/product/:productId
router.get('/product/:productId', reviewController.getProductReviews)

// GET /api/reviews/product/:productId/summary
router.get('/product/:productId/summary', reviewController.getRatingSummary)

/**
 * Protected routes
 * (Add auth middleware here)
 */

// POST /api/reviews
router.post('/', reviewController.createReview)

// GET /api/reviews/user/:userId
router.get('/user/:userId', reviewController.getUserReviews)

// GET /api/reviews/:reviewId
router.get('/:reviewId', reviewController.getReviewById)

// PUT /api/reviews/:reviewId
router.put('/:reviewId', reviewController.updateReview)

// DELETE /api/reviews/:reviewId
router.delete('/:reviewId', reviewController.deleteReview)

// POST /api/reviews/:reviewId/helpful
router.post('/:reviewId/helpful', reviewController.markHelpful)

// PUT /api/reviews/:reviewId/approve (Admin only)
router.put('/:reviewId/approve', reviewController.approveReview)

export default router
