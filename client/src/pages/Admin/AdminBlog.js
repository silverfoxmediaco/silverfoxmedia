import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import './AdminPages.css';

const AdminBlog = () => {
  return (
    <div className="sfm-admin-page">
      <div className="sfm-admin-page__header">
        <Link to="/admin" className="sfm-admin-page__back">
          <FiArrowLeft />
          Back to Dashboard
        </Link>
        <h1>Manage Blog</h1>
      </div>
      <div className="sfm-admin-page__content">
        <p className="sfm-admin-page__placeholder">
          Blog management functionality coming soon. You'll be able to create, edit, and publish blog posts from here.
        </p>
      </div>
    </div>
  );
};

export default AdminBlog;
