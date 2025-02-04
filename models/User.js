const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  points: {
    type: Number,
    default: 0
  },
  achievements: [{
    name: String,
    earnedAt: Date
  }],
  totalEmissions: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('User', userSchema);
