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

    //console.log("reached")
    //Create Vendor
    const vendor = await Vendor.create ({
       _id: req.user.id, companyName:companyName, website: website, status: status
    })

    if (vendor) {
        res.status(201).json(
            req.user.id,
            vendor.companyName,
            vendor.website,
            vendor.status,
        )
    }
    else {
        res.status(400)
        throw new Error('Invalid user data')
    }
})



const getVendors = asyncHandler (async(req, res) => {
    const vendors = await Vendor.find( _id = req.user._id )

    res.status(200).json(vendors)
})

const updateVendor = asyncHandler (async(req, res) => {
    const vendor = await Vendor.findById(req.user._id );

  //console.log('hello')
  //console.log(customer)

  if (!vendor) {
    res.status(404);
    throw new Error('vendor not found');
  }
  console.log(vendor._id)
  console.log(req.user._id)

  // Check if the logged-in user is authorized to update the customer
  if (vendor._id !== req.user._id) {
    res.status(401);
    throw new Error('User not authorized');
  }
  
  // Create an object with the updated fields
  const updatedFields = {
    companyName: req.body.companyName || vendor.companyName,
    website: req.body.website || vendor.website,
  };

  //console.log(updatedFields);
  // Update the customer using the create command
  
  let updatedCustomer;
    // Update the customer using the create command
    updatedCustomer = await Vendor.findByIdAndUpdate(
        req.user._id ,
      updatedFields,
      { new: true }
    );

  res.status(200).json(updatedCustomer);
});


const deleteVendor = asyncHandler (async(req, res) => {
    const vendor = await Vendor.findById(req.body.id)

    if(!vendor) {
        res.status(400)
        throw new Error('Vendor not found')
    } 

    //Make sure the logged in user matches the vendor user
    if(vendor._id != user._id) {
        res.status(401)
        throw new Error('User not authorized')
    }

    await vendor.remove()
    res.status(200).json({ id: req.body.id })
})



module.exports = {
    createVendor,
    updateVendor,
    getVendors,
    deleteVendor
}