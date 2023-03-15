const mongoose = require('mongoose')

const productSchema = mongoose.Schema
(
    {
        //productId will be ._id
        vendorID: {
            type: mongoose.Schema.Types.ObjectId,
            required: [true, "Enter Vendor ID"],
            ref: 'Vendor',
        },
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