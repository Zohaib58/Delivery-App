const mongoose = require('mongoose')

const roleSchema = mongoose.Schema
(
    {
        roleNum: {
            type: Number,
            required: true,
            unique: true
        },
        roleDescription: {
            type: String,
            required: true,
            unique: true,
        }
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model('Roles', roleSchema)