const mongoose = require('mongoose');

const statusEnumSchema = mongoose.Schema(
  {
    statusNum: {
      type: Number,
      required: true,
      unique: true,
      enum: [0, 1],
      default: 0
    },
    statusDescription: {
      type: String,
      required: true,
      unique: true,
      enum: ["Active", "Inactive"]
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('StatusEnum', statusEnumSchema);
