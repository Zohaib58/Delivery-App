const mongoose = require('mongoose')

const inventorySchema = mongoose.Schema
(
    {
        productId: {
            type: mongoose.Schema.Types.String,
            required: [true, "Select products"],
            ref: 'Product' 
            },
        vendorId: {
            type: mongoose.Schema.Types.String,
            required: [true, "Enter Vendor ID"],
            ref: 'Vendor'
        },
        discount: {
            type: Number,
            required: [true, "Enter discount (not in percentage)"]
        },
        quantity: {
            type: Number,
            required: [true, "Enter quantity"],
        },
        price: {
            type: Number,
            required: [true, "Enter price"],
        },
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model('Inventory', inventorySchema)