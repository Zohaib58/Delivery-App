const mongoose = require('mongoose')

const customerSchema = mongoose.Schema
(
    {
        //customerId will be ._id
        userId: {
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
        orders: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Order Detail"
        }],
        status: {
            type: Boolean,
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