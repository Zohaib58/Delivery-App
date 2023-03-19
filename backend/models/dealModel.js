const mongoose = require('mongoose')

const dealSchema = mongoose.Schema
(
    {
        //dealId will be ._id
        vendorId: {
            type: mongoose.Schema.Types.ObjectId,
            required: [true, "Enter Vendor ID"], 
            ref: 'Vendor'
        },
        name: {
            type: String,
            required: [true, "Enter name"]
        },
        description: {
            type: String,
            required: [false, "Enter description"]
        },
        image: {
            type: String,
            required: [false, "Put URL"]
        },
        endDate: {
            type: Date,
            required: [true, "Enter end date"]
        },
        startDate: {
            type: Date,
            required: [true, "Enter start date"]
        },
        price: {
            type: Number,
            required: [true, "Enter price"]
        },
        products: [
            {
                productId: {
                type: mongoose.Schema.Types.ObjectId,
                required: [true, "Select products"],
                ref: 'Product' 
                },
                quantity: {
                    type: Number,
                    default: 1,
                }
            }
        ]
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model('Deal', dealSchema)