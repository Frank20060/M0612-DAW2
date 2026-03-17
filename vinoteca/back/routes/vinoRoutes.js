import express from "express";
import {
  getVinos,
  getVinoById,
  createVino,
  updateVino,
  deleteVino,
} from "../controladores/controlador.vino.js";
import { protegir, autoritzar } from "../middlewares/authMiddleware.js";
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
      { ruta: "/api/vino/:id", metodo: "DELETE", acceso: "Admin/Editor", descripcion: "Eliminar un producto de la base de datos (Requiere Token)" }
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

export default router;
