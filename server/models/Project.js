const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Project title is required']
  },
  slug: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
    required: [true, 'Project description is required']
  },
  shortDescription: {
    type: String,
    required: [true, 'Short description is required'],
    maxlength: 200
  },
  featuredImage: {
    type: String,
    required: [true, 'Featured image is required']
  },
  images: [{
    type: String
  }],
  liveUrl: {
    type: String
  },
  technologies: [{
    type: String
  }],
  category: {
    type: String,
    enum: ['website', 'ecommerce', 'webapp', 'redesign'],
    default: 'website'
  },
  client: {
    type: String
  },
  completedDate: {
    type: Date
  },
  featured: {
    type: Boolean,
    default: false
  },
  order: {
    type: Number,
    default: 0
  },
  seo: {
    metaTitle: String,
    metaDescription: String,
    keywords: [String]
  },
  isPublished: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

projectSchema.pre('save', function(next) {
  if (!this.slug) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');
  }
  next();
});

projectSchema.index({ isPublished: 1, order: -1 });

module.exports = mongoose.model('Project', projectSchema);
