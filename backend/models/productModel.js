const mongoose = require('mongoose')

const productSchema = mongoose.Schema
(
    {
<<<<<<< HEAD
        _id: {
            type: String
        },
=======
        //productId will be ._id
        _id: { type: String },
>>>>>>> 3938138199d2c4f1cf0b88ab7fe2b1b2041b77d2
        name: {
            type: String,
            required: [true, "Enter name"]
        },
        vendor:{
<<<<<<< HEAD
            type: mongoose.Schema.Types.String,
=======
            type: String,
>>>>>>> 3938138199d2c4f1cf0b88ab7fe2b1b2041b77d2
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