const express = require('express')
const router = express.Router()
const {protect} = require('../middleware/authMiddleware')

const {browseProducts,getProduct,searchProduct,
    toggleFav,viewFav, getVendorProducts} = require('../controllers/productController')

router.get('/:category',protect, browseProducts)
router.get('/search',protect, searchProduct)
router.get('/product/:id',protect, getProduct)
router.post('/toggleFav', protect, toggleFav)
router.get('/favorites', protect, viewFav)
router.post('/vendorProducts', protect, getVendorProducts)

module.exports = router
