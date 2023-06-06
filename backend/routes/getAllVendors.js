const express = require('express')
const router = express.Router()
const {protect} = require('../middleware/authMiddleware')

const { getAllVendors} = require('../controllers/getAllVendors')

router.get('/all', getAllVendors)


module.exports = router