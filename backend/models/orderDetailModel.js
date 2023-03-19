const mongoose = require('mongoose')

const orderDetail = mongoose.Schema
(
    {
        orderDetailsId: {
            type: mongoose.Schema.Types.ObjectId,
            required: [true], 
        },
        customerId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        },
        
        details: {
            type: String,
            required: [true, "Enter description"],
        },
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model('Order Detail', orderDetail)