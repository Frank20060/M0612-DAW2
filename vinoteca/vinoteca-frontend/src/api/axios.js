import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api',
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// ── Request interceptor: attach JWT token ──────────────────────────────────
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// ── Response interceptor: handle 401 globally ────────────────────────────
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid → clean up and redirect
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      // Only redirect if not already on auth pages
      if (!window.location.pathname.includes('/login')) {
        window.location.href = '/login'
      }
    }
    return Promise.reject(error)
  }
)

// ── Helpers ────────────────────────────────────────────────────────────────

/** Auth */
export const authAPI = {
  login: (data) => api.post('/auth/login', data),
  registro: (formData) =>
    api.post('/auth/registro', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
  getPerfil: () => api.get('/auth/perfil'),
  updatePerfil: (data) => api.put('/auth/perfil', data),
}

/** Vinos */
export const vinosAPI = {
  getAll: () => api.get('/vino/todos'),
  getById: (id) => api.get(`/vino/${id}`),
  create: (data) => api.post('/vino/', data),
  update: (id, data) => api.patch(`/vino/${id}`, data),
  uploadImatge: (id, formData) =>
    api.patch(`/vino/${id}/imatge`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
  delete: (id) => api.delete(`/vino/${id}`),
}

/** Cerveses */
export const cervesesAPI = {
  getAll: () => api.get('/cervesa/todos'),
  getById: (id) => api.get(`/cervesa/${id}`),
  create: (data) => api.post('/cervesa/', data),
  update: (id, data) => api.patch(`/cervesa/${id}`, data),
  uploadImatge: (id, formData) =>
    api.patch(`/cervesa/${id}/imatge`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
  delete: (id) => api.delete(`/cervesa/${id}`),
}

/** Pedidos */
export const pedidosAPI = {
  create: (data) => api.post('/pedidos', data),
  getMine: () => api.get('/pedidos/me'),
  getAll: () => api.get('/pedidos'),
}

/** Usuaris (admin) */
export const usuarisAPI = {
  getAll: () => api.get('/usuaris'),
  updateRol: (id, rol) => api.patch(`/usuaris/${id}/rol`, { rol }),
}

export default api
