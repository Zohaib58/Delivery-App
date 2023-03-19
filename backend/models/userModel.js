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
            type: mongoose.Schema.Types.Number,
            required: [true, "Enter your role"],
            ref: 'Roles',
        },
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model('User', userSchema)