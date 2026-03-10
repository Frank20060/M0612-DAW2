import express from "express";
import {
  getCervezas,
  getCervezaById,
  createCerveza,
  updateCerveza,
  deleteCerveza,
} from "../controllers/controlador.cerveza.js";

import { protegir, autoritzar } from '../middlewares/authMiddleware.js';

const router = express.Router();


router.get("/", (req, res) => {
  console.log("Has llamado a api/cerveza");
  res.send(
    "<h1 style='color: lightgreen; background-color: blue; width: fit-content; height: fit-content; padding: 10px;'>Cerveza borrachos y borrachas</h1>",
  ); // Envía una respuesta al cliente con el mensaje "Hola mundo desde Express"
});


//Ahora siempre que usemos rutas de rutasCerveas necesitas un token valido  a excepcion de el primer get
router.use(protegir); // Aplica el middleware de protección a todas las rutas definidas en este router; solo usuarios autenticados podrán acceder a estas rutas

router.get("/todos", autoritzar('admin'), getCervezas);

router.get("/:id",autoritzar('admin'),  getCervezaById);

router.post("/",autoritzar('admin'), createCerveza);

router.put("/:id",autoritzar('admin'), updateCerveza);

router.delete("/:id",autoritzar('admin'), deleteCerveza);

export default router;
