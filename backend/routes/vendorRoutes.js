const express = require('express')
const router = express.Router()
const {protect} = require('../middleware/authMiddleware')

const {createVendor, getVendors, updateVendor, deleteVendor} = require('../controllers/vendorController')

router.post('/create',protect, createVendor)
router.get('/get', protect, getVendors)
router.put('/update', protect, updateVendor)
router.delete('/delete', protect, deleteVendor)



module.exports = router