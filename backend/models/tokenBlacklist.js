const mongoose = require('mongoose');

const tokenBlacklistSchema = mongoose.Schema({
  token: {
    type: String,
    required: true,
    unique: true,
  }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('TokenBlacklist', tokenBlacklistSchema);
