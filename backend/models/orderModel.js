const mongoose = require('mongoose')

const orderSchema = mongoose.Schema
(
    {
        //orderId will be ._id
        customerId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Customer'
        },
        vendorId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Vendor'
        },
        products: [
            {
                ProductID: {
                type: mongoose.Schema.Types.ObjectId,
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
        address: {
            type: String,
            required: [true, "Enter Address"]
        },
        contact: {
            type: Number,
            required: [true, "Enter contact"],
        },
        paymentType: {
            type: mongoose.Schema.Types.Number,
            default: 0,
            ref: 'PaymentEnum'
        },
        status: {
            type: mongoose.Schema.Types.Number,
            default: 0,
            ref: 'orderStatus'
        },
        date: {
            type: Date,
        },
        dpId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Delivery Personal"
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

module.exports = mongoose.model('Order', orderSchema)