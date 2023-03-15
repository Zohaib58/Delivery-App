const express = require('express')
const router = express.Router()
/*
Importing controller/API methods
 const {registerUser, loginUser, getMe} = require('../controllers/userController')
*/
const {protect} = require('../middleware/authMiddleware')

/*
Defining routes

router.post('/', registerUser)
router.post('/login', loginUser)
*/
router.get('/me', protect, getMe)
module.exports = router