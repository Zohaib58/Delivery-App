const express = require('express')
const router = express.Router()
const {protect} = require('../middleware/authMiddleware')

const {browseProducts,getProduct,searchProduct,
    toggleFav,viewFav} = require('../controllers/productController')



router.get('/product/:id',protect, getProduct)
router.get('/:category/:keyword',protect, browseProducts)
router.get('/search',protect, searchProduct)
router.post('/toggleFav', protect, toggleFav)
router.get('/favorites', protect, viewFav)

module.exports = router
