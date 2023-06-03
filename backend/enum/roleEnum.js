const mongoose = require('mongoose');

const roleEnumSchema = mongoose.Schema(
  {
    roleNum: {
      type: Number,
      required: true,
      unique: true,
      enum: [0, 1, 2, 3], 
      default: 0
    },
    roleDescription: {
      type: String,
      required: true,
      unique: true,
      enum: ["Customer", "Vendor", "Delivery Personal", "Super Admin"] 
    }
  },
  {
    timestamps: true // Adds createdAt and updatedAt fields
  }
);

module.exports = mongoose.model('roleEnum', roleEnumSchema);