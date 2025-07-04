const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/auth');

// Protected route example
router.get('/', authenticateToken, async (req, res) => {
  try {
    // Placeholder response
    res.json({ message: 'Crops data endpoint' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
