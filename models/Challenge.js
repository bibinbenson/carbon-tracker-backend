const mongoose = require('mongoose');

const challengeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: String,
  points: Number,
  duration: Number,
  isActive: {
    type: Boolean,
    default: true
  },
  category: {
    type: String,
    enum: ['TRANSPORT', 'ENERGY', 'FOOD']
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Challenge', challengeSchema);
