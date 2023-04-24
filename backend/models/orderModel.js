const mongoose = require('mongoose')

const orderSchema = mongoose.Schema
(
    {
        //orderId will be ._id
        _id: { type: String },
        customerId: {
            type: String,
            required: true,
            ref: 'User'
        },
        subOrders: [
            {
                subOrderID: {
                type: mongoose.Schema.Types.ObjectId,
                required: true, 
                ref: 'SubOrder',
                }
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
            ref: 'orderEnum'
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