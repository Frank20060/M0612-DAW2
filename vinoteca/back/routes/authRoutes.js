import express from 'express';
import { registro, login, getPerfil, actualitzarPerfil, pujarImatgePerfil } from '../controladores/controlador.auth.js';
import { protegir } from '../middlewares/authMiddleware.js';
import upload from '../middlewares/upload.js';

const router = express.Router();

// Endpoint de referencia: GET /api/auth
router.get("/", (req, res) => {
  res.json({
    seccion: "Autenticación y Gestión de Usuarios",
    estado: "Módulo activo",
    endpoints: [
      { ruta: "/api/auth/registro", metodo: "POST", acceso: "Público", descripcion: "Registro de nuevo usuario con imagen de perfil opcional" },
      { ruta: "/api/auth/login", metodo: "POST", acceso: "Público", descripcion: "Autenticación y generación de token JWT" },
      { ruta: "/api/auth/perfil", metodo: "PUT", acceso: "Privado", descripcion: "Actualizar datos del perfil (Email/Password)" },
      { ruta: "/api/auth/perfil/imatge", metodo: "PATCH", acceso: "Privado", descripcion: "Subir/actualizar imagen de perfil" }
    ],
    configuracion: {
      token_tipo: "Bearer JWT",
      expiracion: "7d"
    }
  });
});

// Registro con imagen opcional (upload.single('imatge') posa el fitxer a req.file si s'envia)
router.post('/registro', upload.single('imatge'), registro);

// Login
router.post('/login', login);

// Obtener perfil (protegida)
router.get('/perfil', protegir, getPerfil);

// Actualizar perfil (protegida)
router.put('/perfil', protegir, actualitzarPerfil);

// Subir imagen de perfil (protegida)
router.patch('/perfil/imatge', protegir, upload.single('imatge'), pujarImatgePerfil);

export default router;