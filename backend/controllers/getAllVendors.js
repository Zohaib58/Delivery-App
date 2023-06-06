const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const deal = require('../models/dealModel')
const Vendor = require('../models/vendorModel')

const getAllVendors = asyncHandler(async (req, res) => {
  
    //console.log("helloFromTheOTherSide");
    const customers = await Vendor.find();
    res.status(200).json(customers);

});


module.exports = {
    getAllVendors,
}