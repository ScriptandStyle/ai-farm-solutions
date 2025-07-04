const mongoose = require('mongoose');

const EducationalResourceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true,
    enum: ['Video Tutorial', 'PDF Guide', 'Online Course']
  },
  level: {
    type: String,
    required: true,
    enum: ['Beginner', 'Intermediate', 'Advanced']
  },
  length: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  },
  thumbnail: {
    type: String
  },
  category: {
    type: String,
    required: true,
    enum: ['Soil Health', 'Pest Control', 'Crop Management', 'Irrigation', 'Sustainable Practices']
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

module.exports = mongoose.model('EducationalResource', EducationalResourceSchema); 