/**
 * Order Routes
 */

import { Router } from 'express'
import orderController from '../controllers/order.controller'

const router = Router()

/**
 * Protected routes
 * (Add auth middleware here)
 */

// POST /api/orders
router.post('/', orderController.createOrder)

// GET /api/orders
router.get('/', orderController.getUserOrders)

// GET /api/orders/stats/summary
router.get('/stats/summary', orderController.getOrderStats)

// GET /api/orders/export
router.get('/export', orderController.exportOrders)

// GET /api/orders/:orderId
router.get('/:orderId', orderController.getOrderById)

// PUT /api/orders/:orderId/status
router.put('/:orderId/status', orderController.updateOrderStatus)

// PUT /api/orders/:orderId/cancel
router.put('/:orderId/cancel', orderController.cancelOrder)

// PUT /api/orders/:orderId/tracking
router.put('/:orderId/tracking', orderController.updateTracking)

// POST /api/orders/:orderId/refund
router.post('/:orderId/refund', orderController.processRefund)

// GET /api/orders/business/:businessId
router.get('/business/:businessId', orderController.getBusinessOrders)

export default router
