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
        products: [{
            ProductID: {
            type: mongoose.Schema.Types.ObjectId,
            required: true, 
            ref: 'Product',
            },
            Quantity: {
                type: Number,
                default: 1,
            }
        }],
        address: {
            type: String,
            required: [true, "Enter Address"]
        },
        contact: {
            type: Number,
            required: [true, "Enter contact"],
            unique: true,
        },
        paymentType: {
            type: String,
            required: [true, "Enter payment type"] //Enum?
        },
        status: {
            type: Boolean,
            required: [true, "Enter Status"] //Enum
        },
        date: {
            type: Date,
            required: [false, "Enter date"]
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