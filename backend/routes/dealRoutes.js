const express = require('express')
const router = express.Router()
const { 
    createDeal,
    editDeal,
    deleteDeal,
    getMe,
 } = require('../controllers/dealsController')

 const {protect} =  require('../middleware/authMiddleware')

router.post('/', createDeal)
router.put('/edit/:id', editDeal)
router.delete('/delete/:id', deleteDeal)
router.get('/me', protect, getMe)


module.exports = router