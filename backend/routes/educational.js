const express = require('express');
const router = express.Router();
const EducationalResource = require('../models/EducationalResource');

// Middleware to verify JWT token
const { authenticateToken } = require('../middleware/auth');

// Get all educational resources
router.get('/', async (req, res) => {
  try {
    const resources = await EducationalResource.find()
      .sort({ createdAt: -1 })
      .populate('createdBy', 'username');
    res.json(resources);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get resources by type
router.get('/type/:type', async (req, res) => {
  try {
    const resources = await EducationalResource.find({ type: req.params.type })
      .sort({ createdAt: -1 })
      .populate('createdBy', 'username');
    res.json(resources);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get resources by category
router.get('/category/:category', async (req, res) => {
  try {
    const resources = await EducationalResource.find({ category: req.params.category })
      .sort({ createdAt: -1 })
      .populate('createdBy', 'username');
    res.json(resources);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create new educational resource
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { title, description, type, level, length, url, thumbnail, category } = req.body;

    const resource = new EducationalResource({
      title,
      description,
      type,
      level,
      length,
      url,
      thumbnail,
      category,
      createdBy: req.user.userId
    });

    await resource.save();
    res.status(201).json(resource);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update educational resource
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const resource = await EducationalResource.findById(req.params.id);
    
    if (!resource) {
      return res.status(404).json({ message: 'Resource not found' });
    }

    // Check if user is authorized to update
    if (resource.createdBy.toString() !== req.user.userId && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const { title, description, type, level, length, url, thumbnail, category } = req.body;

    resource.title = title;
    resource.description = description;
    resource.type = type;
    resource.level = level;
    resource.length = length;
    resource.url = url;
    resource.thumbnail = thumbnail;
    resource.category = category;
    resource.updatedAt = Date.now();

    await resource.save();
    res.json(resource);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete educational resource
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const resource = await EducationalResource.findById(req.params.id);
    
    if (!resource) {
      return res.status(404).json({ message: 'Resource not found' });
    }

    // Check if user is authorized to delete
    if (resource.createdBy.toString() !== req.user.userId && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized' });
    }

    await resource.remove();
    res.json({ message: 'Resource removed' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;