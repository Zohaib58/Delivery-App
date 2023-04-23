const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

// @desc Register New User
// @ROUTE get/api/users
// @ACCESS Public
const registerUser = asyncHandler(async(req, res) => {    
    const { name, email, password} = req.body

    if (!name ||!email ||!password) {
        res.status(400)
        throw new Error('Please enter all the fields')
    }

    // check if user exists
    const userExists = await User.findOne({ email })

    if (userExists){
        res.status(400)
        res.json({message: 'User already exists'})    
    }

    // Hash Password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
    
    // Create User
    const user = await User.create({
        name, email, password: hashedPassword
        
    })

    if (user) {
        res.status(201).json({
        _id: user.id,
        name: user.name,
        email: user.email, 
        token: generateToken(user._id)

        })
    }
    else {
        res.status(400)
        throw new Error('Failed to create user')
    }


    //res.json({ message: 'Register User' });
})

// @desc Login User
// @ROUTE get/api/users/login
// @ACCESS Public
const loginUser = asyncHandler(async(req, res) => {  
    const {email, password} = req.body

    // check for user email
    const user = await User.findOne({ email })
    
    if (user && (await bcrypt.compare(password, user.password))) {
        res.json({
        _id: user.id,
        name: user.name,
        email: user.email, 
        token: generateToken(user._id)
        })
    }
    else{
        res.status(400)
        throw new Error('Invalid email or password')
    }

    //res.json({ message: 'Login User' });
})

// @desc Get user data
// @ROUTE get/api/users/me
// @ACCESS Private
const getMe = asyncHandler(async(req, res) => {   
    const {_id, name, email} = await User.findById(req.user.id)
    res.status(200).json({
        id: _id,
        name: name,
        email: email
        
    })
    


    res.json({ message: 'User data display' });
})

// Generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    })
}

module.exports = {registerUser, loginUser, getMe}