const mongoose = require('mongoose')

const subOrderSchema = mongoose.Schema
(
    {
        //orderId will be ._id
        customerId: {
            type: mongoose.Schema.Types.String,
            required: true,
            ref: 'User'
        },
        vendorId: {
            type: mongoose.Schema.Types.String,
            required: true,
            ref: 'Vendor'
        },
        products: [
            {
                ProductID: {
                type: mongoose.Schema.Types.String,
                required: true, 
                ref: 'Product',
                },
                Quantity: {
                    type: Number,
                    default: 1,
                }
            }
        ],
        deals: [
            {
                dealId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Product',
                },
            }
        ],
        status:{
            type: mongoose.Schema.Types.Number,
            default: 0,
            ref: 'orderEnum'
        },
        cost: {
            type: Number,
            required: [true, "Enter cost"]
        },  
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model('SubOrder', subOrderSchema)