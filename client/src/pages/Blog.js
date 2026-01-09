import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiCalendar, FiEye, FiArrowRight } from 'react-icons/fi';
import SEO from '../components/SEO';
import { blogAPI } from '../utils/api';
import './Blog.css';

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [category, setCategory] = useState('all');
  const [categories, setCategories] = useState([]);

  const categoryLabels = {
    'web-development': 'Web Development',
    'ux-design': 'UX Design',
    'seo': 'SEO',
    'marketing': 'Marketing',
    'tutorials': 'Tutorials',
    'news': 'News'
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await blogAPI.getCategories();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const params = { page, limit: 9 };
        if (category !== 'all') params.category = category;
        const { data } = await blogAPI.getAll(params);
        setPosts(data.posts);
        setTotalPages(data.pages);
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [page, category]);

  const handleCategoryChange = (newCategory) => {
    setCategory(newCategory);
    setPage(1);
  };

  return (
    <>
      <SEO
        title="Blog"
        description="Read our latest articles on web development, UX design, SEO, and digital marketing. Tips and insights from the SilverFox Media team."
        url="/blog"
      />

      <section className="sfm-blog-hero">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1>Blog</h1>
            <p>Insights, tips, and news from the SilverFox Media team</p>
          </motion.div>
        </div>
      </section>

      <section className="sfm-blog section">
        <div className="container">
          <div className="sfm-blog__filters">
            <button
              className={`sfm-blog__filter ${category === 'all' ? 'sfm-blog__filter--active' : ''}`}
              onClick={() => handleCategoryChange('all')}
            >
              All Posts
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                className={`sfm-blog__filter ${category === cat ? 'sfm-blog__filter--active' : ''}`}
                onClick={() => handleCategoryChange(cat)}
              >
                {categoryLabels[cat] || cat}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="sfm-loading-screen">
              <div className="sfm-loading-spinner"></div>
            </div>
          ) : posts.length === 0 ? (
            <div className="sfm-blog__empty">
              <p>No blog posts found. Check back soon for new content!</p>
            </div>
          ) : (
            <>
              <div className="sfm-blog__grid">
                {posts.map((post, index) => (
                  <motion.article
                    key={post._id}
                    className="sfm-blog__card"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    {post.featuredImage && (
                      <Link to={`/blog/${post.slug}`} className="sfm-blog__image">
                        <img src={post.featuredImage} alt={post.title} />
                      </Link>
                    )}
                    <div className="sfm-blog__info">
                      <div className="sfm-blog__meta">
                        <span className="sfm-blog__category">
                          {categoryLabels[post.category] || post.category}
                        </span>
                        <span className="sfm-blog__date">
                          <FiCalendar />
                          {new Date(post.publishedAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          })}
                        </span>
                        <span className="sfm-blog__views">
                          <FiEye />
                          {post.views}
                        </span>
                      </div>
                      <h2>
                        <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                      </h2>
                      <p>{post.excerpt}</p>
                      <Link to={`/blog/${post.slug}`} className="sfm-blog__read-more">
                        Read More
                        <FiArrowRight />
                      </Link>
                    </div>
                  </motion.article>
                ))}
              </div>

              {totalPages > 1 && (
                <div className="sfm-blog__pagination">
                  <button
                    className="btn btn-outline"
                    onClick={() => setPage(page - 1)}
                    disabled={page === 1}
                  >
                    Previous
                  </button>
                  <span className="sfm-blog__page-info">
                    Page {page} of {totalPages}
                  </span>
                  <button
                    className="btn btn-outline"
                    onClick={() => setPage(page + 1)}
                    disabled={page === totalPages}
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </>
  );
};

export default Blog;
