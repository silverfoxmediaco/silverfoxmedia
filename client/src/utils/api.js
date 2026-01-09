import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || '';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

api.interceptors.request.use(
  (config) => {
    const user = localStorage.getItem('user');
    if (user) {
      const { token } = JSON.parse(user);
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('user');
      window.location.href = '/admin/login';
    }
    return Promise.reject(error);
  }
);

export const projectsAPI = {
  getAll: (params) => api.get('/api/projects', { params }),
  getBySlug: (slug) => api.get(`/api/projects/${slug}`),
  create: (data) => api.post('/api/projects', data),
  update: (id, data) => api.put(`/api/projects/${id}`, data),
  delete: (id) => api.delete(`/api/projects/${id}`)
};

export const templatesAPI = {
  getAll: (params) => api.get('/api/templates', { params }),
  getBySlug: (slug) => api.get(`/api/templates/${slug}`),
  create: (data) => api.post('/api/templates', data),
  update: (id, data) => api.put(`/api/templates/${id}`, data),
  delete: (id) => api.delete(`/api/templates/${id}`)
};

export const blogAPI = {
  getAll: (params) => api.get('/api/blog', { params }),
  getBySlug: (slug) => api.get(`/api/blog/${slug}`),
  getCategories: () => api.get('/api/blog/categories'),
  getTags: () => api.get('/api/blog/tags'),
  create: (data) => api.post('/api/blog', data),
  update: (id, data) => api.put(`/api/blog/${id}`, data),
  delete: (id) => api.delete(`/api/blog/${id}`)
};

export const contactAPI = {
  submit: (data) => api.post('/api/contact', data),
  getAll: (params) => api.get('/api/contact', { params }),
  getById: (id) => api.get(`/api/contact/${id}`),
  getStats: () => api.get('/api/contact/stats'),
  update: (id, data) => api.put(`/api/contact/${id}`, data),
  delete: (id) => api.delete(`/api/contact/${id}`)
};

export const stripeAPI = {
  createCheckoutSession: (templateId) => api.post('/api/stripe/create-checkout-session', { templateId }),
  getSession: (sessionId) => api.get(`/api/stripe/session/${sessionId}`)
};

export default api;
