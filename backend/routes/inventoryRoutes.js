const express = require('express')
const router = express.Router()

const {protect} = require('../middleware/authMiddleware')

const {viewInventory,
    addProduct,
    deleteProduct,
    viewProduct,
    updateProduct} = require('../controllers/inventoryController')


router.get('/', protect, viewInventory)
router.post('/addProduct', protect, addProduct)
router.delete('/deleteProduct', protect, deleteProduct)
router.get('/product/:productId',protect, viewProduct)
router.patch('/product/editProduct', protect, updateProduct)

module.exports = router