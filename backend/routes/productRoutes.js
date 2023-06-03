const express = require('express')
const router = express.Router()
const {protect} = require('../middleware/authMiddleware')

const {browseProducts,getProduct,searchProduct,
    toggleFav,viewFav, getQuantity} = require('../controllers/productController')


router.get('/favorites/:keyword', protect, viewFav)
router.get('/getQuantity/:productID', getQuantity)
router.get('/product/:id',protect, getProduct)
router.get('/:category/:keyword',protect, browseProducts)
router.get('/search',protect, searchProduct)
router.post('/toggleFav', protect, toggleFav)


module.exports = router
