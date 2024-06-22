import express from 'express'
const router = express.Router()
import { allProduct, createProduct, deleteProduct, detailProduct, fileUpload, updateProduct } from '../controllers/productController.js'
import { adminMiddleware, protectedMiddleware } from '../middleware/authMiddleware.js'
import { upload } from '../utils/uploadFileHandler.js'
// create PRODUCT

// create PRODUCT
router.post('/', protectedMiddleware, adminMiddleware, createProduct)
router.get('/', allProduct)
router.get('/:id', detailProduct)
router.put('/:id', protectedMiddleware, adminMiddleware, updateProduct)
router.delete('/:id', protectedMiddleware, adminMiddleware, deleteProduct)
router.post('/file-upload', protectedMiddleware, adminMiddleware, upload.single('image'), fileUpload)


// CREATE DATA PRODUCT

// POST /API/V1/PRODUCT

// MIDDLEWARE OWNER


export default router