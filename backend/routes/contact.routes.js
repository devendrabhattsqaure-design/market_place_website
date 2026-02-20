/**
 * Contact Routes
 */

import { Router } from 'express'
import contactController from '../controllers/contact.controller'

const router = Router()

/**
 * Public routes
 */

// POST /api/contact
router.post('/', contactController.submitContactForm)

/**
 * Protected routes - Admin only
 * (Add auth and authorization middleware here)
 */

// GET /api/contact
router.get('/', contactController.getAllContacts)

// GET /api/contact/stats
router.get('/stats', contactController.getContactStats)

// GET /api/contact/export
router.get('/export', contactController.exportContacts)

// GET /api/contact/:contactId
router.get('/:contactId', contactController.getContactById)

// PUT /api/contact/:contactId/status
router.put('/:contactId/status', contactController.updateContactStatus)

// PUT /api/contact/:contactId/response
router.put('/:contactId/response', contactController.addContactResponse)

// DELETE /api/contact/:contactId
router.delete('/:contactId', contactController.deleteContact)

export default router
