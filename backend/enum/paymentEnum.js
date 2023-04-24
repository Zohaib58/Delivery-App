const mongoose = require('mongoose');

const paymentEnumSchema = mongoose.Schema(
  {
    paymentNum: {
      type: Number,
      required: true,
      unique: true,
      enum: [0, 1], // Restricts the values to only 0 or 1
      default: 0
    },
    paymentDescription: {
      type: String,
      required: true,
      unique: true,
      enum: ["Cash on Delivery", "Card"] // Restricts the values to only "Cash on Delivery" or "Through Card"
    }
  },
  {
    timestamps: true // Adds createdAt and updatedAt fields
  }
);

module.exports = mongoose.model('PaymentEnum', paymentEnumSchema);
