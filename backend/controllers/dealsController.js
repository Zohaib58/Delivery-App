const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const deal = require('../models/dealModel')

const createDeal = asyncHandler(async(req, res) => {
    const {vendorId, name, description, image, endDate,  startDate, price, productId} = req.body

    console.log(vendorId)
    console.log(name)
    console.log(description)
    console.log(image)
    console.log(endDate)
    console.log(startDate)
    console.log(price)
    console.log(productId)

    if (!vendorId || !name || !description || !image || !endDate || !startDate || !price || !productId) {
        res.status(400)
        throw new Error('Please add all fields')
    }

    const userExists = await deal.findOne({name})

    if(userExists) {
        res.status(400)
        throw new Error('Deal already exists')
    }

    // Hash password
    //const salt = await bcrypt.genSalt(10)
    //const hashedPassword = await bcrypt.hash(password, salt)

    //Create User
    const user = await deal.create ({
        vendorId,
        name, 
        description, 
        image, 
        endDate,  
        startDate, 
        price, 
        productId,
    })

    if (user) {
        res.status(201).json({
            _id: user.id,
            vendorId: user.vendorId,
            name: user.name,
            description: user.description,
            image: user.image,
            endDate: user.endDate,
            startDate: user.startDate,
            price: user.price,
            productId: user.productId,
            token: generateToken(user._id),
        })
    }
    else {
        res.status(400)
        throw new Error('Invalid Deal')
    }
})


const editDeal = asyncHandler(async(req, res) => {
    const dealId = req.params.id;
    const {vendorId, name, description, image, endDate, startDate, price, productId} = req.body

    // Find the deal to edit
    const dealToEdit = await deal.findById(dealId)

    if (!dealToEdit) {
        res.status(404)
        throw new Error('Deal not found')
    }

    // Update the deal
    dealToEdit.vendorId = vendorId || dealToEdit.vendorId;
    dealToEdit.name = name || dealToEdit.name;
    dealToEdit.description = description || dealToEdit.description;
    dealToEdit.image = image || dealToEdit.image;
    dealToEdit.endDate = endDate || dealToEdit.endDate;
    dealToEdit.startDate = startDate || dealToEdit.startDate;
    dealToEdit.price = price || dealToEdit.price;
    dealToEdit.productId = productId || dealToEdit.productId;

    const updatedDeal = await dealToEdit.save();

    res.json({
        _id: updatedDeal.id,
        vendorId: updatedDeal.vendorId,
        name: updatedDeal.name,
        description: updatedDeal.description,
        image: updatedDeal.image,
        endDate: updatedDeal.endDate,
        startDate: updatedDeal.startDate,
        price: updatedDeal.price,
        productId: updatedDeal.productId,
    });
})


const deleteDeal = asyncHandler(async(req, res) => {
    const dealId = req.params.id;

    // Find the deal to delete
    const dealToDelete = await deal.findById(dealId)

    if (!dealToDelete) {
        res.status(404)
        throw new Error('Deal not found')
    }

    // Delete the deal
    await dealToDelete.delete();

    res.json({
        _id: dealToDelete.id,
        vendorId: dealToDelete.vendorId,
        name: dealToDelete.name,
        description: dealToDelete.description,
        image: dealToDelete.image,
        endDate: dealToDelete.endDate,
        startDate: dealToDelete.startDate,
        price: dealToDelete.price,
        productId: dealToDelete.productId,
    });
})

const getMe = asyncHandler(async(req, res) => {
    const { _id, vendorId, name, description, image, endDate,  startDate, price, productId} = await deal.findById(req.user.id)

    res.status(200).json({
        id: _id,
        vendorId: vendorId,
        name: name,
        description: description,
        image: image,
        endDate: endDate,
        startDate: startDate,
        price: price,
        productId: productId,
    })
})

//Generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    })
}

module.exports = {
    createDeal,
    editDeal,
    deleteDeal,
    getMe,
}