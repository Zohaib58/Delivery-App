const express = require('express')
const router = express.Router()
const {protect} = require('../middleware/authMiddleware')

const {getAVendorOrder,
    getVendorOrders,
    vendorUpdateOrderStatus} = require('../controllers/orderController')


router.post('/orders',protect, getVendorOrders);
router.get('/orders/order', protect, getAVendorOrder);
router.get('/editOrder', protect, vendorUpdateOrderStatus);

module.exports= router