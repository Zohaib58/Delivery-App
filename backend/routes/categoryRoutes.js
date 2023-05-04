const express = require('express')
const router = express.Router()
const { 
    addCategory,
    deleteCategory,
    getAllCategory,
 } = require('../controllers/categoryController')

const {protect} =  require('../middleware/authMiddleware')

router.post('/addCategory', protect, addCategory)
router.delete('/deleteCategory', protect, deleteCategory)
router.get('/', getAllCategory)

module.exports = router