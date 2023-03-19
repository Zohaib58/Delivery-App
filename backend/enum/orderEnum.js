const mongoose = require('mongoose');

const orderEnumSchema = mongoose.Schema(
  {
    orderNum: {
      type: Number,
      required: true,
      unique: true,
      enum: [0, 1, 2, 3, 4] // Restricts the values to only 0 or 1
    },
    orderDescription: {
      type: String,
      required: true,
      unique: true,
      enum: ["Confirmed", "In process", "Out for delievery", "Delievered", "Cancelled"] // Restricts the values to only "Cash on Delivery" or "Through Card"
    }
  },
  {
    timestamps: true // Adds createdAt and updatedAt fields
  }
);

module.exports = mongoose.model('orderEnum', orderEnumSchema);
