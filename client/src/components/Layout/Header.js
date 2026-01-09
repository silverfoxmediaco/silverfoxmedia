import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FiMenu, FiX, FiPhone } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import './Header.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMenuOpen]);

  const navLinks = [
    { to: '/portfolio', label: 'Completed Projects' },
    { to: '/templates', label: 'Website Templates' },
    { to: '/blog', label: 'Blog' },
    { to: '/contact', label: 'Contact Us' }
  ];

  return (
    <header className={`sfm-header ${isScrolled ? 'sfm-header--scrolled' : ''}`}>
      <div className="sfm-header__container container">
        <Link to="/" className="sfm-header__logo">
          <img
            src="/images/silverfox-logo.webp"
            alt="SilverFox Media"
            className="sfm-header__logo-image"
          />
        </Link>

        <a href="tel:9728008105" className="sfm-header__phone">
          <FiPhone />
          <span>(972) 800-8105</span>
        </a>

        <nav className="sfm-header__nav sfm-header__nav--desktop">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `sfm-header__nav-link ${isActive ? 'sfm-header__nav-link--active' : ''}`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <button
          className="sfm-header__menu-toggle"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="sfm-header__mobile-menu"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <nav className="sfm-header__nav sfm-header__nav--mobile">
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) =>
                    `sfm-header__nav-link ${isActive ? 'sfm-header__nav-link--active' : ''}`
                  }
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </NavLink>
              ))}
            </nav>
            <a href="tel:9728008105" className="sfm-header__mobile-phone btn btn-primary">
              <FiPhone />
              <span>Call (972) 800-8105</span>
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
