const mongoose = require('mongoose')

const productSchema = mongoose.Schema
(
    {
        //productId will be ._id
        name: {
            type: String,
            required: [true, "Enter name"]
        },
        description: {
            type: String,
        },
        image: {
            type: String,
            required: [false, "Put URL"]
        },
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model('Product', productSchema)