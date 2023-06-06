const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const ID = require('../id/id')
const tokenBlacklist = require('../models/tokenBlacklist')
const RoleEnum = require('../enum/roleEnum')
const Customer = require('../models/customerModel')
const Vendor = require('../models/vendorModel')
const Status = require('../enum/statusEnum')

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
                token: generateToken(user.id),
            })
        }
        else {
            res.status(400)
            throw new Error('Invalid user data')
        }
    }
})

const loginUser = async(req, res) => {
    const {email, password} =  req.body

    const activeStatus = await Status.findOne({statusDescription: "Active"})

    //Check for user email
    const user = await User.findOne({email})

    if(user && (await bcrypt.compare(password, user.password))) {
        const role = await RoleEnum.findOne({roleNum: user.role});
        if(role.roleDescription === "Customer"){
            const response = await Customer.findById(user._id)
            if(response.status === activeStatus.statusNum){  
                res.json({
                    _id: user.id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                    token: generateToken(user._id),
                })
                return
            }
            else{
                res.status(400)
                throw new Error('Invalid account')
            }
        }
        else if(role.roleDescription === "Vendor") {
            const response = await Vendor.findById(user._id)
            if(response.status === activeStatus.statusNum){  
                res.json({
                    _id: user.id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                    token: generateToken(user._id),
                })
                return
            }
            else{
                res.status(400)
                throw new Error('Invalid account')
            }
        }
        else if(role.roleDescription === "Super Admin"){
            res.json({
                _id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                token: generateToken(user._id),
            })
        }
        else{
            res.status(400)
            throw new Error('Invalid account')
        }
    }
    else {
        res.status(400)
        throw new Error('Invalid credentials')
    }

}

const logoutUser = asyncHandler(async(req, res) => {
    const token = req.headers.authorization.split(' ')[1] // bearer token
    
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