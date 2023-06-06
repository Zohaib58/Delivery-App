const express = require('express')
const router = express.Router()

const {protect} = require('../middleware/authMiddleware')

const {viewInventory,
    addProduct,
    deleteProduct,
    viewProduct,
    updateProduct,
    getVendorProducts} = require('../controllers/inventoryController')


router.get('/', protect, viewInventory)
router.post('/addProduct', protect, addProduct)
router.delete('/deleteProduct', protect, deleteProduct)
router.get('/:productId',protect, viewProduct)
//router.get('/getProducts',protect, getVendorProducts)
router.put('/product/editProduct', protect, updateProduct)

module.exports = router