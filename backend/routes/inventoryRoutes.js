const express = require('express')
const router = express.Router()

const {protect} = require('../middleware/authMiddleware')

const {viewInventory,
    addProduct,
    deleteProduct,
    viewProduct,
    updateProduct} = require('../controllers/inventoryController')


router.get('/', protect, viewInventory)
router.post('/addProducts', protect, addProduct)
router.delete('/deleteProduct', protect, deleteProduct)
router.get('/product',protect, viewProduct)
router.patch('/product/editProduct', protect, updateProduct)

/*router.get('/', viewInventory)
router.post('/addProduct', addProduct)
router.delete('/deleteProduct', deleteProduct)
router.get('/product', viewProduct)
router.patch('/product/editProduct', updateProduct)*/

module.exports = router