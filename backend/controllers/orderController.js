const Orders = require('../models/orderModel')
const subOrders = require('../models/subOrder')
const Payment = require('../enum/paymentEnum')
const orderStatus = require('../enum/orderEnum')
const Vendor = require('../models/vendorModel')
const Inventory = require('../models/inventoryModel')
const Product = require('../models/productModel')
const { Mutex } = require('async-mutex');
const {getQFn} = require('./productController')
const ID = require('../id/id')


const createOrder = async(req, res)=>{
    
    try{
        
        const user = req.user
        let products= req.body.products

        const vendorOrders= {};

        for(let i =0; i< products.length; i++){
            const product= products[i]
            const vendorProd = await Product.findById(product.ProductID)
            const vendorID = vendorProd.vendor;
            if(!vendorOrders[vendorID]){
                vendorOrders[vendorID]= []
            }
            vendorOrders[vendorID].push(product);
        }
        
        const subOrderIDs= []

        let orderCost =0

        for (const vendorId of Object.keys(vendorOrders)) {
            const products = vendorOrders[vendorId];
            let costOfProducts = 0;
            for (let i = 0; i < products.length; i++) {
              const product = products[i];
              const cost = await Inventory.findOne({productId: product.ProductID});
              const prodcount = await getQFn(product.ProductID)
              if(prodcount>=product.Quantity){
                costOfProducts += (cost.price*product.Quantity);
                product.Price = cost.price
              }
              else{
                res.json({
                    success: false,
                    message: `Error occurred. Not enough stock for ${product.ProductID}`
                })
                return;
              }
            }
            orderCost+=costOfProducts;
            const subOrder = new subOrders({
              _id: await ID.id(subOrders),
              customerId: user._id,
              vendorId: vendorId,
              products: products,
              deals: [],
              cost: costOfProducts
            });

            await subOrder.save();
            
        }


        const order = new Orders({
            _id: await ID.id(Orders),
            customerId : user.id,
            subOrders: subOrderIDs,
            address: req.body.address,
            contact: req.body.contact,
            paymentType: req.body.paymentType,
            status: 0,
            cost: orderCost
        })

        const savedOrder = await order.save();

        for( let i = 0; i< products.length; i++){
            let quantity= products[i].Quantity;
            const searchStock = await Inventory.findOne({productId: products[i].ProductID})
            searchStock.quantity = searchStock.quantity - quantity;
            const saveStock = await searchStock.save();
        }

        // for(let i = 0; i< order.deals.length; i++){
        //     let products = deals[i].products;
        //     for( let j = 0; j< order.products.length; j++){
        //         let quantity= products[j].quantity;
        //         const searchStock = await Inventory.findOne({productId: products[j].ProductID})
        //         searchStock.quantity = searchStock.quantity - quantity;
        //         const saveStock = await searchStock.save();
        //     }
        // }
        res.status(200).json(savedOrder)
    } catch(err) {
        res.json(err.message)
    }

}
//customers views his previous orders
const viewOrders = async(req, res)=>{
    try{
        const user = req.user;

        const orders = await Orders.find({customerId: user._id})
        const ordersDisplay = [];

        for (let i = 0; i < orders.length; i++) {
            const order = orders[i];
            const payment = await Payment.findOne({paymentNum: order.paymentType})
            const orderstatus = await orderStatus.findOne({orderNum: order.status})
            
            const date = new Date(order.createdAt).toISOString().substr(0, 10);
            const orderWithMinDetails = {
                orderId: order._id,
                orderDate: date,
                paymentType: payment.paymentDescription,
                status: orderstatus.orderDescription,
                cost: order.cost,
            };
            ordersDisplay.push(orderWithMinDetails);
        }


        if(orders.length>0){
            res.status(200).json(ordersDisplay)
        }
        else {
            res.status(200).json("No orders yet.")
        }
    } catch(err) {
        res.json(err.message)
    }
}

