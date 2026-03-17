import express from "express";
import {
  getCervezas,
  getCervezaById,
  createCerveza,
  updateCerveza,
  deleteCerveza,
} from "../controladores/controlador.cerveza.js";
import { protegir, autoritzar } from "../middlewares/authMiddleware.js";
const router = express.Router();

// Endpoint de referencia: GET /api/Cerveza
router.get("/", (req, res) => {
  res.json({
    seccion: "Catálogo de Cervezas y Bebidas",
    estado: "Módulo activo",
    endpoints: [
      {
        ruta: "/api/cerveza/todos",
        metodo: "GET",
        acceso: "Público",
        descripcion: "Obtener lista completa de productos",
      },
      {
        ruta: "/api/cerveza/:id",
        metodo: "GET",
        acceso: "Público",
        descripcion: "Obtener detalles de un producto por su ID",
      },
      {
        ruta: "/api/cerveza/",
        metodo: "POST",
        acceso: "Admin/Editor",
        descripcion: "Crear un nuevo producto (Requere Token)",
      },
      {
        ruta: "/api/cerveza/:id",
        metodo: "PUT",
        acceso: "Admin/Editor",
        descripcion: "Actualizar un producto existente (Requiere Token)",
      },
      {
        ruta: "/api/cerveza/:id",
        metodo: "DELETE",
        acceso: "Admin/Editor",
        descripcion:
          "Eliminar un producto de la base de datos (Requiere Token)",
      },
    ],
  });
});

//Ahora siempre que usemos rutas de rutasVinito necesitas un token valido  a excepcion de el primer get
// router.use(protegir); // Aplica el middleware de protección a todas las rutas definidas en este router; solo usuarios autenticados podrán acceder a estas rutas

router.get("/todos", getCervezas);

router.get("/:id", getCervezaById);

router.post("/", protegir, autoritzar("admin", "editor"), createCerveza);

router.put("/:id", protegir, autoritzar("admin", "editor"), updateCerveza);

router.delete("/:id", protegir, autoritzar("admin", "editor"), deleteCerveza);

export default router;
