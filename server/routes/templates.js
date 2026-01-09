const express = require('express');
const { body, validationResult } = require('express-validator');
const Template = require('../models/Template');
const { protect, admin } = require('../middleware/auth');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const { category, platform, featured, limit } = req.query;

    const query = { isPublished: true };

    if (category) query.category = category;
    if (platform) query.platform = platform;
    if (featured === 'true') query.featured = true;

    let templates = Template.find(query).sort({ order: -1, createdAt: -1 });

    if (limit) {
      templates = templates.limit(parseInt(limit));
    }

    const results = await templates;
    res.json(results);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/admin', protect, async (req, res) => {
  try {
    const templates = await Template.find().sort({ order: -1, createdAt: -1 });
    res.json(templates);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/:slug', async (req, res) => {
  try {
    const template = await Template.findOne({
      slug: req.params.slug,
      isPublished: true
    });

    if (!template) {
      return res.status(404).json({ message: 'Template not found' });
    }

    res.json(template);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/', protect, admin, [
  body('title').notEmpty().withMessage('Title is required'),
  body('description').notEmpty().withMessage('Description is required'),
  body('shortDescription').notEmpty().withMessage('Short description is required'),
  body('featuredImage').notEmpty().withMessage('Featured image is required'),
  body('price').isNumeric().withMessage('Price is required'),
  body('platform').notEmpty().withMessage('Platform is required')
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const template = await Template.create(req.body);
    res.status(201).json(template);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put('/:id', protect, admin, async (req, res) => {
  try {
    const template = await Template.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!template) {
      return res.status(404).json({ message: 'Template not found' });
    }

    res.json(template);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete('/:id', protect, admin, async (req, res) => {
  try {
    const template = await Template.findByIdAndDelete(req.params.id);

    if (!template) {
      return res.status(404).json({ message: 'Template not found' });
    }

    res.json({ message: 'Template removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