//customer views a specific order
const viewOrder = async(req, res)=>{
    try{

        const user = req.user
        const order = await Orders.find({_id: req.params.orderId})

        if(order.length==1){
            const orderWithAllInfo = [];
            const date = new Date(order[0].createdAt).toISOString().substr(0, 10);
            const payment = await Payment.findOne({paymentNum: order[0].paymentType})
            const orderstatus = await orderStatus.findOne({orderNum: order[0].status})
            
            const orderWithProducts = {
                orderId: order[0]._id,
                orderDate: date,
                paymentType: payment.paymentDescription,
                amount: order[0].cost,
                status: orderstatus.orderDescription,
                subOrders: []
            };
            for (let j = 0; j < order[0].subOrders.length; j++) {
                const subOrder = await subOrders.findById(order[0].subOrders[j].subOrderID);

                const products = []
                for (let k = 0; k < subOrder.products.length; k++) {
                    const product = subOrder.products[k];

                    const productDetails = await Product.findById(product.ProductID);
                    const vendor = await Vendor.findById(productDetails.vendor)
                    products.push({
                        name: productDetails.name,
                        price: product.Price,
                        quantity: product.Quantity,
                        image: productDetails.image,
                        vendor: vendor.companyName
                    });
                }
                orderWithProducts.subOrders.push({
                    products: products
                });
            }
            orderWithAllInfo.push(orderWithProducts);

            res.status(200).json(orderWithAllInfo)
        }
        else{
            res.json("An error while fetching your order has occurred")
        }   
    } catch(err) {
        res.json(err.message)
    }
}

const cancelOrder = async(req, res) => {
    const user = req.user
    try{
        const order = await Orders.findById(req.body.orderID)
        const orderStat = await orderStatus.findOne({orderNum: order.status})
        if(orderStat) {
            if (orderStat.orderDescription === "Confirmed" || orderStat.orderDescription === "In Process"){
                const cancelOrderNum = await orderStatus.findOne({orderDescription: "Cancelled"})
                order.status = cancelOrderNum.orderNum;
                await order.save()
                for (const subOrder of order.subOrders){
                    const SO = await subOrders.findById(subOrder.subOrderID)
                    SO.status = cancelOrder.orderNum
                    await SO.save()
                }
                res.json("Order Cancelled")
            }
            else{
                res.json({
                    success: false,
                    message: "Order cant be cancelled"
                })
            }
        }
        else {
            res.json({
                success: false,
                message: "Order cant be accessed"
            })
        }
        
    } catch (err) {
        res.json({
            success: false,
            error: err.message
        })
    }
}

const getVendorOrders = async(req, res)=>{
    const user = req.user;
    const vendorId = user._id;

    try{
        const vendorOrders = await subOrders.find({vendorId : vendorId})

        res.json(vendorOrders)

    }catch(err) {
        res.json(err.message)
    }
}

const getAVendorOrder = async(req, res)=>{
    const user = req.user;
    const vendorId = user._id;

    try{
        const vendorOrder = await subOrders.findOne({$and:[
            {vendorId : vendorId},
            { _id: req.body.orderId}
        ]})

        res.json(vendorOrder)
    } catch(err) {
        res.json(err.message)
    }
}

const vendorUpdateOrderStatus = async(req, res)=>{
    try{
        const user = req.user
        const vendorId = user._id

        const order = await subOrders.find({_id: req.body.suborderId})

        order.status = req.body.status;

        const saveOrder = await order.save();

        res.json("Order Status updated!")
    } catch(err) {
        res.json(err.message)
    }
}

const dpUpdateOrderStatus = async(req, res)=>{
    try{
        const user = req.user
        const DPId = user._id

        const order = await Orders.find({_id: req.body.order.orderId})

        if(order.dpId == DPId){
            order.status = req.body.order.status;

            const saveOrder = await order.save();
            res.json("Order Status updated!")
        }
        else {
            res.json("You dont have access to this order")
        }
    } catch(err) {
        res.json(err.message)
    }
}

const viewApprovedOrders = async(req,res)=>{
    try{
        const orders = await Orders.find({$and:[
            {dpId: null},
            {status: 1}
        ]})
        
        res.json( orders )

    }catch(err) {
        res.json(err.message)
    }
}

const acceptOrderToDeliver = async(req, res)=>{
    try{
        const user = req.user
        const DPId = user._id

        const order = await Orders.find({_id: req.body.order.orderId})

        if(order.dpId === null){
            order.dpId = DPId
            order.status = 2

            const saveOrder = await order.save();
            res.json("Order Accepted")
        }
        else {
            res.json("Order can't be accepted")
        }
    } catch(err) {
        res.json(err.message)
    }
}



module.exports = {
    createOrder,
    viewOrders,
    viewOrder,
    cancelOrder,
    getAVendorOrder,
    getVendorOrders,
    vendorUpdateOrderStatus,
    dpUpdateOrderStatus,
    acceptOrderToDeliver,
    viewApprovedOrders
}