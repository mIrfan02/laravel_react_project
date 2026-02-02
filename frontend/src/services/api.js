import axios from 'axios';

// Create axios instance
const api = axios.create({
  baseURL: 'https://react-laravel.stackvionx.com/api',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Handle 401 errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user');
      localStorage.removeItem('isAuthenticated');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth APIs
export const authAPI = {
  login: (credentials) => api.post('/login', credentials),
  register: (userData) => api.post('/register', userData),
  logout: () => api.post('/logout'),
  getUser: () => api.get('/user'),
};

// Dashboard APIs
export const dashboardAPI = {
  getStats: () => api.get('/dashboard/stats'),
};

// Task APIs
export const taskAPI = {
  getAll: (filters = {}) => api.get('/tasks', { params: filters }),
  getMyTasks: () => api.get('/my-tasks'),
  getOne: (id) => api.get(`/tasks/${id}`),
  create: (taskData) => api.post('/tasks', taskData),
  update: (id, taskData) => api.put(`/tasks/${id}`, taskData),
  updateStatus: (id, status) => api.patch(`/tasks/${id}/status`, { status }),
  delete: (id) => api.delete(`/tasks/${id}`),
};

// Manager APIs
export const managerAPI = {
  getAll: () => api.get('/managers'),
  getOne: (id) => api.get(`/managers/${id}`),
  create: (managerData) => api.post('/managers', managerData),
  update: (id, managerData) => api.put(`/managers/${id}`, managerData),
  delete: (id) => api.delete(`/managers/${id}`),
};

// Branch APIs
export const branchAPI = {
  getAll: () => api.get('/branches'),
  getOne: (id) => api.get(`/branches/${id}`),
  create: (branchData) => api.post('/branches', branchData),
  update: (id, branchData) => api.put(`/branches/${id}`, branchData),
  delete: (id) => api.delete(`/branches/${id}`),
};

export default api;