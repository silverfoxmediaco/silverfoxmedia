const express = require('express');
const { body, validationResult } = require('express-validator');
const nodemailer = require('nodemailer');
const Contact = require('../models/Contact');
const { protect, admin } = require('../middleware/auth');

const router = express.Router();

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

router.post('/', [
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('message').notEmpty().withMessage('Message is required')
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const contact = await Contact.create(req.body);

    const mailOptions = {
      from: process.env.SMTP_FROM || 'noreply@silverfoxmedia.co',
      to: process.env.CONTACT_EMAIL || 'information@silverfoxmedia.co',
      subject: `New Contact Form Submission - ${contact.name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${contact.name}</p>
        <p><strong>Email:</strong> ${contact.email}</p>
        <p><strong>Phone:</strong> ${contact.phone || 'Not provided'}</p>
        <p><strong>Company:</strong> ${contact.company || 'Not provided'}</p>
        <p><strong>Project Type:</strong> ${contact.projectType || 'Not specified'}</p>
        <p><strong>Budget:</strong> ${contact.budget || 'Not specified'}</p>
        <p><strong>Preferred Date:</strong> ${contact.preferredDate || 'Not specified'}</p>
        <p><strong>Preferred Time:</strong> ${contact.preferredTime || 'Not specified'}</p>
        <hr>
        <p><strong>Message:</strong></p>
        <p>${contact.message}</p>
      `
    };

    if (process.env.SMTP_HOST) {
      await transporter.sendMail(mailOptions);
    }

    res.status(201).json({
      message: 'Thank you for your message. We will get back to you soon!',
      contact
    });
  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({ message: 'Error submitting form. Please try again.' });
  }
});

router.get('/', protect, async (req, res) => {
  try {
    const { status, limit, page = 1 } = req.query;
    const pageSize = parseInt(limit) || 20;

    const query = {};
    if (status) query.status = status;

    const count = await Contact.countDocuments(query);
    const contacts = await Contact.find(query)
      .sort({ createdAt: -1 })
      .limit(pageSize)
      .skip(pageSize * (page - 1));

    res.json({
      contacts,
      page: parseInt(page),
      pages: Math.ceil(count / pageSize),
      total: count
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/stats', protect, async (req, res) => {
  try {
    const total = await Contact.countDocuments();
    const newLeads = await Contact.countDocuments({ status: 'new' });
    const unread = await Contact.countDocuments({ isRead: false });

    const byStatus = await Contact.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } }
    ]);

    res.json({ total, newLeads, unread, byStatus });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/:id', protect, async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    if (!contact.isRead) {
      contact.isRead = true;
      await contact.save();
    }

    res.json(contact);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put('/:id', protect, async (req, res) => {
  try {
    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    res.json(contact);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete('/:id', protect, admin, async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);

    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    res.json({ message: 'Contact removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
