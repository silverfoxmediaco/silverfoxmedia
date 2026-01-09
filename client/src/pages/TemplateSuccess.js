import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiCheck, FiDownload, FiArrowRight } from 'react-icons/fi';
import SEO from '../components/SEO';
import { stripeAPI } from '../utils/api';
import './TemplateSuccess.css';

const TemplateSuccess = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [sessionData, setSessionData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSession = async () => {
      if (sessionId) {
        try {
          const { data } = await stripeAPI.getSession(sessionId);
          setSessionData(data);
        } catch (error) {
          console.error('Error fetching session:', error);
        }
      }
      setLoading(false);
    };

    fetchSession();
  }, [sessionId]);

  if (loading) {
    return (
      <div className="sfm-loading-screen">
        <div className="sfm-loading-spinner"></div>
      </div>
    );
  }

  return (
    <>
      <SEO title="Purchase Successful" />

      <section className="sfm-success section">
        <div className="container">
          <motion.div
            className="sfm-success__content"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="sfm-success__icon">
              <FiCheck />
            </div>

            <h1>Thank You for Your Purchase!</h1>
            <p className="sfm-success__message">
              Your order has been confirmed and you should receive an email with your receipt shortly.
            </p>

            {sessionData?.template && (
              <div className="sfm-success__template">
                <h2>Your Template</h2>
                <div className="sfm-success__template-card">
                  <img src={sessionData.template.featuredImage} alt={sessionData.template.title} />
                  <div className="sfm-success__template-info">
                    <h3>{sessionData.template.title}</h3>
                    <p>{sessionData.template.shortDescription}</p>
                    {sessionData.downloadUrl && (
                      <a
                        href={sessionData.downloadUrl}
                        className="btn btn-primary"
                        download
                      >
                        <FiDownload />
                        Download Template
                      </a>
                    )}
                  </div>
                </div>
              </div>
            )}

            <div className="sfm-success__actions">
              <Link to="/templates" className="btn btn-outline">
                Browse More Templates
              </Link>
              <Link to="/contact" className="btn btn-primary">
                Need Customization?
                <FiArrowRight />
              </Link>
            </div>

            <div className="sfm-success__support">
              <p>
                Need help with your template? Our team is here to assist you.
              </p>
              <p>
                Contact us at <a href="mailto:information@silverfoxmedia.co">information@silverfoxmedia.co</a> or call <a href="tel:9728008105">(972) 800-8105</a>
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default TemplateSuccess;
