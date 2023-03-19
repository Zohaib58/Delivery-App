const OrderDetails = require('../models/orderDetailModel')
const Orders = require('../models/orderModel')
const Vendor = require('../models/vendorModel')


const createOrder = async(req, res)=>{
    try{
        const user = req.user
        const order = req.body

        const savedOrder = await order.save();

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

const viewOrders = async(req, res)=>{
    try{
        const user = req.user;

        const orders = await Orders.find({customerId: user.userId})

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

const viewOrder = async(req, res)=>{
    try{
        const user = req.user
        const order = await Orders.find({
            $and: [
                {customerId: user.userId},
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
            res.json("An error has occurred")
        }
    } catch(err) {
        res.json({
            success: false,
            error: err.message
        })
    }
}

module.exports = {
    createOrder,
    viewOrders,
    viewOrder,
}