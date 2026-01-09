import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowRight, FiCheck, FiCode, FiLayout, FiSearch, FiShoppingCart, FiTool } from 'react-icons/fi';
import SEO from '../components/SEO';
import './Home.css';

const Home = () => {
  const services = [
    {
      icon: <FiCode />,
      title: 'Custom Web Development',
      description: 'Tailored websites built from scratch to meet your unique business needs.'
    },
    {
      icon: <FiLayout />,
      title: 'UX/UI Design',
      description: 'User-centered design that creates intuitive and engaging experiences.'
    },
    {
      icon: <FiShoppingCart />,
      title: 'E-Commerce Solutions',
      description: 'Online stores that convert visitors into customers and drive sales.'
    },
    {
      icon: <FiSearch />,
      title: 'SEO Optimization',
      description: 'Get found online with search engine optimization strategies.'
    },
    {
      icon: <FiTool />,
      title: 'Website Maintenance',
      description: 'Keep your website running smoothly with ongoing support and updates.'
    }
  ];

  const platforms = [
    { name: 'WordPress', logo: '/images/platforms/wordpress.png' },
    { name: 'Webflow', logo: '/images/platforms/webflow.png' },
    { name: 'Shopify', logo: '/images/platforms/shopify.png' },
    { name: 'Wix', logo: '/images/platforms/wix.png' },
    { name: 'Squarespace', logo: '/images/platforms/squarespace.png' }
  ];

  const stats = [
    { number: '12+', label: 'Years Experience' },
    { number: '200+', label: 'Projects Completed' },
    { number: '150+', label: 'Happy Clients' },
    { number: '99%', label: 'Client Satisfaction' }
  ];

  return (
    <>
      <SEO />
      <section
        className="sfm-hero"
        style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/images/artboard-devices.webp)` }}
      >
        <div className="container">
          <motion.div
            className="sfm-hero__content"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="sfm-hero__title">
              <span className="sfm-hero__title-dark">SILVER</span>
              <span className="sfm-hero__title-accent">FOX</span>
              <span className="sfm-hero__title-dark"> MEDIA</span>
            </h1>
            <p className="sfm-hero__subtitle">
              <span className="sfm-hero__subtitle-dark">UX/UI Design </span>
              <span className="sfm-hero__subtitle-accent">& Web Development</span>
            </p>
            <p className="sfm-hero__description">
              We build user-first, mobile-responsive websites that drive results.
              Over 12 years of experience serving businesses in Dallas-Fort Worth and beyond.
            </p>
            <div className="sfm-hero__actions">
              <Link to="/contact" className="btn btn-primary btn-lg">
                Start Your Project
                <FiArrowRight />
              </Link>
              <Link to="/portfolio" className="btn btn-outline btn-lg">
                View Our Work
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="sfm-stats">
        <div className="container">
          <div className="sfm-stats__grid">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                className="sfm-stats__item"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <span className="sfm-stats__number">{stat.number}</span>
                <span className="sfm-stats__label">{stat.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="sfm-services section">
        <div className="container">
          <motion.div
            className="sfm-services__header"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2>Our Services</h2>
            <p>Comprehensive web solutions tailored to your business needs</p>
          </motion.div>
          <div className="sfm-services__grid">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                className="sfm-services__card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="sfm-services__icon">{service.icon}</div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="sfm-platforms section bg-gray">
        <div className="container">
          <motion.div
            className="sfm-platforms__header"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2>Platforms We Work With</h2>
            <p>Expert development across all major website platforms</p>
          </motion.div>
          <div className="sfm-platforms__grid">
            {platforms.map((platform, index) => (
              <motion.div
                key={platform.name}
                className="sfm-platforms__item"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <img src={platform.logo} alt={platform.name} />
                <span>{platform.name}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="sfm-why section">
        <div className="container">
          <div className="sfm-why__content">
            <motion.div
              className="sfm-why__text"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h2>Why Choose SilverFox Media?</h2>
              <p>
                We combine technical expertise with creative design to deliver
                websites that not only look great but also perform exceptionally.
              </p>
              <ul className="sfm-why__list">
                <li>
                  <FiCheck />
                  <span>12+ years of industry experience</span>
                </li>
                <li>
                  <FiCheck />
                  <span>Mobile-first, responsive design</span>
                </li>
                <li>
                  <FiCheck />
                  <span>SEO-optimized from the ground up</span>
                </li>
                <li>
                  <FiCheck />
                  <span>Dedicated project manager</span>
                </li>
                <li>
                  <FiCheck />
                  <span>Ongoing support and maintenance</span>
                </li>
                <li>
                  <FiCheck />
                  <span>Transparent pricing, no hidden fees</span>
                </li>
              </ul>
              <Link to="/contact" className="btn btn-primary">
                Get a Free Quote
                <FiArrowRight />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="sfm-cta">
        <div className="container">
          <motion.div
            className="sfm-cta__content"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2>Ready to Start Your Project?</h2>
            <p>
              Let's discuss how we can help bring your vision to life.
              Schedule a free consultation today.
            </p>
            <div className="sfm-cta__actions">
              <Link to="/contact" className="btn btn-primary btn-lg">
                Schedule Consultation
              </Link>
              <a href="tel:9728008105" className="btn btn-outline btn-lg">
                Call (972) 800-8105
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Home;
