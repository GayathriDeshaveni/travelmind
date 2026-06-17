const mongoose = require('mongoose');

const tripSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  destination: {
    type: String,
    required: true
  },
  startDate: {
    type: String,
    required: true
  },
  endDate: {
    type: String,
    required: true
  },
  budget: {
    type: Number,
    required: true
  },
  interests: {
    type: [String],
    default: []
  },
  itinerary: {
    type: String,
    default: ''
  }
}, { timestamps: true });

module.exports = mongoose.model('Trip', tripSchema);