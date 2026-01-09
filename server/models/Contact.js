const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required']
  },
  email: {
    type: String,
    required: [true, 'Email is required']
  },
  phone: {
    type: String
  },
  company: {
    type: String
  },
  projectType: {
    type: String,
    enum: ['new-website', 'redesign', 'ecommerce', 'seo', 'maintenance', 'other'],
    default: 'new-website'
  },
  budget: {
    type: String,
    enum: ['under-5k', '5k-10k', '10k-25k', '25k-plus', 'not-sure'],
    default: 'not-sure'
  },
  timeline: {
    type: String
  },
  message: {
    type: String,
    required: [true, 'Message is required']
  },
  preferredDate: {
    type: Date
  },
  preferredTime: {
    type: String
  },
  source: {
    type: String,
    default: 'website'
  },
  status: {
    type: String,
    enum: ['new', 'contacted', 'qualified', 'proposal', 'closed-won', 'closed-lost'],
    default: 'new'
  },
  notes: {
    type: String
  },
  isRead: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

contactSchema.index({ status: 1, createdAt: -1 });
contactSchema.index({ isRead: 1 });

module.exports = mongoose.model('Contact', contactSchema);
