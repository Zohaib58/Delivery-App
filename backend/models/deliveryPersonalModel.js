const mongoose = require('mongoose')

const deliveryPersonalSchema = mongoose.Schema
(
    {
        dpId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            unique: true,
            ref: 'User'
        },
        vendorId: {
            type: mongoose.Schema.Types.ObjectId,
            required: [true, "Enter Vendor ID"],
            ref: 'Vendor'
        },
        name: {
            type: String,
            required: [true, "Enter name"]
        },
        phoneNo: {
            type: Number,
            required: [true, "Enter Contact Number (Without any dashes)"],
            unique: true,
        },
        vehicleNo: {
            type: Number,
            required: [true, "Enter vehicle number (Without any dashes)"],
            unique: true,
        },
        cnic: {
            type: Number,
            required: [true, "Enter CNIC"],
            unique: true,
        },
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model('Delivery Personal', deliveryPersonalSchema)