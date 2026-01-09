import React from 'react';
import { Link } from 'react-router-dom';
import { FiPhone, FiMail, FiMapPin } from 'react-icons/fi';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="sfm-footer">
      <div className="sfm-footer__main container">
        <div className="sfm-footer__brand">
          <Link to="/" className="sfm-footer__logo">
            <img
              src="/images/silverfox-logo.webp"
              alt="SilverFox Media"
              className="sfm-footer__logo-image"
            />
          </Link>
          <p className="sfm-footer__tagline">
            UX/UI Design & Web Development
          </p>
        </div>

        <div className="sfm-footer__links">
          <h4 className="sfm-footer__heading">Quick Links</h4>
          <nav className="sfm-footer__nav">
            <Link to="/portfolio">Completed Projects</Link>
            <Link to="/templates">Website Templates</Link>
            <Link to="/blog">Blog</Link>
            <Link to="/contact">Contact Us</Link>
          </nav>
        </div>

        <div className="sfm-footer__services">
          <h4 className="sfm-footer__heading">Services</h4>
          <ul className="sfm-footer__list">
            <li>Custom Website Development</li>
            <li>UX/UI Design</li>
            <li>E-Commerce Solutions</li>
            <li>SEO Optimization</li>
            <li>Website Maintenance</li>
          </ul>
        </div>

        <div className="sfm-footer__contact">
          <h4 className="sfm-footer__heading">Contact</h4>
          <div className="sfm-footer__contact-items">
            <a href="tel:9728008105" className="sfm-footer__contact-item">
              <FiPhone />
              <span>(972) 800-8105</span>
            </a>
            <a href="mailto:information@silverfoxmedia.co" className="sfm-footer__contact-item">
              <FiMail />
              <span>information@silverfoxmedia.co</span>
            </a>
            <div className="sfm-footer__contact-item">
              <FiMapPin />
              <span>Dallas-Fort Worth, Texas</span>
            </div>
          </div>
        </div>
      </div>

      <div className="sfm-footer__bottom">
        <div className="container">
          <p className="sfm-footer__copyright">
            &copy; {currentYear} SilverFox Media. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
