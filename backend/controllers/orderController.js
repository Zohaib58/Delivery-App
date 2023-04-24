const Orders = require('../models/orderModel')
const subOrders = require('../models/subOrder')
const Vendor = require('../models/vendorModel')
const Inventory = require('../models/inventoryModel')
const Product = require('../models/productModel')
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
              costOfProducts += (cost.price*product.Quantity);
            }
            orderCost+=costOfProducts;
            const subOrder = new subOrders({
              customerId: user._id,
              vendorId: vendorId,
              products: products,
              deals: [],
              cost: costOfProducts
            });

            await subOrder.save();
            subOrderIDs.push({ subOrderID: subOrder._id });
        }


        const order = new Orders({
            _id: await ID.id(Orders),
            customerId : user.id,
            subOrders: subOrderIDs,
            address: req.body.address,
            contact: req.body.contact,
            paymentType: req.body.paymentType,
            status: req.body.status,
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

        const ordersDisplay = [];

        for (let i = 0; i < orders.length; i++) {
            const order = orders[i];
            const orderWithMinDetails = {
                orderId: order._id,
                orderDate: order.date,
                paymentType: order.paymentType,
                status: order.status,
                cost: order.cost,
            };
            ordersDisplay.push(orderWithMinDetails);
        }


        if(orders.length>0){
            res.status(200).json({
                success: true,
                data: ordersDisplay,
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
        const order = await Orders.find({_id: req.params.orderId})

        if(order.length==1){
            const orderWithAllInfo = [];
            
            const orderWithProducts = {
                orderId: order[0]._id,
                orderDate: order[0].orderDate,
                subOrders: []
            };
            for (let j = 0; j < order[0].subOrders.length; j++) {
                const subOrder = await subOrders.findById(order[0].subOrders[j].subOrderID);
                
                const products = []
                for (let k = 0; k < subOrder.products.length; k++) {
                    const product = subOrder.products[k];

                    const productDetails = await Product.findById(product.ProductID);
                    const invenDetails = await Inventory.findOne({productId:product.ProductID})
                    products.push({
                        name: productDetails.name,
                        price: invenDetails.price,
                        quantity: product.Quantity
                    });
                }
                orderWithProducts.subOrders.push({
                    subOrderId: subOrder._id,
                    vendorId: subOrder.vendorId,
                    products: products
                });
            }
            orderWithAllInfo.push(orderWithProducts);

            res.status(200).json({
                success: true,
                data: orderWithAllInfo,
            })
        }
        else{
            res.json({
                success: false,
                error: "An error while fetching your order has occurred"
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
        const vendorOrders = await subOrders.find({vendorId : vendorId})

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
        const vendorOrder = await subOrders.findOne({$and:[
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

        const order = await subOrders.find({_id: req.body.suborderId})

        order.status = req.body.status;

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