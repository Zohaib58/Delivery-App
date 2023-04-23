const mongoose = require('mongoose')

const categorySchema = mongoose.Schema
(
    {
        name: {
            type: String,
            required: [true, "Enter name"]
        },
        catNum:{
            type: Number,
            required: true
        }
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model('Category', categorySchema)