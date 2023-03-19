const mongoose = require('mongoose')
const PaymentEnum = require('../enum/paymentEnum');

const customerSchema = mongoose.Schema
(
    {
        customerId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
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
        status: {
            type: mongoose.Schema.Types.Number,
            default: 0,
            ref: 'Status',
        },
        address: {
            type: String,
        },
        favourites: [
            {
                productId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Product"
                }
            }
        ],

    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model('Customer', customerSchema)