const mongoose = require('mongoose');

const WeatherAlertSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    enum: ['Frost Warning', 'Drought Alert', 'Storm Warning', 'Heat Wave', 'Flood Warning']
  },
  severity: {
    type: String,
    required: true,
    enum: ['Low', 'Medium', 'High']
  },
  description: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  expiresAt: {
    type: Date,
    required: true
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('WeatherAlert', WeatherAlertSchema); 