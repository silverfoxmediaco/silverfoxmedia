import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Home from './pages/Home';
import Portfolio from './pages/Portfolio';
import ProjectDetail from './pages/ProjectDetail';
import Templates from './pages/Templates';
import TemplateDetail from './pages/TemplateDetail';
import TemplateSuccess from './pages/TemplateSuccess';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';
import AdminLogin from './pages/Admin/AdminLogin';
import AdminDashboard from './pages/Admin/AdminDashboard';
import AdminProjects from './pages/Admin/AdminProjects';
import AdminTemplates from './pages/Admin/AdminTemplates';
import AdminBlog from './pages/Admin/AdminBlog';
import AdminContacts from './pages/Admin/AdminContacts';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="portfolio" element={<Portfolio />} />
        <Route path="portfolio/:slug" element={<ProjectDetail />} />
        <Route path="templates" element={<Templates />} />
        <Route path="templates/:slug" element={<TemplateDetail />} />
        <Route path="templates/success" element={<TemplateSuccess />} />
        <Route path="blog" element={<Blog />} />
        <Route path="blog/:slug" element={<BlogPost />} />
        <Route path="contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Route>
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin" element={<ProtectedRoute />}>
        <Route index element={<AdminDashboard />} />
        <Route path="projects" element={<AdminProjects />} />
        <Route path="templates" element={<AdminTemplates />} />
        <Route path="blog" element={<AdminBlog />} />
        <Route path="contacts" element={<AdminContacts />} />
      </Route>
    </Routes>
  );
}

export default App;
