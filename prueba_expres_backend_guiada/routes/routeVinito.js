import express from 'express';
import { leerTodosLosVinito, vinitoID, createVino, updateVino, deleteVino,  } from '../controllers/controlador.vino.js';
const router = express.Router();

router.get("/", (req, res)=>{
    console.log("Has llamado a api/vinito");
    res.send("<h1 style='color: lightgreen; background-color: blue; width: fit-content; height: fit-content; padding: 10px;'>Vinito</h1>"); // Envía una respuesta al cliente con el mensaje "Hola mundo desde Express"
})

router.get("/todos", leerTodosLosVinito)

router.get("/:id", vinitoID)

router.post("/", createVino)

router.put("/:id", updateVino)

router.delete("/:id", deleteVino)






export default router;