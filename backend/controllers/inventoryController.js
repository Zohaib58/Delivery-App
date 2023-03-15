const jwt = require('jsonwebtoken')
const ObjectId = require('mongodb').ObjectId;
const Inventory = require('../models/inventoryModel')
const Product = require('../models/productModel')
const Admin = require('../models/adminModel')

//vendor views their product stock
const viewInventory = async(req, res) => {
    try{
        /*const userID = req.user.userID

        const admin = await Admin.findById(userID)
        const vendor = admin.vendorId*/

        const vendor = new ObjectId('6410a78a09a73ac03605b9e6')

        const inventoryView = await Inventory.find({ vendorId: vendor }).populate('productId', 'name');

        const inventoryData = inventoryView.map(inventoryItem => {
        const { productId, discount, quantity, price } = inventoryItem;
        const productName = productId.name;
        const pid = productId._id;
        return { pid, productName, discount, quantity, price };
        });

        res.status(200).json({
            success: true,
            data: inventoryData,
        })
    } catch(err) {
        res.json({
            success: false,
            error: err.message
        })
    }
}

//vendor adds new product
const addProduct = async(req, res) => {
    try{
        /*const userID = req.user.userID

        const admin = await Admin.findById(userID)
        const vendor = admin.vendorId*/

        const vendor = new ObjectId('6410a78a09a73ac03605b9e6')

        const newProduct = new Product({
            vendorID : vendor,
            name : req.body.name,
            description : req.body.description,
            image : req.body.image,
        })

        try{
            const svProduct = await newProduct.save();
            svProduct.productID = svProduct._id;
            const savedProduct = await svProduct.save();
            const stock = new Inventory({
                productId : savedProduct.productID,
                vendorId : vendor,
                discount : req.body.discount,
                quantity : req.body.quantity,
                price : req.body.price,
            })
            try{
                const savedStock = await stock.save();
                res.json("Product added successfully");
            } catch(err) {
                res.json({
                    success: false,
                    error: err.message
                })
            }
        } catch(err) {
            res.json({
                success: false,
                error: err.message
            })
        }
    } catch(err) {
        res.json({
            success: false,
            error: err.message
        })
    }
}

//vendor deletes their product
const deleteProduct = async(req, res) => {
    try{
        /*const userID = req.user.userID

        const admin = await Admin.findById(userID)
        const vendor = admin.vendorId*/

        const vendor = new ObjectId('6410a78a09a73ac03605b9e6')

        const Stock = await Inventory.findById({prdocutId: req.body.productId})
        if(Stock.vendorId == vendor){
            const removeStock = await Inventory.findByIdAndDelete({prdocutId: req.body.productId})
            const removeProduct = await Product.findByIdAndDelete(removeStock.productId)
            res.json("Product Deleted!");
        } else {
            res.json("Unauthorized to perform this action.")
        }
        
    } catch(err) {
        res.json({
            success: false,
            error: err.message
        })
    }
}

//vendor views a specific product
const viewProduct = async(req, res) => {
    try {
        /*const userID = req.user.userID

        const admin = await Admin.findById(userID)
        const vendor = admin.vendorId*/

        const vendor = new ObjectId('6410a78a09a73ac03605b9e6')

        const product = await Product.find({_id : req.body.productId} && {vendorID : vendor});

        res.status(200).json({
            succuss: true,
            data: product,
        })
    } catch (err) {
        res.json({
            success: false,
            error: err.message
        })
    }
}

//vendor updates product and its stock
const updateProduct = async(req, res) => {
    try{
        /*const userID = req.user.userID

        const admin = await Admin.findById(userID)
        const vendor = admin.vendorId*/
        const vendor = new ObjectId('6410a78a09a73ac03605b9e6')

        const product = await Product.findById(req.body.productId)

        product.name = req.body.name;
        product.description = req.body.description;
        product.image = req.body.image;
        const savedProduct = await product.save();

        const productStock = await Inventory.find({productId: product.productID})
        if(productStock.length>0){
            const stock = productStock[0];
            stock.discount = req.body.discount;
            stock.price = req.body.price;
            stock.quantity = req.body.quantity;

            const savedStock = await stock.save();
        }
        res.json("Product updated Successfully!");
    } catch(err) {
        res.json({
            success: false,
            error: err.message
        })
    }
}

module.exports = {
    viewInventory,
    addProduct,
    deleteProduct,
    viewProduct,
    updateProduct,
}