const express = require('express')
const router = express.Router()
const {protect} = require('../middleware/authMiddleware')

const {browseProducts,getProduct,searchProduct,
    toggleFav,viewFav} = require('../controllers/productController')

router.get('/', browseProducts)
router.post('/search', searchProduct)
router.delete('/product', getProduct)
router.get('/toggleFav', protect, toggleFav)
router.patch('/favorites', protect, viewFav)

module.exports = router
