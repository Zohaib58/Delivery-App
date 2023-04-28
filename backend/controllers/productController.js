const jwt = require('jsonwebtoken')
const Product = require('../models/productModel')
const Inventory = require('../models/inventoryModel')
const Category = require('../models/categoryModel')
const Customer = require('../models/customerModel')
//const ObjectId = require('mongodb').ObjectId;
const ID = require('../id/id')

//customer is displayed all the products
const browseProducts = async(req, res) => {
    const cat = req.params.category
    try{
        if(cat !== "All"){
            const category = await Category.findOne({name: cat})
            const catNum = category.catNum
            try{
                const products = await Product.find({category: catNum})
                const inventoryItems = await Inventory.find();

                const productsWithPrice = products.map(product => {
                    const productId = product._id;
                    const inventoryItem = inventoryItems.find(item => item.productId.toString() === productId.toString());

                    if (inventoryItem) {
                        return {
                        ...product._doc,
                        price: inventoryItem.price,
                        category: category.name,
                        };
                    } else {
                        return {
                        ...product._doc,
                        price: 0,
                        category: category.name,
                        };
                    }
                });
                res.json(productsWithPrice);
            }catch(err){
                res.json({
                    success: false,
                    error: err.message
                })
            }
        }
        else{
            const Products = await Product.find();
            const inventoryItems = await Inventory.find();

            const productsWithPrice = Products.map(product => {
                const productId = product._id;
                const inventoryItem = inventoryItems.find(item => item.productId.toString() === productId.toString());

                if (inventoryItem) {
                    return {
                    ...product._doc,
                    price: inventoryItem.price,
                    category: '-',
                    };
                } else {
                    return {
                    ...product._doc,
                    price: 0,
                    category: '-',
                    };
                }
            });
            res.json(productsWithPrice);
        }
    } catch(err) {
        res.json({
            success:false,
            error: err.message
        })
    }
        
    
}

//customer views a specific product by clicking on it
const getProduct = async(req, res) => {
    try{
        const product = await Product.findById(req.params.id)
        res.status(200).json(product)
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
        const user = req.user
        const customer = await Customer.findOne({customerId: user._id});
        const favprod = new ObjectId(req.body.productId)

        if(customer.favourites){
            const productExists = await customer.favourites.some(
                (fav) => fav.productId.toString() === req.body.productId
            );
            
            if (productExists) 
            {
                const a1 = await Customer.updateOne(
                    { customerId: user._id },
                    { $pull: { favourites: { productId: favprod } } }
                );
                res.json("Product removed from your favorites.");
            } 
            else 
            {
                const a2 = await Customer.updateOne(
                    { customerId: user._id },
                    { $push: { favourites: { productId: favprod } } }
                );
                res.json("Product added to your favorites.");
            }
        }
        else{
            const a2 = await Customer.updateOne(
                { customerId: user._id },
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
        const user = req.user

        const customer = await Customer.findOne({customerId: user._id});

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