const mongoose = require('mongoose')

const userSchema = mongoose.Schema
(
    {
        //userId will be ._id
        email: {
            type: String,
            required: [true, "Enter email"],
            unique: true,
        },
        password: {
            type: String,
            required: [true, "Enter your password"],
        },
        role: {
            type: Number,
            required: [true, "Enter your role"] //ASK ZOHAIB
        },
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model('User', userSchema)