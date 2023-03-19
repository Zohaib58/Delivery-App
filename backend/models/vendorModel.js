const mongoose = require('mongoose')

const vendorSchema = mongoose.Schema
(
    {
        vendorId: {
            type: mongoose.Schema.Types.ObjectId,
            required: [true, "Enter Vendor ID"],
            unique: true,
            ref : 'User',
        },
        companyName: {
            type: String,
            required: [true, "Enter company name"],
            unique: true,
        },
        website: {
            type: String,
            required: [true, "Enter your company's website URL"],
        },
        status: {
            type: mongoose.Schema.Types.ObjectId,
            default: 0,
            ref: 'Status'
        },
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model('Vendor', vendorSchema)