const mongoose = require('mongoose')

const adminSchema = mongoose.Schema
(
    {
        //adminId will be ._id
        userId: {
            type: String,
            required: [true, "Enter User ID"],
            ref: 'User'
        },
        vendorId: {
            type: Number,
            required: [true, "Enter Vendor ID"],
            ref: 'Vendor'
        },
        createdOn: {
            type: Date,
            required: [false, "Enter date"],
        },
        name: {
            type: String,
            required: [true, "Enter name"]
        },
        
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model('Admin', adminSchema)