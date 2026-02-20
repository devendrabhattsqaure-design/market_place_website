/**
 * Cart Routes
 */

import { Router } from 'express'
import cartController from '../controllers/cart.controller'

const router = Router()

/**
 * Protected routes - Buyer only
 * (Add auth middleware here)
 */

// GET /api/cart
router.get('/', cartController.getUserCarts)

// GET /api/cart/:businessId
router.get('/:businessId', cartController.getCart)

// POST /api/cart/:businessId/items
router.post('/:businessId/items', cartController.addToCart)

// PUT /api/cart/:businessId/items/:productId
router.put('/:businessId/items/:productId', cartController.updateCartItem)

// DELETE /api/cart/:businessId/items/:productId
router.delete('/:businessId/items/:productId', cartController.removeFromCart)

// DELETE /api/cart/:businessId
router.delete('/:businessId', cartController.clearCart)

// POST /api/cart/:businessId/apply-coupon
router.post('/:businessId/apply-coupon', cartController.applyCoupon)

// POST /api/cart/:businessId/calculate
router.post('/:businessId/calculate', cartController.calculateTotals)

export default router
