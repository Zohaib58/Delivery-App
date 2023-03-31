const express = require('express')
const router = express.Router()
const {protect} = require('../middleware/authMiddleware')

const {browseProducts,getProduct,searchProduct,
    toggleFav,viewFav} = require('../controllers/productController')

router.get('/',protect, browseProducts)
router.get('/search',protect, searchProduct)
router.get('/product',protect, getProduct)
router.post('/toggleFav', protect, toggleFav)
router.get('/favorites', protect, viewFav)

module.exports = router
