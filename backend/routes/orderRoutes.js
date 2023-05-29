const express = require('express')
const router = express.Router()
const {protect} = require('../middleware/authMiddleware')

const {createOrder,
    viewOrders,
    viewOrder,
    cancelOrder} = require('../controllers/orderController')


router.post('/createOrder',protect, createOrder);
router.get('/', protect, viewOrders);
router.get('/order/:orderId', protect, viewOrder);
router.patch('/cancelorder/:orderId', protect, cancelOrder)


module.exports= router