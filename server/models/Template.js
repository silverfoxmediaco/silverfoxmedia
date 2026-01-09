const mongoose = require('mongoose');

const templateSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Template title is required']
  },
  slug: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
    required: [true, 'Template description is required']
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
  previewUrl: {
    type: String
  },
  price: {
    type: Number,
    required: [true, 'Price is required']
  },
  salePrice: {
    type: Number
  },
  category: {
    type: String,
    enum: ['apartment', 'auto-dealer', 'business', 'ecommerce', 'portfolio', 'other'],
    default: 'business'
  },
  platform: {
    type: String,
    enum: ['wordpress', 'webflow', 'shopify', 'wix', 'squarespace', 'react'],
    required: true
  },
  features: [{
    type: String
  }],
  stripeProductId: {
    type: String
  },
  stripePriceId: {
    type: String
  },
  downloadUrl: {
    type: String
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
  },
  salesCount: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

templateSchema.pre('save', function(next) {
  if (!this.slug) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');
  }
  next();
});

templateSchema.index({ slug: 1 });
templateSchema.index({ isPublished: 1, category: 1 });

module.exports = mongoose.model('Template', templateSchema);
