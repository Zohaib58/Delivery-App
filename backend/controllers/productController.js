const jwt = require('jsonwebtoken')
const Product = require('../models/productModel')
const Customer = require('../models/customerModel')

//customer is displayed all the products
const browseProducts = async(req, res) => {
    try{
        const products = await Product.find()

        const returnProducts = products.map(product => {
            const {description, ...rest} = product;
            return rest;
        })
        res.status({
            success: true,
            data: returnProducts
        })
    }catch(err){
        res.json({
            success: false,
            error: err.message
        })
    }
}

//customer views a specific product by clicking on it
const getProduct = async(req, res) => {
    try{
        const product = await Product.findById(req.body.ProductId)
        res.status(200).json({
            success: true,
            data: product
        })
    }catch(err){
        res.json({
            success: false,
            error: err.message
        })
    }
}

//customer searches product by keyword
const searchProduct = async(req, res) => {
    try{
        const products = await Product.find({
            $or: [
            {name : {$regex : req.body.keyword, $options: "i"}},
            {discription: {$regex : req.body.keyword, $options: "i"}},
        ]});

        res.status(200).json({
            success: true,
            data: products
        })
    }catch(err){
        res.json({
            success: false,
            error: err.message
        })}
}

const toggleFav = async(req, res)=>{
    try{

        const userID = req.user.userID

        const checkIfExist = await Customer.find({
            $and:[
                {customerId: userID},
                { favourites: { $elemMatch: { $eq: req.body.productId } } }
            ]
        })

        if (checkIfExist.length != 0){
            Customer.updateOne(
                { customerId: userID },
                { $pull: { favourites: req.body.productId} }
              );
              res.json("Product removed from your favorites.");
        } else {
            const updatedFavList = await Customer.findByIdAndUpdate(userID, {
                $push: { favourites: req.body.productId }
              });
            res.json("Product added to your favorites.");
        }
    } catch(err) {
        res.json({
            success: false,
            error: err.message
        })
    }
}

const viewFav = async(req, res)=>{
    try{
        const user = req.user
        
        const favProducts = await Product.find({
            productID: {$in: user.favourites}
        })

        if(favProducts.length>0){
            res.status(200).json({
                success: true,
                data: favProducts
            })
        }
        else {
            res.status(404).json("No favorite products");
        }
    } catch(err) {
        res.json({
            success: false,
            error: err.message
        })
    }
}

module.exports = {
    browseProducts,
    getProduct,
    searchProduct,
    toggleFav,
    viewFav
}