import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { FiArrowRight, FiArrowUpRight, FiMonitor, FiSmartphone, FiSearch, FiZap, FiCode, FiLayers, FiPhone } from 'react-icons/fi';
import SEO from '../components/SEO';
import { projectsAPI } from '../utils/api';
import './Home.css';

const AnimatedText = ({ children, className }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const AnimatedSection = ({ children, className, delay = 0 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
      transition={{ duration: 0.8, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const Counter = ({ end, suffix = "", duration = 2 }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const increment = end / (duration * 60);
      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 1000 / 60);
      return () => clearInterval(timer);
    }
  }, [isInView, end, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
};

const Home = () => {
  const [featuredProjects, setFeaturedProjects] = useState([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.3], [1, 0.95]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const projectsRes = await projectsAPI.getAll({ featured: true, limit: 4 });
        setFeaturedProjects(projectsRes.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        setMousePosition({
          x: (e.clientX - rect.left) / rect.width,
          y: (e.clientY - rect.top) / rect.height,
        });
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const services = [
    {
      icon: <FiCode />,
      title: 'Custom Development',
      description: 'Tailored solutions built from scratch to meet your unique business requirements.',
      gradient: 'gradient-1'
    },
    {
      icon: <FiLayers />,
      title: 'UX/UI Design',
      description: 'User-centered design that creates intuitive and engaging digital experiences.',
      gradient: 'gradient-2'
    },
    {
      icon: <FiMonitor />,
      title: 'Web Applications',
      description: 'Powerful web apps that scale with your business and delight your users.',
      gradient: 'gradient-3'
    },
    {
      icon: <FiSmartphone />,
      title: 'Responsive Design',
      description: 'Pixel-perfect experiences across all devices and screen sizes.',
      gradient: 'gradient-4'
    },
    {
      icon: <FiSearch />,
      title: 'SEO Optimization',
      description: 'Strategic optimization to boost your visibility and organic traffic.',
      gradient: 'gradient-5'
    },
    {
      icon: <FiZap />,
      title: 'Performance',
      description: 'Lightning-fast load times that keep users engaged and conversions high.',
      gradient: 'gradient-6'
    }
  ];

  const stats = [
    { value: 12, suffix: '+', label: 'Years Experience' },
    { value: 150, suffix: '+', label: 'Projects Delivered' },
    { value: 98, suffix: '%', label: 'Client Satisfaction' },
    { value: 50, suffix: '+', label: 'Happy Clients' }
  ];

  const platforms = [
    { name: 'WordPress', logo: '/images/platforms/wordpress.svg' },
    { name: 'Shopify', logo: '/images/platforms/shopify.svg' },
    { name: 'Webflow', logo: '/images/platforms/webflow.svg' },
    { name: 'React', logo: '/images/platforms/react.svg' },
    { name: 'Wix', logo: '/images/platforms/wix.svg' }
  ];

  return (
    <>
      <SEO
        title="Custom Web Development & UX Design"
        description="SilverFox Media builds exceptional websites with over 12 years of experience in UX design, web development, and SEO. Get a user-first, mobile-responsive website that drives results."
        keywords="web development, UX design, custom websites, SEO, Dallas web design, Texas web development"
        url="/"
      />

      {/* HERO SECTION */}
      <motion.section
        ref={heroRef}
        className="hero"
        style={{ opacity: heroOpacity, scale: heroScale }}
      >
        <div className="hero__bg">
          <div
            className="hero__gradient-orb hero__gradient-orb--1"
            style={{
              transform: `translate(${mousePosition.x * 30}px, ${mousePosition.y * 30}px)`
            }}
          />
          <div
            className="hero__gradient-orb hero__gradient-orb--2"
            style={{
              transform: `translate(${mousePosition.x * -20}px, ${mousePosition.y * -20}px)`
            }}
          />
          <div className="hero__grid-overlay" />
        </div>

        <div className="hero__content container">
          <motion.div
            className="hero__text"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <motion.p
              className="hero__label"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              Dallas-Fort Worth Web Agency
            </motion.p>

            <h1 className="hero__title">
              <motion.span
                className="hero__title-line"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
              >
                We Build
              </motion.span>
              <motion.span
                className="hero__title-line hero__title-line--accent"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              >
                Digital Experiences
              </motion.span>
              <motion.span
                className="hero__title-line"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.8 }}
              >
                That Convert
              </motion.span>
            </h1>

            <motion.p
              className="hero__subtitle"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.6 }}
            >
              Custom web development with a user-first approach. Over 12 years of experience
              crafting mobile-responsive websites that drive real business results.
            </motion.p>

            <motion.div
              className="hero__cta"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 0.6 }}
            >
              <Link to="/contact" className="btn-glow">
                <span>Start Your Project</span>
                <FiArrowRight />
              </Link>
              <Link to="/portfolio" className="btn-outline-glow">
                <span>View Our Work</span>
                <FiArrowUpRight />
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            className="hero__visual"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            <div className="hero__device-mockup">
              <img
                src="/images/artboard-devices.webp"
                alt="Website mockup on devices"
                className="hero__mockup-image"
              />
              <div className="hero__device-glow" />
            </div>
          </motion.div>
        </div>

        <motion.div
          className="hero__scroll-indicator"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.6 }}
        >
          <span>Scroll to explore</span>
          <div className="hero__scroll-line">
            <div className="hero__scroll-dot" />
          </div>
        </motion.div>
      </motion.section>

      {/* STATS BAR */}
      <section className="stats-bar">
        <div className="container">
          <div className="stats-bar__grid">
            {stats.map((stat, index) => (
              <AnimatedSection key={stat.label} delay={index * 0.1} className="stats-bar__item">
                <span className="stats-bar__value">
                  <Counter end={stat.value} suffix={stat.suffix} />
                </span>
                <span className="stats-bar__label">{stat.label}</span>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES SECTION */}
      <section className="services">
        <div className="services__bg-gradient" />
        <div className="container">
          <AnimatedText className="section-header">
            <p className="section-label">What We Do</p>
            <h2 className="section-title">
              Services That <span className="text-gradient">Drive Growth</span>
            </h2>
            <p className="section-subtitle">
              We combine strategy, design, and technology to create digital experiences
              that help businesses thrive in the modern landscape.
            </p>
          </AnimatedText>

          <div className="services__grid">
            {services.map((service, index) => (
              <AnimatedSection key={service.title} delay={index * 0.1}>
                <div className={`service-card service-card--${service.gradient}`}>
                  <div className="service-card__icon">
                    {service.icon}
                  </div>
                  <h3 className="service-card__title">{service.title}</h3>
                  <p className="service-card__description">{service.description}</p>
                  <div className="service-card__hover-bg" />
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT/EXPERIENCE SECTION */}
      <section className="experience">
        <div className="container">
          <div className="experience__grid">
            <AnimatedSection className="experience__content">
              <p className="section-label">Why Choose Us</p>
              <h2 className="section-title">
                12+ Years of Building <span className="text-gradient">Exceptional</span> Websites
              </h2>
              <p className="experience__text">
                At SilverFox Media, we don't just build websites—we craft digital experiences
                that elevate brands and drive measurable results. Our user-first approach
                combines proven UX design processes with cutting-edge development.
              </p>
              <p className="experience__text">
                From startups to established enterprises, we partner with businesses
                ready to make their mark online. Every project receives our full attention,
                strategic thinking, and technical excellence.
              </p>

              <div className="experience__features">
                <div className="experience__feature">
                  <div className="experience__feature-icon">
                    <FiZap />
                  </div>
                  <div>
                    <h4>Lightning Fast</h4>
                    <p>Optimized for Core Web Vitals</p>
                  </div>
                </div>
                <div className="experience__feature">
                  <div className="experience__feature-icon">
                    <FiSearch />
                  </div>
                  <div>
                    <h4>SEO Ready</h4>
                    <p>Built for search visibility</p>
                  </div>
                </div>
                <div className="experience__feature">
                  <div className="experience__feature-icon">
                    <FiSmartphone />
                  </div>
                  <div>
                    <h4>Mobile First</h4>
                    <p>Responsive on all devices</p>
                  </div>
                </div>
                <div className="experience__feature">
                  <div className="experience__feature-icon">
                    <FiCode />
                  </div>
                  <div>
                    <h4>Clean Code</h4>
                    <p>Scalable architecture</p>
                  </div>
                </div>
              </div>

              <Link to="/contact" className="btn-glow">
                <span>Let's Talk</span>
                <FiArrowRight />
              </Link>
            </AnimatedSection>

            <AnimatedSection className="experience__visual" delay={0.2}>
              <div className="experience__image-stack">
                <div className="experience__image-card experience__image-card--1">
                  <img src="/images/ux-design-process.jpg" alt="UX Design Process" />
                </div>
                <div className="experience__image-card experience__image-card--2">
                  <img src="/images/web-development.jpg" alt="Web Development" />
                </div>
                <div className="experience__floating-card">
                  <span className="experience__floating-icon">
                    <FiZap />
                  </span>
                  <span>100% Custom Built</span>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* PORTFOLIO SECTION */}
      <section className="portfolio-section">
        <div className="portfolio-section__bg" />
        <div className="container">
          <AnimatedText className="section-header">
            <p className="section-label">Our Work</p>
            <h2 className="section-title">
              Featured <span className="text-gradient">Projects</span>
            </h2>
          </AnimatedText>

          <div className="portfolio-grid">
            {/* Hardcoded Portfolio Projects */}
            {[
              {
                id: 1,
                title: 'Pagomigo',
                category: 'Web Application',
                image: '/images/portfolio/pagomigo.webp',
                url: 'https://www.pagomigo.com/'
              },
              {
                id: 2,
                title: 'Grace to Change',
                category: 'Non-Profit',
                image: '/images/portfolio/gracetochange.webp',
                url: 'https://gracetochange.org/'
              },
              {
                id: 3,
                title: 'NTX Luxury Van Rentals',
                category: 'Transportation',
                image: '/images/portfolio/ntxvanrentals.webp',
                url: 'https://ntxluxuryvanrentals.com/'
              },
              {
                id: 4,
                title: 'GymCrush',
                category: 'Dating App',
                image: '/images/portfolio/gymcrush.webp',
                url: 'https://gymcrush.io/'
              },
            ].map((project, index) => (
              <AnimatedSection key={project.id} delay={index * 0.15}>
                <a href={project.url} target="_blank" rel="noopener noreferrer" className="portfolio-card">
                  <div className="portfolio-card__image">
                    <img src={project.image} alt={project.title} />
                    <div className="portfolio-card__overlay">
                      <span className="portfolio-card__view">
                        View Project <FiArrowUpRight />
                      </span>
                    </div>
                  </div>
                  <div className="portfolio-card__content">
                    <h3 className="portfolio-card__title">{project.title}</h3>
                    <p className="portfolio-card__category">{project.category}</p>
                  </div>
                </a>
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection className="portfolio-section__cta">
            <Link to="/portfolio" className="btn-outline-glow btn-outline-glow--light">
              <span>View All Projects</span>
              <FiArrowRight />
            </Link>
          </AnimatedSection>
        </div>
      </section>

      {/* PLATFORMS SECTION */}
      <section className="platforms">
        <div className="container">
          <AnimatedText className="section-header section-header--center">
            <p className="section-label">Platforms</p>
            <h2 className="section-title">Technologies We Master</h2>
          </AnimatedText>

          <div className="platforms__grid">
            {platforms.map((platform, index) => (
              <AnimatedSection key={platform.name} delay={index * 0.1} className="platforms__item">
                <img src={platform.logo} alt={platform.name} />
                <span>{platform.name}</span>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="cta-section">
        <div className="cta-section__bg">
          <div className="cta-section__gradient-1" />
          <div className="cta-section__gradient-2" />
          <div className="cta-section__grid-overlay" />
        </div>
        <div className="container">
          <AnimatedText className="cta-section__content">
            <h2 className="cta-section__title">
              Ready to Transform Your <span className="text-gradient">Digital Presence</span>?
            </h2>
            <p className="cta-section__text">
              Let's discuss how we can help you build a website that drives real results for your business.
            </p>
            <div className="cta-section__buttons">
              <Link to="/contact" className="btn-glow btn-glow--large">
                <span>Schedule a Consultation</span>
                <FiArrowRight />
              </Link>
              <a href="tel:9728008105" className="btn-phone">
                <FiPhone />
                <span>(972) 800-8105</span>
              </a>
            </div>
          </AnimatedText>
        </div>
      </section>
    </>
  );
};

export default Home;
