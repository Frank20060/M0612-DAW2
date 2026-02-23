import express from "express";
import {
  getCervezas,
  getCervezaById,
  createCerveza,
  updateCerveza,
  deleteCerveza,
} from "../controllers/controlador.cerveza.js";

const router = express.Router();

router.get("/", (req, res) => {
  console.log("Has llamado a api/cerveza");
  res.send(
    "<h1 style='color: lightgreen; background-color: blue; width: fit-content; height: fit-content; padding: 10px;'>Cerveza borrachos y borrachas</h1>",
  ); // Envía una respuesta al cliente con el mensaje "Hola mundo desde Express"
});

router.get("/todos", getCervezas);

router.get("/:id", getCervezaById);

router.post("/", createCerveza);

router.put("/:id", updateCerveza);

router.delete("/:id", deleteCerveza);

export default router;
