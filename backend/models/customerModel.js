const mongoose = require('mongoose')

const customerSchema = mongoose.Schema
(
    {
        //customerId will be ._id
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            required: [true, "Enter Customer ID"],
            unique: true,
            ref: "User"
        },
        name: {
            type: String,
            required: [true, "Enter name"]
        },
        phoneNo: {
            type: Number,
            required: [true, "Enter your contact"]
        },
        orders: [{
            type: mongoose.Schema.Types.ObjectId,
            required: [true, "Enter order details"],
            ref: "Order Detail"
        }],
        status: {
            type: Boolean,
            required: [false, "Enter status"]
        },
        address: {
            type: String,
            required: [false, "Enter address"]
        },
        favourites: [{
            type: mongoose.Schema.Types.ObjectId,
            required: [true, "select favorite products"],
            ref: "Product"
        }],
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model('Customer', customerSchema)