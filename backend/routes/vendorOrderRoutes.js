const express = require('express')
const router = express.Router()
const {protect} = require('../middleware/authMiddleware')

const {getAVendorOrder,
    getVendorOrders,
    vendorUpdateOrderStatus} = require('../controllers/orderController')


router.get('/',protect, getVendorOrders);
router.get('/orders/order', protect, getAVendorOrder);
router.patch('/editOrder', protect, vendorUpdateOrderStatus);

module.exports= router