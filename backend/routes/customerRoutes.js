const express = require('express')
const router = express.Router()
const { 
    createCustomer,
    updateCustomer,
    getCustomers,
    deleteCustomer,
    getAllCustomers
 } = require('../controllers/customerController')

 const {protect} =  require('../middleware/authMiddleware')

router.post('/', protect, createCustomer)
router.put('/edit', protect, updateCustomer)
router.delete('/delete/:id', protect, deleteCustomer)
router.get('/get', protect, getCustomers)
router.get('/all', getAllCustomers)

module.exports = router