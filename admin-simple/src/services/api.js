import axios from 'axios';

// 👇 QUAN TRỌNG: Đổi localhost thành IP Server
const BASE_URL = 'http://100.26.182.209:8080/api';

const API = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor để thêm token tự động
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// API endpoints
export const authAPI = {
  login: (credentials) => API.post('/auth/login', credentials),
  register: (userData) => API.post('/auth/register', userData),
};

export const productAPI = {
  getAll: () => API.get('/products'),
  getById: (id) => API.get(`/products/${id}`),
  create: (product) => API.post('/products', product),
  update: (id, product) => API.put(`/products/${id}`, product),
  delete: (id) => API.delete(`/products/${id}`),
};

export const categoryAPI = {
  getAll: () => API.get('/categories'),
  create: (category) => API.post('/categories', category),
  update: (id, category) => API.put(`/categories/${id}`, category),
  delete: (id) => API.delete(`/categories/${id}`),
};

export const orderAPI = {
  getAll: () => API.get('/orders'),
  getById: (id) => API.get(`/orders/${id}`),
  updateStatus: (id, status) => API.put(`/orders/${id}/status`, { status }),
};

export default API;