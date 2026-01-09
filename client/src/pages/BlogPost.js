import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowLeft, FiCalendar, FiUser, FiEye, FiTag } from 'react-icons/fi';
import SEO from '../components/SEO';
import { blogAPI } from '../utils/api';
import './BlogPost.css';

const BlogPost = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const categoryLabels = {
    'web-development': 'Web Development',
    'ux-design': 'UX Design',
    'seo': 'SEO',
    'marketing': 'Marketing',
    'tutorials': 'Tutorials',
    'news': 'News'
  };

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const { data } = await blogAPI.getBySlug(slug);
        setPost(data);
      } catch (err) {
        setError('Post not found');
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  if (loading) {
    return (
      <div className="sfm-loading-screen">
        <div className="sfm-loading-spinner"></div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="sfm-blogpost-error section">
        <div className="container text-center">
          <h1>Post Not Found</h1>
          <p>The blog post you're looking for doesn't exist.</p>
          <Link to="/blog" className="btn btn-primary">
            <FiArrowLeft />
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <SEO
        title={post.title}
        description={post.excerpt}
        image={post.featuredImage}
        url={`/blog/${post.slug}`}
        type="article"
      />

      <article className="sfm-blogpost">
        <section className="sfm-blogpost__hero">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Link to="/blog" className="sfm-blogpost__back">
                <FiArrowLeft />
                Back to Blog
              </Link>
              <span className="sfm-blogpost__category">
                {categoryLabels[post.category] || post.category}
              </span>
              <h1>{post.title}</h1>
              <div className="sfm-blogpost__meta">
                <span className="sfm-blogpost__meta-item">
                  <FiUser />
                  {post.authorName}
                </span>
                <span className="sfm-blogpost__meta-item">
                  <FiCalendar />
                  {new Date(post.publishedAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </span>
                <span className="sfm-blogpost__meta-item">
                  <FiEye />
                  {post.views} views
                </span>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="sfm-blogpost__content section">
          <div className="container">
            <div className="sfm-blogpost__layout">
              <motion.div
                className="sfm-blogpost__main"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                {post.featuredImage && (
                  <img
                    src={post.featuredImage}
                    alt={post.title}
                    className="sfm-blogpost__featured-image"
                  />
                )}
                <div
                  className="sfm-blogpost__body"
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />

                {post.tags && post.tags.length > 0 && (
                  <div className="sfm-blogpost__tags">
                    <FiTag />
                    {post.tags.map((tag) => (
                      <Link
                        key={tag}
                        to={`/blog?tag=${tag}`}
                        className="sfm-blogpost__tag"
                      >
                        {tag}
                      </Link>
                    ))}
                  </div>
                )}
              </motion.div>

              <motion.aside
                className="sfm-blogpost__sidebar"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <div className="sfm-blogpost__cta-card">
                  <h3>Need a Website?</h3>
                  <p>Let's discuss your project and bring your vision to life.</p>
                  <Link to="/contact" className="btn btn-primary">
                    Get a Free Quote
                  </Link>
                </div>

                <div className="sfm-blogpost__contact-card">
                  <h3>Contact Us</h3>
                  <p>Have questions? We're here to help.</p>
                  <a href="tel:9728008105" className="sfm-blogpost__contact-link">
                    (972) 800-8105
                  </a>
                  <a href="mailto:information@silverfoxmedia.co" className="sfm-blogpost__contact-link">
                    information@silverfoxmedia.co
                  </a>
                </div>
              </motion.aside>
            </div>
          </div>
        </section>
      </article>
    </>
  );
};

export default BlogPost;
