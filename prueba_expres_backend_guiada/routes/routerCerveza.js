import express from 'express';

const router = express.Router();

router.get("/", (req, res)=>{
    console.log("Has llamado a api/cerveza");
    res.send("<h1 style='color: lightgreen; background-color: blue; width: fit-content; height: fit-content; padding: 10px;'>Cerveza borrachos y borrachas</h1>"); // Envía una respuesta al cliente con el mensaje "Hola mundo desde Express"
})

export default router;