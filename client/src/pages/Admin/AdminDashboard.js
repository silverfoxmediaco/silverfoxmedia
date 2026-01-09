import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiGrid, FiFileText, FiShoppingBag, FiMail, FiLogOut, FiUsers } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';
import { contactAPI } from '../../utils/api';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [stats, setStats] = useState({ total: 0, newLeads: 0, unread: 0 });
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await contactAPI.getStats();
        setStats(data);
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };
    fetchStats();
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const menuItems = [
    { to: '/admin/projects', icon: <FiGrid />, label: 'Projects', count: null },
    { to: '/admin/templates', icon: <FiShoppingBag />, label: 'Templates', count: null },
    { to: '/admin/blog', icon: <FiFileText />, label: 'Blog Posts', count: null },
    { to: '/admin/contacts', icon: <FiMail />, label: 'Contacts', count: stats.unread }
  ];

  const statCards = [
    { icon: <FiUsers />, label: 'Total Leads', value: stats.total, color: '#0FCDCD' },
    { icon: <FiMail />, label: 'New Leads', value: stats.newLeads, color: '#10B981' },
    { icon: <FiMail />, label: 'Unread', value: stats.unread, color: '#F59E0B' }
  ];

  return (
    <div className="sfm-admin-dashboard">
      <header className="sfm-admin-dashboard__header">
        <img src="/images/silverfox-logo.webp" alt="SilverFox Media" className="sfm-admin-dashboard__logo" />
        <div className="sfm-admin-dashboard__user">
          <span>Welcome, {user?.name}</span>
          <button onClick={handleLogout} className="btn btn-outline btn-sm">
            <FiLogOut /> Logout
          </button>
        </div>
      </header>

      <div className="sfm-admin-dashboard__content">
        <h1>Dashboard</h1>

        <div className="sfm-admin-dashboard__stats">
          {statCards.map((stat) => (
            <div key={stat.label} className="sfm-admin-dashboard__stat-card">
              <div className="sfm-admin-dashboard__stat-icon" style={{ backgroundColor: stat.color }}>
                {stat.icon}
              </div>
              <div className="sfm-admin-dashboard__stat-info">
                <p className="sfm-admin-dashboard__stat-label">{stat.label}</p>
                <p className="sfm-admin-dashboard__stat-value">{stat.value}</p>
              </div>
            </div>
          ))}
        </div>

        <h2>Quick Links</h2>
        <div className="sfm-admin-dashboard__menu">
          {menuItems.map((item) => (
            <Link key={item.to} to={item.to} className="sfm-admin-dashboard__menu-item">
              <span className="sfm-admin-dashboard__menu-icon">{item.icon}</span>
              <span className="sfm-admin-dashboard__menu-label">{item.label}</span>
              {item.count > 0 && (
                <span className="sfm-admin-dashboard__menu-badge">{item.count}</span>
              )}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
