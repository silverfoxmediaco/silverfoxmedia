import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiExternalLink } from 'react-icons/fi';
import SEO from '../components/SEO';
import { projectsAPI } from '../utils/api';
import './Portfolio.css';

const Portfolio = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  const categories = [
    { value: 'all', label: 'All Projects' },
    { value: 'website', label: 'Websites' },
    { value: 'ecommerce', label: 'E-Commerce' },
    { value: 'webapp', label: 'Web Apps' },
    { value: 'redesign', label: 'Redesigns' }
  ];

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const params = filter !== 'all' ? { category: filter } : {};
        const { data } = await projectsAPI.getAll(params);
        setProjects(data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [filter]);

  return (
    <>
      <SEO
        title="Completed Projects"
        description="View our portfolio of completed web development projects. Custom websites, e-commerce stores, and web applications for businesses of all sizes."
        url="/portfolio"
      />

      <section className="sfm-portfolio-hero">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1>Completed Projects</h1>
            <p>Explore our portfolio of successful web development projects</p>
          </motion.div>
        </div>
      </section>

      <section className="sfm-portfolio section">
        <div className="container">
          <div className="sfm-portfolio__filters">
            {categories.map((cat) => (
              <button
                key={cat.value}
                className={`sfm-portfolio__filter ${filter === cat.value ? 'sfm-portfolio__filter--active' : ''}`}
                onClick={() => setFilter(cat.value)}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="sfm-loading-screen">
              <div className="sfm-loading-spinner"></div>
            </div>
          ) : projects.length === 0 ? (
            <div className="sfm-portfolio__empty">
              <p>No projects found. Check back soon!</p>
            </div>
          ) : (
            <div className="sfm-portfolio__grid">
              {projects.map((project, index) => (
                <motion.div
                  key={project._id}
                  className="sfm-portfolio__card"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="sfm-portfolio__image">
                    <img src={project.featuredImage} alt={project.title} />
                    <div className="sfm-portfolio__overlay">
                      <Link to={`/portfolio/${project.slug}`} className="btn btn-primary">
                        View Project
                      </Link>
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-outline"
                        >
                          <FiExternalLink />
                          Live Site
                        </a>
                      )}
                    </div>
                  </div>
                  <div className="sfm-portfolio__info">
                    <span className="sfm-portfolio__category">{project.category}</span>
                    <h3>{project.title}</h3>
                    <p>{project.shortDescription}</p>
                    {project.technologies && project.technologies.length > 0 && (
                      <div className="sfm-portfolio__tech">
                        {project.technologies.slice(0, 4).map((tech) => (
                          <span key={tech} className="sfm-portfolio__tech-tag">{tech}</span>
                        ))}
                      </div>
                    )}
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

export default Portfolio;
