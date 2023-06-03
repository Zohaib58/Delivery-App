const jwt = require('jsonwebtoken')
const Category = require('../models/categoryModel')
const Product = require('../models/productModel')
const Inventory = require('../models/inventoryModel')
const Customer = require('../models/customerModel')
const Vendor = require('../models/vendorModel')
const Status = require('../enum/statusEnum')
const ID = require('../id/id')

const getQFn = async(productID) => {
    const ProductInventoryInfo = await Inventory.findOne({productId: productID})
    return ProductInventoryInfo.quantity
}

const getQuantity = async(req, res) => {
    try{
        const quantity = await getQFn(req.params.productID)
        res.json(quantity);
    } catch (err) {
        res.json({
            success:false,
            error: err.message
        })
    }
}

//customer is displayed all the products
const browseProducts = async(req, res) => {
    const user = await Customer.findById(req.user.id)
    const cat = req.params.category
    const Activestatus = await Status.findOne({statusDescription: "Active"})
    try{
        if(cat !== "All" && req.params.keyword !== 'AllProduct$'){
            const category = await Category.findOne({name: cat})
            const catNum = category.catNum
            try{
                const products = await Product.find({
                    $and: [
                        {category: catNum},
                        {
                            $or: [
                                {name : {$regex : req.params.keyword, $options: "i"}},
                                {discription: {$regex : req.params.keyword, $options: "i"}},
                            ]
                        },
                        {status: Activestatus.statusNum}
                    ]
                })
                const inventoryItems = await Inventory.find();

                const productsWithPrice = []
                for (const product of products) {
                    const productId = product._id;
                    const inventoryItem = inventoryItems.find(item => item.productId.toString() === productId.toString());
                    const vendorName = await Vendor.findOne({_id: product.vendor});

                    const fav = user.favourites.some(favourite => {
                        return favourite.productId && favourite.productId.toString() === productId.toString();
                      });

                    if (inventoryItem) {
                        productsWithPrice.push({
                        ...product._doc,
                        vendor: vendorName.companyName,
                        price: inventoryItem.price,
                        category: category.name,
                        isFav: fav
                        });
                    } 
                }
                res.json(productsWithPrice);
            }catch(err){
                res.json({
                    success: false,
                    error: err.message
                })
            }
        }
        else if(req.params.keyword === 'AllProduct$' && cat === 'All'){
            const Products = await Product.find({status: Activestatus.statusNum});
            const inventoryItems = await Inventory.find();

            const productsWithPrice = [];

            for (const product of Products) {
                const productId = product._id;
                const inventoryItem = inventoryItems.find(item => item.productId.toString() === productId.toString());
                const vendorName = await Vendor.findOne({_id: product.vendor});

                let categoryName = '-';
                if (product.category) {
                    const category = await Category.findOne({catNum: product.category});
                    if (category) {
                    categoryName = category.name;
                    }
                }

                const price = inventoryItem ? inventoryItem.price : 0;
                const fav = user.favourites.some(favourite => {
                    return favourite.productId && favourite.productId.toString() === productId.toString();
                  });

                  
                const productWithPrice = {
                    ...product._doc,
                    vendor: vendorName.companyName,
                    category: categoryName,
                    price: price,
                    isFav: fav
                };
                productsWithPrice.push(productWithPrice);
            }
            res.json(productsWithPrice);

        }
        else if(req.params.keyword === 'AllProduct$'){
            const category = await Category.findOne({name: cat})
            const catNum = category.catNum
            const Products = await Product.find({$and: [
                    {category: catNum},
                    {status: Activestatus.statusNum}
                ]
            });
            const inventoryItems = await Inventory.find();

            const productsWithPrice = []
            for (const product of Products) {
                const productId = product._id;
                const inventoryItem = inventoryItems.find(item => item.productId.toString() === productId.toString());
                const vendorName = await Vendor.findById(inventoryItem.vendorId)

                const fav = user.favourites.some(favourite => {
                    return favourite.productId && favourite.productId.toString() === productId.toString();
                  });

                if (inventoryItem) {
                    productsWithPrice.push({
                    ...product._doc,
                    vendor: vendorName.companyName,
                    price: inventoryItem.price,
                    category: cat,
                    isFav: fav
                    });
                } 
            };
            res.json(productsWithPrice);
        }
        else{
            
            const Products = await Product.find({$and:[{
                $or: [
                  { name: { $regex: req.params.keyword, $options: "i" } },
                  { description: { $regex: req.params.keyword, $options: "i" } },
                ]},
                {status: Activestatus.statusNum}]
              }); 
              
              const inventoryItems = await Inventory.find();
              const productsWithPrice = [];

              for (const product of Products) {
                const productId = product._id;
                const inventoryItem = inventoryItems.find(item => item.productId.toString() === productId.toString());
                const vendorName = await Vendor.findById(inventoryItem.vendorId.toString());
                
                
                let categoryName = '-';
                if (product.category) {
                    const category = await Category.findOne({catNum: product.category});
                    
                    if (category) {
                    categoryName = category.name;
                    }
                }
                
                const price = inventoryItem ? inventoryItem.price : 0;

                const fav = user.favourites.some(favourite => {
                    return favourite.productId && favourite.productId.toString() === productId.toString();
                });
    
                const productWithPrice = {
                    ...product._doc,
                    category: categoryName,
                    vendor: vendorName.companyName,
                    price: price,
                    isFav: fav
                };
                productsWithPrice.push(productWithPrice);
              }
  
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
        const vendor = await Vendor.findById(product.vendor)
        product.vendor = vendor.companyName
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

        res.status(200).json({ products })
    }catch(err){
        res.json({
            success: false,
            error: err.message
        })}
}

const toggleFav = async(req, res)=>{
    try{
        const user = req.user
        const customer = await Customer.findById(user._id);
        const favprod = req.body.productId

        if(customer.favourites){
            const productExists = await customer.favourites.some(
                (fav) => fav.productId === req.body.productId
            );
            
            if (productExists) 
            {
                const a1 = await Customer.updateOne(
                    { _id: user._id },
                    { $pull: { favourites: { productId: favprod } } }
                );
                res.json("Product removed from your favorites.");
            } 
            else 
            {
                const a2 = await Customer.updateOne(
                    { _id: user._id },
                    { $push: { favourites: { productId: favprod } } }
                );
                res.json("Product added to your favorites.");
            }
        }
        else{
            const a2 = await Customer.updateOne(
                { _id: user._id },
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
    const Activestatus = await Status.findOne({statusDescription: "Active"})
    try{
        const user = req.user

        const keyword = req.params.keyword

        const customer = await Customer.findOne({_id: user._id});

        const productIds = customer.favourites.map(favourite => favourite.productId);

        let products= [];
        if(keyword === "AllProduct$") {
            products = await Product.find({$and: 
                [
                    {_id: { $in: productIds }},
                    {status: Activestatus.statusNum}
                ]})
        }
        else {
            products = await Product.find({$and: 
                [
                    {_id: { $in: productIds }},
                    {
                        $or: [
                            { name: { $regex: req.params.keyword, $options: "i" } },
                            { description: { $regex: req.params.keyword, $options: "i" } },
                        ]
                    },
                    {status: Activestatus.statusNum}
                ]}
            );
        }

        

        let favProducts = []
        for (const product of products) {
            const stock = await Inventory.findOne({ productId: product._id });
            const category = await Category.findOne({catNum: product.category})
            const vendorName = await Vendor.findById(stock.vendorId.toString());
            if(stock) {
                const newProduct = {
                    _id: product._id,
                    name: product.name,
                    vendor: vendorName.companyName,
                    description: product.description,
                    image: product.image,
                    status: product.status,
                    category: category.name,
                    createdAt: product.createdAt,
                    updatedAt: product.updatedAt,
                    isFav: true,
                    price: stock.price
                }
                favProducts.push(newProduct)
            }
            
        }

        if(favProducts.length>0){
            res.status(200).json({favProducts})
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
    viewFav,
    getQuantity,
    getQFn
}