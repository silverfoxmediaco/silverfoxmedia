import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowLeft, FiExternalLink, FiCalendar, FiUser } from 'react-icons/fi';
import SEO from '../components/SEO';
import { projectsAPI } from '../utils/api';
import './ProjectDetail.css';

const ProjectDetail = () => {
  const { slug } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const { data } = await projectsAPI.getBySlug(slug);
        setProject(data);
      } catch (err) {
        setError('Project not found');
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [slug]);

  if (loading) {
    return (
      <div className="sfm-loading-screen">
        <div className="sfm-loading-spinner"></div>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="sfm-project-error section">
        <div className="container text-center">
          <h1>Project Not Found</h1>
          <p>The project you're looking for doesn't exist.</p>
          <Link to="/portfolio" className="btn btn-primary">
            <FiArrowLeft />
            Back to Portfolio
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <SEO
        title={project.title}
        description={project.shortDescription}
        image={project.featuredImage}
        url={`/portfolio/${project.slug}`}
      />

      <section className="sfm-project-hero">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link to="/portfolio" className="sfm-project-hero__back">
              <FiArrowLeft />
              Back to Portfolio
            </Link>
            <span className="sfm-project-hero__category">{project.category}</span>
            <h1>{project.title}</h1>
            <p>{project.shortDescription}</p>
          </motion.div>
        </div>
      </section>

      <section className="sfm-project section">
        <div className="container">
          <div className="sfm-project__content">
            <motion.div
              className="sfm-project__main"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <img
                src={project.featuredImage}
                alt={project.title}
                className="sfm-project__featured-image"
              />
              <div className="sfm-project__description">
                <h2>About This Project</h2>
                <div dangerouslySetInnerHTML={{ __html: project.description }} />
              </div>

              {project.images && project.images.length > 0 && (
                <div className="sfm-project__gallery">
                  <h2>Project Gallery</h2>
                  <div className="sfm-project__gallery-grid">
                    {project.images.map((image, index) => (
                      <img key={index} src={image} alt={`${project.title} screenshot ${index + 1}`} />
                    ))}
                  </div>
                </div>
              )}
            </motion.div>

            <motion.aside
              className="sfm-project__sidebar"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="sfm-project__meta-card">
                <h3>Project Details</h3>
                {project.client && (
                  <div className="sfm-project__meta-item">
                    <FiUser />
                    <div>
                      <span className="sfm-project__meta-label">Client</span>
                      <span className="sfm-project__meta-value">{project.client}</span>
                    </div>
                  </div>
                )}
                {project.completedDate && (
                  <div className="sfm-project__meta-item">
                    <FiCalendar />
                    <div>
                      <span className="sfm-project__meta-label">Completed</span>
                      <span className="sfm-project__meta-value">
                        {new Date(project.completedDate).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long'
                        })}
                      </span>
                    </div>
                  </div>
                )}
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary sfm-project__live-btn"
                  >
                    <FiExternalLink />
                    View Live Site
                  </a>
                )}
              </div>

              {project.technologies && project.technologies.length > 0 && (
                <div className="sfm-project__tech-card">
                  <h3>Technologies Used</h3>
                  <div className="sfm-project__tech-list">
                    {project.technologies.map((tech) => (
                      <span key={tech} className="sfm-project__tech-tag">{tech}</span>
                    ))}
                  </div>
                </div>
              )}

              <div className="sfm-project__cta-card">
                <h3>Start Your Project</h3>
                <p>Ready to create something amazing? Let's talk about your project.</p>
                <Link to="/contact" className="btn btn-primary">
                  Get a Free Quote
                </Link>
              </div>
            </motion.aside>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProjectDetail;
