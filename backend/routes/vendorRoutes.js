const express = require('express')
const router = express.Router()
const {protect} = require('../middleware/authMiddleware')

const {createVendor, getVendors, updateVendor, deleteVendor} = require('../controllers/vendorController')

router.post('/create',protect, createVendor)
router.get('/get', getVendors)
router.post('/update/:id', updateVendor)
router.delete('/delete/:id', deleteVendor)


module.exports = router