import express from "express";
import {
  getVinos,
  getVinoById,
  createVino,
  updateVino,
  deleteVino,
  updateVinoWithImage,
} from "../controladores/controlador.vino.js";
import { protegir, autoritzar } from "../middlewares/authMiddleware.js";
import upload from "../middlewares/upload.js";
const router = express.Router();

// Endpoint de referencia: GET /api/vino
router.get("/", (req, res) => {
  res.json({
    seccion: "Catálogo de Vinos y Bebidas",
    estado: "Módulo activo",
    endpoints: [
      { ruta: "/api/vino/todos", metodo: "GET", acceso: "Público", descripcion: "Obtener lista completa de productos" },
      { ruta: "/api/vino/:id", metodo: "GET", acceso: "Público", descripcion: "Obtener detalles de un producto por su ID" },
      { ruta: "/api/vino/", metodo: "POST", acceso: "Admin/Editor", descripcion: "Crear un nuevo producto (Requere Token)" },
      { ruta: "/api/vino/:id", metodo: "PUT", acceso: "Admin/Editor", descripcion: "Actualizar un producto existente (Requiere Token)" },
      { ruta: "/api/vino/:id", metodo: "DELETE", acceso: "Admin/Editor", descripcion: "Eliminar un producto de la base de datos (Requiere Token)" },
      { ruta: "/api/vino/:id/imatge", metodo: "PATCH", acceso: "Admin", descripcion: "Subir imagen de un vino (Requiere Token)" }
    ]
  });
});

//Ahora siempre que usemos rutas de rutasVinito necesitas un token valido  a excepcion de el primer get
// router.use(protegir); // Aplica el middleware de protección a todas las rutas definidas en este router; solo usuarios autenticados podrán acceder a estas rutas

router.get("/todos", getVinos);

router.get("/:id", getVinoById);

router.post("/", protegir, autoritzar('admin', 'editor'), createVino);

router.put("/:id", protegir, autoritzar('admin', 'editor'), updateVino);

router.delete("/:id", protegir, autoritzar('admin', 'editor'), deleteVino);

router.patch('/:id/imatge', protegir, autoritzar('admin'), upload.single('imatge'), updateVinoWithImage);

export default router;

