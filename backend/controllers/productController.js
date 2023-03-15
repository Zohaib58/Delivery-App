const jwt = require('jsonwebtoken')
const Product = require('../models/productModel')
const Customer = require('../models/customerModel')
const ObjectId = require('mongodb').ObjectId;

//customer is displayed all the products
const browseProducts = async(req, res) => {
    try{
        const products = await Product.find()

        res.json(products)
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
        const product = await Product.findById(req.body.productId)
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

        //const userID = req.user.userID

        const customerId = "6412055e8bd6f6c6a679bebe"
        const customer = await Customer.findById(customerId);

        const productExists = await customer.favourites.some(
            (fav) => fav.productId.toString() === req.body.productId
        );
        
        const favprod = new ObjectId(req.body.productId)
        if (productExists) {
            const a1 = await Customer.updateOne(
                { _id: customerId },
                { $pull: { favourites: { productId: favprod } } }
            );
            res.json("Product removed from your favorites.");
        } else {
            const a2 = await Customer.updateOne(
                { _id: customerId },
                { $push: { favourites: { productId: favprod } } }
            );
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
        //const user = req.user
        
        const customerId = "6412055e8bd6f6c6a679bebe"
        const customer = await Customer.findById(customerId);

        const productIds = customer.favourites.map(favourite => favourite.productId);

        const favProducts = await Product.find({
            _id: { $in: productIds }
        });

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