const mongoose = require('mongoose');

const sizeEnumSchema = mongoose.Schema(
  {
    sizeNum: {
      type: Number,
      required: true,
      unique: true,
      enum: [0, 1, 2], // Restricts the values to only 0 or 1
      default: 0
    },
    sizeDescription: {
      type: String,
      required: true,
      unique: true,
      enum: ["Small", "Medium", "Large"] // Restricts the values to only "Cash on Delivery" or "Through Card"
    }
  },
  {
    timestamps: true // Adds createdAt and updatedAt fields
  }
);

module.exports = mongoose.model('SizeEnum', sizeEnumSchema);