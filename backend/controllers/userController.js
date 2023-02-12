const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

// @desc Register New User
// @ROUTE get/api/users
// @ACCESS Public
const registerUser = asyncHandler(async(req, res) => {    
    res.json({ message: 'Register User' });
})

// @desc Login User
// @ROUTE get/api/users/login
// @ACCESS Public
const loginUser = asyncHandler(async(req, res) => {    
    res.json({ message: 'Login User' });
})

// @desc Get user data
// @ROUTE get/api/users/me
// @ACCESS Public
const getMe = asyncHandler(async(req, res) => {    
    res.json({ message: 'User data display' });
})

module.exports = {registerUser, loginUser, getMe}