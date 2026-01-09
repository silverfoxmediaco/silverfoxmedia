import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import './AdminPages.css';

const AdminProjects = () => {
  return (
    <div className="sfm-admin-page">
      <div className="sfm-admin-page__header">
        <Link to="/admin" className="sfm-admin-page__back">
          <FiArrowLeft />
          Back to Dashboard
        </Link>
        <h1>Manage Projects</h1>
      </div>
      <div className="sfm-admin-page__content">
        <p className="sfm-admin-page__placeholder">
          Project management functionality coming soon. You'll be able to add, edit, and delete portfolio projects from here.
        </p>
      </div>
    </div>
  );
};

export default AdminProjects;
