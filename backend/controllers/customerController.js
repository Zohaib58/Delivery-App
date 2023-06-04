const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const Customer = require('../models/customerModel')
const Status = require('../enum/statusEnum')


const createCustomer = asyncHandler(async (req, res) => {
    const { name ,phoneNo,  status, address, favourites} = req.body
    
    if (!name || !phoneNo || !address || !favourites) {
        res.status(400)
        throw new Error('Please add all fields')
    }

    const customer = await Customer.create({
        _id: req.user.id,
        name, 
        phoneNo,   
        status, 
        address, 
        favourites,
    })
    if (customer) {
        res.status(201).json({
            name: customer.name,
            phoneNo: customer.phoneNo,
            status: customer.status,
            address: customer.address,
            favourites: customer.favourites,
        })
    } else {
        res.status(400)
        throw new Error('Invalid user data')
    }
})

const getCustomers = asyncHandler(async (req, res) => {
    const customers = await Customer.findOne({ _id: req.user.id })
    res.status(200).json(customers)
})

const updateCustomer = asyncHandler(async (req, res) => {
    const customer = await Customer.findById(req.user._id);
  
    if (!customer) {
      res.status(404);
      throw new Error('Customer not found');
    }
  
    // Check if the logged-in user is authorized to update the customer
    if (customer._id !== req.user._id) {
      res.status(401);
      throw new Error('User not authorized');
    }
  
    // Update the customer with the provided data
    customer.name = req.body.name || customer.name;
    customer.phoneNo = req.body.phoneNo || customer.phoneNo;
    customer.address = req.body.address || customer.address;
  
    const updatedCustomer = await customer.save();
    res.status(200).json(updatedCustomer);
  });

const deleteCustomer = asyncHandler(async (req, res) => {
    const customer = await Customer.findById(req.user.id)

    if (!customer) {
        res.status(404)
        throw new Error('Customer not found')
    }
    const activeStatus = await Status.findOne({statusDescription: "Inactive"})
    customer.status= activeStatus.statusNum;
    await customer.save()
    res.status(200).json({ id: req.user.id })
})

module.exports = {
    createCustomer,
    updateCustomer,
    getCustomers,
    deleteCustomer,
}
