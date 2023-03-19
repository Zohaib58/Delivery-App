const mongoose = require('mongoose')

const statusSchema = mongoose.Schema
(
    {
        statusNum: {
            type: Number,
            required: true,
            unique: true
        },
        statusDescription: {
            type: String,
            required: true,
            unique: true,
        }
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model('Status', statusSchema)