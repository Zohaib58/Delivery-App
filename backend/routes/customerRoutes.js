const express = require('express')
const router = express.Router()
const { 
    createCustomer,
    updateCustomer,
    getCustomers,
    deleteCustomer,
 } = require('../controllers/customerController')

 const {protect} =  require('../middleware/authMiddleware')

router.post('/', protect, createCustomer)
router.put('/edit', protect, updateCustomer)
router.delete('/delete', protect, deleteCustomer)
router.get('/get', protect, getCustomers)

module.exports = router