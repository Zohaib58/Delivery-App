const mongoose = require('mongoose');

const orderEnumSchema = mongoose.Schema(
  {
    orderNum: {
      type: Number,
      required: true,
      unique: true,
      enum: [0, 1, 2, 3, 4], 
      default: 0
    },
    orderDescription: {
      type: String,
      required: true,
      unique: true,
      enum: ["Confirmed", "In Process", "Out for delivery", "Delivered", "Cancelled"] 
    }
  },
  {
    timestamps: true // Adds createdAt and updatedAt fields
  }
);

module.exports = mongoose.model('orderEnum', orderEnumSchema);
