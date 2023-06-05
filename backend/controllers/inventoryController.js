const jwt = require('jsonwebtoken')
const Inventory = require('../models/inventoryModel')
const Product = require('../models/productModel')
const Category = require('../models/categoryModel')
const Vendor = require('../models/vendorModel')
const ID = require('../id/id')

//vendor views their product stock
const viewInventory = async(req, res) => {
    try{
        const vendor = req.user._id

        const inventoryView = await Inventory.find({
            $and: [
                { vendorId: vendor },
            ]
        })
        .populate('productId', 'name')
        .populate({
            path: 'productId',
            match: { status: 0 }
        });

        const inventoryData = inventoryView.map(inventoryItem => {
        const { productId, discount, quantity, price } = inventoryItem;
        const productName = productId.name;
        const pid = productId._id;
        return { pid, productName, discount, quantity, price };
        });

        res.status(200).json(inventoryData)
    } catch(err) {
        res.json(err.message)
    }
}

//vendor adds new product
const addProduct = async(req, res) => {
    try{
        const vendor = req.user.id

        const categoryCheck = await Category.findOne({name: req.body.category})
        
        const id = async(collection) => {
            try {
              const doc = await collection.findOne({vendor}).sort({ createdAt: -1 })
              
              if (doc === null){
                return collection.modelName[0].toUpperCase() + '1';
              }
              else{
                const oldId = doc._id;
                const num = parseInt(oldId.slice(1)) + 1;
                return oldId[0] + num;
              }  
            } catch (err) {
              console.log(err)
              throw new Error('Unable to generate ID')
            }
          }

        if(categoryCheck){
            
            const newProduct = new Product({
                _id: vendor + await id(Product),
                name : req.body.name,
                vendor: vendor,
                description : req.body.description,
                image : req.body.image,
                category: categoryCheck.catNum
            })
    
            try{
                const svProduct = await newProduct.save();
                const stock = new Inventory({
                    productId : svProduct._id,
                    vendorId : vendor,
                    discount : req.body.discount,
                    quantity : req.body.quantity,
                    price : req.body.price,
                })
                try{
                    const savedStock = await stock.save();
                    res.json("Product added successfully");
                } catch(err) {
                    res.json(err.message)
                }
            } catch(err) {
                res.json(err.message)
            }
        }
        else{
            res.json("The category does not exist yet. Kindly put in a request to admin if its need to be added")
        }
    } catch(err) {
        res.json(err.message)
    }
}

//vendor deletes their product
const deleteProduct = async(req, res) => {
    try{
        const vendor = req.user._id


        const Stock = await Inventory.findOne({productId: req.body.productId})
        console.log(Stock)

        if(Stock.vendorId === vendor) {
            try{
                const removeProduct = await Product.findOne({_id: removeStock.productId})
                removeProduct.status = 1;
                const saveChanges = await removeProduct.save();
                res.json("Product Deleted!")
            } catch(err) {
                res.json(err.message)
            }
        }
        else{
            res.json("Unauthorized to perform this action")
        }
        
        
    } catch(err) {
        res.json(err.message)
    }
}

//vendor views a specific product
const viewProduct = async(req, res) => {
    try {
        const product = await Product.find({_id : req.params.productId});

        res.status(200).json(product)
    } catch (err) {
        res.json(err.message)
    }
}

//vendor updates product and its stock
const updateProduct = async(req, res) => {
    try{
        const vendor = req.user._id

        const product = await Product.findById(req.body.productId)
        const productStock = await Inventory.findOne({productId: product._id})
        console.log(productStock.vendorId)

        const category = await Category.findOne({name: req.body.category})

        if(vendor === productStock.vendorId){
            product.name = req.body.name;
            product.description = req.body.description;
            product.image = req.body.image;
            product.category = category.catNum
            const savedProduct = await product.save();

            
            if(productStock.length>0){
                const stock = productStock[0];
                stock.discount = req.body.discount;
                stock.price = req.body.price;
                stock.quantity = req.body.quantity;

                const savedStock = await stock.save();
            }
            res.json("Product updated Successfully!");
        }
        else {
            res.json("Unauthorized to perform this action")
        }
        
    } catch(err) {
        res.json(err.message)
    }
}

module.exports = {
    viewInventory,
    addProduct,
    deleteProduct,
    viewProduct,
    updateProduct,
}