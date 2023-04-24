const mongoose = require('mongoose')

const userSchema = mongoose.Schema
(
    {
        _id: {
            type: String,
        },
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
            ref: 'roleEnum',

        },
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model('User', userSchema)