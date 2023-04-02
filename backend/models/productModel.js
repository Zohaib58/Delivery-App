const mongoose = require('mongoose')

const productSchema = mongoose.Schema
(
    {
        //productId will be ._id
        name: {
            type: String,
            required: [true, "Enter name"]
        },
        vendor:{
            type: mongoose.Schema.Types.ObjectId,
            required: [true, "Enter Vendor ID"],
            ref: 'Vendor'
        },
        description: {
            type: String,
        },
        image: {
            type: String,
            required: [false, "Put URL"]
        },
        status: {
            type: mongoose.Schema.Types.Number,
            default: 0,
            ref: 'StatusEnum',
        },
        category:{
            type: mongoose.Schema.Types.Number,
            required: true,
            ref: 'category'
        }
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model('Product', productSchema)