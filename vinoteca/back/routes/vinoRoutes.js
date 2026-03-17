import express from "express";
import {
  getVinos,
  getVinoById,
  createVino,
  updateVino,
  deleteVino,
} from "../controladores/controlador.vino.js";
import { protegir } from "../middlewares/authMiddleware.js";
const router = express.Router();

router.get("/", (req, res) => {
  console.log("Has llamado a api/vinito");
  res.send(
    "<h1 style='color: lightgreen; background-color: blue; width: fit-content; height: fit-content; padding: 10px;'>Vinito</h1>",
  ); // Envía una respuesta al cliente con el mensaje "Hola mundo desde Express"
});

//Ahora siempre que usemos rutas de rutasVinito necesitas un token valido  a excepcion de el primer get
// router.use(protegir); // Aplica el middleware de protección a todas las rutas definidas en este router; solo usuarios autenticados podrán acceder a estas rutas

router.get("/todos", getVinos);

router.get("/:id", getVinoById);

router.post("/", createVino);

router.put("/:id", updateVino);

router.delete("/:id", deleteVino);

export default router;
