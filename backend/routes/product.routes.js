/**
 * Product Routes
 */

import { Router } from 'express'
import productController from '../controllers/product.controller'

const router = Router()

/**
 * Public routes
 */

// GET /api/products
router.get('/', productController.getAllProducts)

// GET /api/products/search
router.get('/search', productController.searchProducts)

// GET /api/products/featured
router.get('/featured', productController.getFeaturedProducts)

// GET /api/products/:productId
router.get('/:productId', productController.getProductById)

// GET /api/products/business/:businessId
router.get('/business/:businessId', productController.getProductsByBusiness)

/**
 * Protected routes - Business Owner only
 * (Add auth and authorization middleware here)
 */

// POST /api/products
router.post('/', productController.createProduct)

// PUT /api/products/:productId
router.put('/:productId', productController.updateProduct)

// DELETE /api/products/:productId
router.delete('/:productId', productController.deleteProduct)

// POST /api/products/:productId/images
router.post('/:productId/images', productController.uploadProductImages)

// PUT /api/products/bulk
router.put('/bulk', productController.bulkUpdateProducts)

export default router
