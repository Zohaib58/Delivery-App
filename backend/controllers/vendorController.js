const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const Vendor = require('../models/vendorModel')

const createVendor = asyncHandler(async(req, res) => {
    const {companyName, website, status} = req.body

    if (!companyName || !website) {
        res.status(400)
        throw new Error('Please add all fields')
    } 

    const vendorExists = await Vendor.findOne({companyName:companyName})

    if(vendorExists) {
        res.status(400)
        throw new Error('Vendor already exists')
    }

    const vendor = await Vendor.create ({
       _id: req.user.id, companyName:companyName, website: website, status: status
    })

    if (vendor) {
        res.status(201).json({
            _id: req.user.id,
            companyName: vendor.companyName,
            website: vendor.website,
            status: vendor.status,
        })
    }
    else {
        res.status(400)
        throw new Error('Invalid user data')
    }
})



const getVendors = asyncHandler (async(req, res) => {
    const vendors = await Vendor.find({ userId: req.user.id })

    res.status(200).json(vendors)
})

const updateVendor = asyncHandler (async(req, res) => {
    const vendor = await Vendor.findById(req.params.id)

    if(!vendor) {
        res.status(400)
        throw new Error('Vendor not found')
    } 

    const user = await User.findById(req.user.id)

    //check for user
    if(!user) {
        res.status(401)
        throw new Error('User not found')
    }

    //Make sure the logged in user matches the goal user
    if(vendor.userId.toString() != req.user.id) {
        res.status(401)
        throw new Error('User not authorized')
    }

    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    })
    res.status(200).json(updatedGoal)
})


const deleteVendor = asyncHandler (async(req, res) => {
    const vendor = await Vendor.findById(req.params.id)

    if(!vendor) {
        res.status(400)
        throw new Error('Vendor not found')
    } 


    //check for user
    if(!req.user) {
        res.status(401)
        throw new Error('User not found')
    }

    //Make sure the logged in user matches the vendor user
    if(vendor.user.toString() != user.id) {
        res.status(401)
        throw new Error('User not authorized')
    }

    await vendor.remove()
    res.status(200).json({ id: req.params.id })
})



module.exports = {
    createVendor,
    updateVendor,
    getVendors,
    deleteVendor
}