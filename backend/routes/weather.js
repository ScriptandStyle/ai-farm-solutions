const express = require('express');
const router = express.Router();
const WeatherAlert = require('../models/WeatherAlert');

// Middleware to verify JWT token
const { authenticateToken } = require('../middleware/auth');

// Get all weather alerts
router.get('/', async (req, res) => {
  try {
    const alerts = await WeatherAlert.find()
      .sort({ date: -1 })
      .populate('createdBy', 'username');
    res.json(alerts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get weather alerts by location
router.get('/location/:location', async (req, res) => {
  try {
    const alerts = await WeatherAlert.find({ location: req.params.location })
      .sort({ date: -1 })
      .populate('createdBy', 'username');
    res.json(alerts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create new weather alert
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { type, severity, description, location, date, expiresAt } = req.body;

    const alert = new WeatherAlert({
      type,
      severity,
      description,
      location,
      date,
      expiresAt,
      createdBy: req.user.userId
    });

    await alert.save();
    res.status(201).json(alert);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update weather alert
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const alert = await WeatherAlert.findById(req.params.id);
    
    if (!alert) {
      return res.status(404).json({ message: 'Alert not found' });
    }

    // Check if user is authorized to update
    if (alert.createdBy.toString() !== req.user.userId && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const { type, severity, description, location, date, expiresAt } = req.body;

    alert.type = type;
    alert.severity = severity;
    alert.description = description;
    alert.location = location;
    alert.date = date;
    alert.expiresAt = expiresAt;
    alert.updatedAt = Date.now();

    await alert.save();
    res.json(alert);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete weather alert
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const alert = await WeatherAlert.findById(req.params.id);
    
    if (!alert) {
      return res.status(404).json({ message: 'Alert not found' });
    }

    // Check if user is authorized to delete
    if (alert.createdBy.toString() !== req.user.userId && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized' });
    }

    await alert.remove();
    res.json({ message: 'Alert removed' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;