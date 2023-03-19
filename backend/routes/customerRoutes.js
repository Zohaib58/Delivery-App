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
router.put('/edit/:id', protect, updateCustomer)
router.delete('/delete/:id', protect, deleteCustomer)
router.get('/get/:id', protect, getCustomers)

module.exports = router