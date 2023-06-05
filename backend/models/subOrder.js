const mongoose = require('mongoose')

const subOrderSchema = mongoose.Schema
(
    {
        //orderId will be ._id
        _id: {type: String, required: true},
        customerId: {
            type: String,
            required: true,
            ref: 'User'
        },
        vendorId: {
            type: String,
            required: true,
            ref: 'Vendor'
        },
        products: [
            {
                ProductID: {
                type: String,
                required: true, 
                ref: 'Product',
                },
                Quantity: {
                    type: Number,
                    default: 1,
                },
                Price: {
                    type: Number,
                }
            }
        ],
        deals: [
            {
                dealId: {
                    type: String,
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