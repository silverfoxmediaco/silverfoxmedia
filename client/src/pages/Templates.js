import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiEye, FiShoppingCart } from 'react-icons/fi';
import SEO from '../components/SEO';
import { templatesAPI } from '../utils/api';
import './Templates.css';

const Templates = () => {
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [platformFilter, setPlatformFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const platforms = [
    { value: 'all', label: 'All Platforms' },
    { value: 'wordpress', label: 'WordPress' },
    { value: 'webflow', label: 'Webflow' },
    { value: 'shopify', label: 'Shopify' },
    { value: 'wix', label: 'Wix' },
    { value: 'squarespace', label: 'Squarespace' },
    { value: 'react', label: 'React' }
  ];

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'business', label: 'Business' },
    { value: 'ecommerce', label: 'E-Commerce' },
    { value: 'portfolio', label: 'Portfolio' },
    { value: 'apartment', label: 'Apartment' },
    { value: 'auto-dealer', label: 'Auto Dealer' },
    { value: 'other', label: 'Other' }
  ];

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const params = {};
        if (platformFilter !== 'all') params.platform = platformFilter;
        if (categoryFilter !== 'all') params.category = categoryFilter;
        const { data } = await templatesAPI.getAll(params);
        setTemplates(data);
      } catch (error) {
        console.error('Error fetching templates:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTemplates();
  }, [platformFilter, categoryFilter]);

  const formatPrice = (price, salePrice) => {
    if (salePrice && salePrice < price) {
      return (
        <>
          <span className="sfm-templates__price--original">${price}</span>
          <span className="sfm-templates__price--sale">${salePrice}</span>
        </>
      );
    }
    return <span>${price}</span>;
  };

  return (
    <>
      <SEO
        title="Website Templates"
        description="Browse our collection of premium website templates for WordPress, Webflow, Shopify, and more. Ready-to-use designs for your business."
        url="/templates"
      />

      <section className="sfm-templates-hero">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1>Website Templates</h1>
            <p>Premium templates to kickstart your web project</p>
          </motion.div>
        </div>
      </section>

      <section className="sfm-templates section">
        <div className="container">
          <div className="sfm-templates__filters">
            <div className="sfm-templates__filter-group">
              <label>Platform:</label>
              <select
                value={platformFilter}
                onChange={(e) => setPlatformFilter(e.target.value)}
                className="sfm-templates__select"
              >
                {platforms.map((p) => (
                  <option key={p.value} value={p.value}>{p.label}</option>
                ))}
              </select>
            </div>
            <div className="sfm-templates__filter-group">
              <label>Category:</label>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="sfm-templates__select"
              >
                {categories.map((c) => (
                  <option key={c.value} value={c.value}>{c.label}</option>
                ))}
              </select>
            </div>
          </div>

          {loading ? (
            <div className="sfm-loading-screen">
              <div className="sfm-loading-spinner"></div>
            </div>
          ) : templates.length === 0 ? (
            <div className="sfm-templates__empty">
              <p>No templates found. Check back soon!</p>
            </div>
          ) : (
            <div className="sfm-templates__grid">
              {templates.map((template, index) => (
                <motion.div
                  key={template._id}
                  className="sfm-templates__card"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="sfm-templates__image">
                    <img src={template.featuredImage} alt={template.title} />
                    <div className="sfm-templates__overlay">
                      {template.previewUrl && (
                        <a
                          href={template.previewUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-outline"
                        >
                          <FiEye />
                          Preview
                        </a>
                      )}
                      <Link to={`/templates/${template.slug}`} className="btn btn-primary">
                        <FiShoppingCart />
                        Details
                      </Link>
                    </div>
                    {template.salePrice && template.salePrice < template.price && (
                      <span className="sfm-templates__badge">Sale</span>
                    )}
                  </div>
                  <div className="sfm-templates__info">
                    <div className="sfm-templates__meta">
                      <span className="sfm-templates__platform">{template.platform}</span>
                      <span className="sfm-templates__category">{template.category}</span>
                    </div>
                    <h3>{template.title}</h3>
                    <p>{template.shortDescription}</p>
                    <div className="sfm-templates__price">
                      {formatPrice(template.price, template.salePrice)}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Templates;
