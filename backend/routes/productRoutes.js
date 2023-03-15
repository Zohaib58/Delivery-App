const express = require('express')
const router = express.Router()
const {protect} = require('../middleware/authMiddleware')

const {browseProducts,getProduct,searchProduct,
    toggleFav,viewFav} = require('../controllers/productController')

router.get('/', browseProducts)
router.get('/search', searchProduct)
router.get('/product', getProduct)
//router.get('/toggleFav', protect, toggleFav)
//router.patch('/favorites', protect, viewFav)
router.get('/toggleFav', toggleFav)
router.get('/favorites', viewFav)

module.exports = router
