const jwt = require('jsonwebtoken')
const Inventory = require('../models/inventoryModel')
const Product = require('../models/productModel')
const Category = require('../models/categoryModel')
const Vendor = require('../models/vendorModel')
const ID = require('../id/id')

//vendor views their product stock
const viewInventory = async(req, res) => {
    try{
        const userID = req.user.userID

        const vendorRec = await Vendor.findById(userID)
        const vendor = vendorRec.vendorId

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
        const vendor = req.user.id
 
        const categoryCheck = await Category.find({name: req.body.category})
        //console.log(categoryCheck)
        if(categoryCheck.length==1){
            const newProduct = new Product({
                _id: await ID.id(Product),
                name : req.body.name,
                vendor: vendor,
                description : req.body.description,
                image : req.body.image,
                category: categoryCheck[0].catNum
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
        else{
            res.json({
                success: false,
                data: "The category does not exist yet. Kindly put in a request to admin if its need to be added"
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
        const userID = req.user.userID

        const vendorRec = await Vendor.findById(userID)
        const vendor = vendorRec.vendorId


        const Stock = await Inventory.findOne({productId: req.body.productId})

        if(Stock.vendorId === vendor) {
            try{
                const removeStock = await Inventory.findOne({productId: req.body.productId})
                const removeProduct = await Product.findOne({productId: removeStock.productId})
                removeProduct.status = 1;
                const saveChanges = await removeProduct.save();
                res.json({
                    success: true,
                    error: "Product Deleted!"
                })
            } catch(err) {
                res.json({
                    success: false,
                    error: err.message
                })
            }
        }
        else{
            res.json({
                success: false,
                data: "Unauthorized to perform this action"
            })
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
        const product = await Product.find({_id : req.body.productId});

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
        const userID = req.user.userID

        const vendorRec = await Vendor.findById(userID)
        const vendor = vendorRec.vendorId

        const product = await Product.findById(req.body.productId)
        const productStock = await Inventory.find({productId: product._id})

        if(vendor === productStock.vendorId){
            product.name = req.body.name;
            product.description = req.body.description;
            product.image = req.body.image;
            product.category = req.body.category
            const savedProduct = await product.save();

            
            if(productStock.length>0){
                const stock = productStock[0];
                stock.discount = req.body.discount;
                stock.price = req.body.price;
                stock.quantity = req.body.quantity;

                const savedStock = await stock.save();
            }
            res.json({
                success: true,
                data: "Product updated Successfully!"
            });
        }
        else {
            res.json({
                success: false,
                data: "Unauthorized to perform this action"
            })
        }
        
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