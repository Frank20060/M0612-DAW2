import axios from "axios";

// La URL base de la API y la URL base para las imágenes estáticas
// Se usa el puerto 8000 porque es el que está definido en back/index.js
// MODIFICADO: Usamos rutas relativas para que funcione el Proxy de Vite y evite CORS
export const API_URL = import.meta.env.VITE_API_URL || "/api";
export const IMG_URL = API_URL.replace("/api", "");

export const getFullImageUrl = (path) => {
  if (!path) return null;
  if (path.startsWith('http')) return path;
  try {
    const cleanPath = path
    const base = IMG_URL
    return `${base}/${cleanPath}`;
  } catch (err) {
    return path;
  }
};
const api = axios.create({
  baseURL: API_URL,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
});

// ── Interceptor de Petición: Adjuntar Token JWT ─────────────────────────────
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    console.log(
      `🚀 [API Request] ${config.method.toUpperCase()} ${config.url}`,
      config.data || "",
    );
    return config;
  },
  (error) => {
    console.error("❌ [API Request Error]", error);
    return Promise.reject(error);
  },
);

// ── Response interceptor: handle 401 globally ────────────────────────────
api.interceptors.response.use(
  (response) => {
    console.log(
      `✅ [API Response] ${response.status} ${response.config.url}`,
      response.data,
    );
    return response;
  },
  (error) => {
    console.error(
      `❌ [API Response Error] ${error.response?.status || "Network"} ${error.config?.url}`,
      error.response?.data || error.message,
    );
    if (error.response?.status === 401) {
      // Token expirado o inválido → limpiar sesión y redirigir
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      // Solo redirigir si no estamos ya en páginas de autenticación
      if (!window.location.pathname.includes("/login")) {
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  },
);

// ── Endpoints ──────────────────────────────────────────────────────────────

/** Auth */
export const authAPI = {
  login: (data) => api.post("/auth/login", data),
  registro: (formData) =>
    api.post("/auth/registro", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),
  getPerfil: () => api.get("/auth/perfil"),
  updatePerfil: (data) => api.put("/auth/perfil", data),
};

/** Vinos */
export const vinosAPI = {
  getAll: () => api.get("/vino/todos"), // Coincide con routerVinito.get('/todos')
  getById: (id) => api.get(`/vino/${id}`),
  create: (data) => api.post("/vino/", data),
  update: (id, data) => api.patch(`/vino/${id}`, data),
  uploadImatge: (id, formData) =>
    api.patch(`/vino/${id}/imatge`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),
  delete: (id) => api.delete(`/vino/${id}`),
};

/** Cervezas */
export const cervezasAPI = {
  getAll: () => api.get("/cerveza/todos"), // Coincide con routerCerveza.get('/todos')
  getById: (id) => api.get(`/cerveza/${id}`),
  create: (data) => api.post("/cerveza/", data),
  update: (id, data) => api.patch(`/cerveza/${id}`, data),
  uploadImatge: (id, formData) =>
    api.patch(`/cerveza/${id}/imatge`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),
  delete: (id) => api.delete(`/cerveza/${id}`),
};

// Alias de compatibilidad para evitar errores en componentes que usen el nombre antiguo
export const cervesesAPI = cervezasAPI;

/** Pedidos */
export const pedidosAPI = {
  create: (data) => api.post("/pedidos", data),
  getMine: () => api.get("/pedidos/me"),
  getAll: () => api.get("/pedidos"),
};

/** Usuaris (admin) */
export const usuarisAPI = {
  getAll: () => api.get("/usuaris"),
  updateRol: (id, rol) => api.patch(`/usuaris/${id}/rol`, { rol }),
};

export default api;
