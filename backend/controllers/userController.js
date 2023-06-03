const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const ID = require('../id/id')

const registerUser = asyncHandler(async(req, res) => {
    const {email,  password, role} = req.body
   //

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

        //const defaultRole = 1;
        console.log(role);
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
                //role: role,
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
    console.log(email)
    console.log(password)

    //Check for user email
    const user = await User.findOne({email})

    console.log(user);
    
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

const getMe = asyncHandler(async(req, res) => {
    const { _id, role, email } = await User.findById(req.user.id)

    res.status(200).json({
        id: _id,
        email,
        role,
    })
})


//Generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    })
}



module.exports = {
    registerUser,
    loginUser,
    getMe
}