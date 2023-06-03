const mongoose = require('mongoose')

const adminSchema = mongoose.Schema
(
    {
        adminId: {
            type: String,
            required: [true, "Enter User ID"],
            ref: 'User'
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