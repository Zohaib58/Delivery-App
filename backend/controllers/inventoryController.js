const jwt = require('jsonwebtoken')
const Inventory = require('../models/inventoryModel')
const Product = require('../models/productModel')
const Category = require('../models/categoryModel')
const Vendor = require('../models/vendorModel')
const ID = require('../id/id')
const Size = require('../enum/sizeEnum')

//vendor views their product stock
const getVendorProducts = async(req, res) => {
    try{
        const vendorId = req.user._id
        const products = await Product.find({vendor: vendorId})
        
        if (products.length > 0)
        {
            res.status(200).json(products)
        }
        else{
            res.status(404).json("No products found")
        }


    }
    catch(err)
    {
        res.json(err.message)
    }
}

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
        const size = await Size.findOne({sizeDescription: req.body.size})

        if(categoryCheck){
            
            const newProduct = new Product({
                _id: await ID.id(Product),
                name : req.body.name,
                vendor: vendor,
                description : req.body.description,
                image : req.body.image,
                category: categoryCheck.catNum,
                status: req.body.status,
                size: size.sizeNum,
            })
            try{
                const svProduct = await newProduct.save();
                
                const stock = new Inventory({
                    productId : newProduct._id,
                    vendorId : vendor,
                    discount : req.body.discount,
                    quantity : req.body.quantity,
                    price : req.body.price,
                })
                const savedStock = await stock.save();
                res.json("Product added successfully");
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


        const Stock = await Inventory.findOne({productId: req.params.productId})

        if(Stock.vendorId === vendor) {
            try{
                const removeProduct = await Product.findOne({_id: Stock.productId})
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
        const category = await Category.findOne({catNum: product[0].category})
        const size = await Size.findOne({sizenum: product[0].size})

        const returnProduct = [{
            _id: product[0]._id,
            name: product[0].name,
            vendor: product[0].vendor,
            description: product[0].description,
            image: product[0].image,
            status: product[0].status,
            category: category.name,
            size: size.sizeDescription,
        }]

        res.status(200).json(returnProduct)
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

        const category = await Category.findOne({name: req.body.category})

        if(vendor === productStock.vendorId){
            product.name = req.body.name;
            product.description = req.body.description;
            product.image = req.body.image;
            product.category = category.catNum

            
            const savedProduct = await product.save();

            productStock.discount = req.body.discount;
            productStock.price = req.body.price;
            productStock.quantity = req.body.quantity;

            const savedStock = await productStock.save();
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
    getVendorProducts,
}