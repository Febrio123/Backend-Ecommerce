import express from 'express'
import { createOrder, allOrder, detailOrder, currentUserOrder } from '../controllers/orderController.js'
import { adminMiddleware, protectedMiddleware } from '../middleware/authMiddleware.js'
const router = express.Router()

router.post('/', protectedMiddleware, createOrder)
router.get('/', protectedMiddleware, adminMiddleware, allOrder)
router.get('/:id', protectedMiddleware, adminMiddleware, detailOrder)
router.get('/current/user', protectedMiddleware, currentUserOrder)

export default router