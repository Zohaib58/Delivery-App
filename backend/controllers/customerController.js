const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const Customer = require('../models/customerModel')


const createCustomer = asyncHandler(async (req, res) => {
    const {name, phoneNo, orders,  status, address, favourites} = req.body

    if (!name || !phoneNo || !orders || !status || !address || !favourites) {
        res.status(400)
        throw new Error('Please add all fields')
    }
    console.log(name)
    console.log(phoneNo)
    console.log(orders)
    console.log(status)
    console.log(address)
    console.log(favourites)

    //const customerExists = await Customer.findOne({ userId })
/*
    if (customerExists) {
        res.status(400)
        throw new Error('Customer already exists')
    }
*/
    console.log('helloUpper')
    console.log(req.user.id)
    console.log('hello')
    // Create Customer
    const customer = await Customer.create({
        _id: req.user.id,
        name, 
        phoneNo, 
        orders,  
        status, 
        address, 
        favourites,
    })

    console.log('hello')
    console.log(req.user.id)
    
    if (customer) {
        res.status(201).json({
            //_id: req.user.id,
            name: customer.name,
            phoneNo: customer.phoneNo,
            orders: customer.orders,
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
    const customers = await Customer.find({ _id: req.user.id })
    res.status(200).json(customers)
})

const updateCustomer = asyncHandler(async (req, res) => {
    const customer = await Customer.findById(req.params.id)

    if (!customer) {
        res.status(404)
        throw new Error('Customer not found')
    }

    const user = await User.findById(req.user.id)

    if (!user) {
        res.status(404)
        throw new Error('User not found')
    }

    if (customer.userId.toString() !== req.user.id) {
        res.status(401)
        throw new Error('User not authorized')
    }

    const updatedCustomer = await Customer.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    )
    res.status(200).json(updatedCustomer)
})

const deleteCustomer = asyncHandler(async (req, res) => {
    const customer = await Customer.findById(req.params.id)

    if (!customer) {
        res.status(404)
        throw new Error('Customer not found')
    }

    if (customer.userId.toString() !== req.user.id) {
        res.status(401)
        throw new Error('User not authorized')
    }

    await customer.remove()
    res.status(200).json({ id: req.params.id })
})

module.exports = {
    createCustomer,
    updateCustomer,
    getCustomers,
    deleteCustomer,
}
