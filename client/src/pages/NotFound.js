import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiHome, FiArrowRight } from 'react-icons/fi';
import SEO from '../components/SEO';
import './NotFound.css';

const NotFound = () => {
  return (
    <>
      <SEO title="Page Not Found" />

      <section className="sfm-notfound">
        <div className="container">
          <motion.div
            className="sfm-notfound__content"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="sfm-notfound__title">404</h1>
            <h2>Page Not Found</h2>
            <p>
              The page you're looking for doesn't exist or has been moved.
            </p>
            <div className="sfm-notfound__actions">
              <Link to="/" className="btn btn-primary">
                <FiHome />
                Back to Home
              </Link>
              <Link to="/contact" className="btn btn-outline">
                Contact Us
                <FiArrowRight />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default NotFound;
