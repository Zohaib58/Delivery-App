const mongoose = require('mongoose')

const productSchema = mongoose.Schema
(
    {
        _id: {
            type: String
        },
        name: {
            type: String,
            required: [true, "Enter name"]
        },
        vendor:{
            type: String,
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
            ref: 'Category'
        },
        size:{
            type: mongoose.Schema.Types.Number,
            required: true,
            ref: 'SizeEnum'
        }
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model('Product', productSchema)