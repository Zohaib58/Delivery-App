const mongoose = require('mongoose');

const roleEnumSchema = mongoose.Schema(
  {
    roleNum: {
      type: Number,
      required: true,
      unique: true,
      enum: [0, 1, 2, 3, 4] 
    },
    roleDescription: {
      type: String,
      required: true,
      unique: true,
      enum: ["Vendor", "Customer", "Delivery Perosnal", "Admin", "Super Admin"] 
    }
  },
  {
    timestamps: true // Adds createdAt and updatedAt fields
  }
);

module.exports = mongoose.model('roleEnum', roleEnumSchema);