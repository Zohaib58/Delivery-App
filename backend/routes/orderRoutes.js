const express = require('express')
const router = express.Router()
const {protect} = require('../middleware/authMiddleware')

const {createOrder,
    viewOrders,
    viewOrder} = require('../controllers/orderController')


router.post('/createOrder',protect, createOrder);
router.get('/', protect, viewOrders);
router.get('/order', protect, viewOrder);

/*router.post('/createOrder', createOrder)
router.get('/', viewOrders)
router.get('/order', viewOrder)*/
module.exports= router