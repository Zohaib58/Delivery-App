const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const ID = require('../id/id')
const tokenBlacklist = require('../models/tokenBlacklist')

const registerUser = asyncHandler(async(req, res) => {
    const {email,  password, role} = req.body

    if (!email || !password) {
        res.status(400)
        throw new Error('Please add all fields')
    }
    else{
        const userExists = await User.findOne({email})

        if(userExists) {
            res.status(400)
            throw new Error('User already exists')
        }

        // Hash password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        //Create User
        const user = await User.create ({
            _id: await ID.id(User),
            email,
            role,
            password: hashedPassword,
        })
        
        if (user) {
            res.status(201).json({
                _id: user._id,
                email: user.email,
                role: user.role,
                //token: generateToken(user.id),
            })
        }
        else {
            res.status(400)
            throw new Error('Invalid user data')
        }
    }
})

const loginUser = asyncHandler(async(req, res) => {
    const {email, password} =  req.body

    //Check for user email
    const user = await User.findOne({email})
    
    if(user && (await bcrypt.compare(password, user.password))){
        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            token: generateToken(user._id),
        })
    }
    else {
        res.status(400)
        throw new Error('Invalid credentials')
    }


})

const logoutUser = asyncHandler(async(req, res) => {
    const token = req.headers.authorization.split(' ')[1] // bearer token

    //Create User
    
    const tokenRevoked = await tokenBlacklist.create ({
        token
    })
    
    if (tokenRevoked) {
        res.status(200).json({
            message: "Logged out successfully"
        })
    }
    else {
        res.status(400)
        throw new Error('Invalid user data')
    }

})

const getMe = asyncHandler(async(req, res) => {
    const { _id, name, role, email } = await User.findById(req.user.id)

    res.status(200).json({
        id: _id,
        name,
        email,
        role,
    })
})

//Generate JWT
const generateToken = (id, role) => {
    return jwt.sign({ id, role }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    })
}



module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    getMe,
}