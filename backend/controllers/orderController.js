const Orders = require('../models/orderModel')
const Vendor = require('../models/vendorModel')
const Inventory = require('../models/inventoryModel')

 
const createOrder = async(req, res)=>{
    try{
        const user = req.user

        const order = new Orders({
            customerId : user._id,
            products: req.body.products,
            address: req.body.address,
            contact: req.body.contact,
            deals: req.body.deals,
            paymentType: req.body.paymentType,
            status: req.body.status,
            cost: req.body.cost
        })

        const savedOrder = await order.save();

        for( let i = 0; i< order.products.length; i++){
            let quantity= products[i].quantity;
            const searchStock = await Inventory.findOne({productId: products[i].productId})
            searchStock.quantity = searchStock.quantity - quantity;
            const saveStock = await searchStock.save();
        }

        for(let i = 0; i< order.deals.length; i++){
            let products = deals[i].products;
            for( let j = 0; j< order.products.length; j++){
                let quantity= products[j].quantity;
                const searchStock = await Inventory.findOne({productId: products[j].productId})
                searchStock.quantity = searchStock.quantity - quantity;
                const saveStock = await searchStock.save();
            }
        }

        res.status(200).json({
            succuss: true,
            data: savedOrder,
        })
    } catch(err) {
        res.json({
            success: false,
            error: err.message
        })
    }
}

//customers views his previous orders
const viewOrders = async(req, res)=>{
    try{
        const user = req.user;

        const orders = await Orders.find({customerId: user._id})

        if(orders.length>0){
            res.status(200).json({
                success: true,
                data: orders,
            })
        }
        else {
            res.status(200).json("No orders yet.")
        }
    } catch(err) {
        res.json({
            success: false,
            error: err.message
        })
    }
}

//customer views a specific order
const viewOrder = async(req, res)=>{
    try{
        const user = req.user

        const order = await Orders.find({
            $and: [
                {customerId: user._id},
                {orderId: req.body.orderId},
            ]
        })

        if(order.length==1){
            res.status(200).json({
                success: true,
                data: order[0],
            })
        }
        else{
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

const getVendorOrders = async(req, res)=>{
    const user = req.user;
    const vendorId = user._id;

    try{
        const vendorOrders = await Orders.find({vendorId : vendorId})

        res.json({
            success: true,
            data: vendorOrders
        })

    }catch(err) {
        res.json({
            success: false,
            error: err.message
        })
    }
}

const getAVendorOrder = async(req, res)=>{
    const user = req.user;
    const vendorId = user._id;

    try{
        const vendorOrder = await Orders.findOne({$and:[
            {vendorId : vendorId},
            { _id: req.body.orderId}
        ]})

        res.json({
            success: true,
            data: vendorOrder
        })
    } catch(err) {
        res.json({
            success: false,
            error: err.message
        })
    }
}

const vendorUpdateOrderStatus = async(req, res)=>{
    try{
        const user = req.user
        const vendorId = user._id

        const order = await Orders.find({_id: req.body.order.orderId})

        order.status = req.body.order.status;

        const saveOrder = await order.save();

        res.json({
            success: true,
            data: "Order Status updated!"
        })
    } catch(err) {
        res.json({
            success: false,
            error: err.message
        })
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
            res.json({
                success: true,
                data: "Order Status updated!"
            })
        }
        else {
            res.json({
                success: false,
                error: "You dont have access to this order"
            })
        }
    } catch(err) {
        res.json({
            success: false,
            error: err.message
        })
    }
}

const viewApprovedOrders = async(req,res)=>{
    try{
        const orders = await Orders.find({$and:[
            {dpId: null},
            {status: 1}
        ]})
        
        res.json({
            success: true,
            data: orders
        })

    }catch(err) {
        res.json({
            success: false,
            error: err.message
        })
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
            res.json({
                success: true,
                data: "Order Accepted"
            })
        }
        else {
            res.json({
                success: false,
                error: "Order can't be accepted"
            })
        }
    } catch(err) {
        res.json({
            success: false,
            data: err.message
        })
    }
}



module.exports = {
    createOrder,
    viewOrders,
    viewOrder,
    getAVendorOrder,
    getVendorOrders,
    vendorUpdateOrderStatus,
    dpUpdateOrderStatus,
    acceptOrderToDeliver,
    viewApprovedOrders
}