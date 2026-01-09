import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowLeft, FiEye, FiShoppingCart, FiCheck } from 'react-icons/fi';
import { toast } from 'react-toastify';
import SEO from '../components/SEO';
import { templatesAPI, stripeAPI } from '../utils/api';
import './TemplateDetail.css';

const TemplateDetail = () => {
  const { slug } = useParams();
  const [template, setTemplate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [purchasing, setPurchasing] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTemplate = async () => {
      try {
        const { data } = await templatesAPI.getBySlug(slug);
        setTemplate(data);
      } catch (err) {
        setError('Template not found');
      } finally {
        setLoading(false);
      }
    };

    fetchTemplate();
  }, [slug]);

  const handlePurchase = async () => {
    setPurchasing(true);
    try {
      const { data } = await stripeAPI.createCheckoutSession(template._id);
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (err) {
      toast.error('Error creating checkout session. Please try again.');
      setPurchasing(false);
    }
  };

  if (loading) {
    return (
      <div className="sfm-loading-screen">
        <div className="sfm-loading-spinner"></div>
      </div>
    );
  }

  if (error || !template) {
    return (
      <div className="sfm-template-error section">
        <div className="container text-center">
          <h1>Template Not Found</h1>
          <p>The template you're looking for doesn't exist.</p>
          <Link to="/templates" className="btn btn-primary">
            <FiArrowLeft />
            Back to Templates
          </Link>
        </div>
      </div>
    );
  }

  const displayPrice = template.salePrice || template.price;

  return (
    <>
      <SEO
        title={template.title}
        description={template.shortDescription}
        image={template.featuredImage}
        url={`/templates/${template.slug}`}
      />

      <section className="sfm-template-hero">
        <div className="container">
          <Link to="/templates" className="sfm-template-hero__back">
            <FiArrowLeft />
            Back to Templates
          </Link>
        </div>
      </section>

      <section className="sfm-template section">
        <div className="container">
          <div className="sfm-template__content">
            <motion.div
              className="sfm-template__main"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <img
                src={template.featuredImage}
                alt={template.title}
                className="sfm-template__featured-image"
              />

              <div className="sfm-template__description">
                <h2>Description</h2>
                <div dangerouslySetInnerHTML={{ __html: template.description }} />
              </div>

              {template.features && template.features.length > 0 && (
                <div className="sfm-template__features">
                  <h2>Features</h2>
                  <ul className="sfm-template__features-list">
                    {template.features.map((feature, index) => (
                      <li key={index}>
                        <FiCheck />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {template.images && template.images.length > 0 && (
                <div className="sfm-template__gallery">
                  <h2>Screenshots</h2>
                  <div className="sfm-template__gallery-grid">
                    {template.images.map((image, index) => (
                      <img key={index} src={image} alt={`${template.title} screenshot ${index + 1}`} />
                    ))}
                  </div>
                </div>
              )}
            </motion.div>

            <motion.aside
              className="sfm-template__sidebar"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="sfm-template__purchase-card">
                <div className="sfm-template__meta">
                  <span className="sfm-template__platform">{template.platform}</span>
                  <span className="sfm-template__category">{template.category}</span>
                </div>
                <h1>{template.title}</h1>
                <p className="sfm-template__short-desc">{template.shortDescription}</p>

                <div className="sfm-template__price-display">
                  {template.salePrice && template.salePrice < template.price ? (
                    <>
                      <span className="sfm-template__price--original">${template.price}</span>
                      <span className="sfm-template__price--current">${template.salePrice}</span>
                    </>
                  ) : (
                    <span className="sfm-template__price--current">${template.price}</span>
                  )}
                </div>

                <button
                  className="btn btn-primary sfm-template__buy-btn"
                  onClick={handlePurchase}
                  disabled={purchasing}
                >
                  {purchasing ? (
                    'Processing...'
                  ) : (
                    <>
                      <FiShoppingCart />
                      Buy Now - ${displayPrice}
                    </>
                  )}
                </button>

                {template.previewUrl && (
                  <a
                    href={template.previewUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline sfm-template__preview-btn"
                  >
                    <FiEye />
                    Live Preview
                  </a>
                )}
              </div>

              <div className="sfm-template__support-card">
                <h3>Need Help?</h3>
                <p>Our team can help you customize this template for your business.</p>
                <Link to="/contact" className="btn btn-dark">
                  Contact Us
                </Link>
              </div>
            </motion.aside>
          </div>
        </div>
      </section>
    </>
  );
};

export default TemplateDetail;
