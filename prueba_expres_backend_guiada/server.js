/*
Dependencias que vamos instalando
express
nodemon (npm install -g nodemon, instalada en el equipo no en el proyecto): Herramienta que reinicia automáticamente el servidor cada vez que detecta cambios en el código, lo que facilita el desarrollo.
    - Para correr el servidor con nodemon, se puede usar el comando 'npm run dev' que hemos definido en el package.json, lo que ejecutará 'nodemon server.js' y mantendrá el servidor en ejecución mientras desarrollamos.
*/

import 'dotenv/config';


console.log("Hola servidor Express");

import routerCerveza from "./routes/routerCerveza.js"; // Importamos el router para manejar las rutas relacionadas con la cerveza
import routerVinito from "./routes/routeVinito.js"; // Importamos el router para manejar las rutas relacionadas con el vinito
import express from 'express';
//const express = require('express'); //Importamos el módulo Express para crear un servidor web
const app = express();  // Creamos una instancia de la aplicación Express

//Midelware

app.use("/api/birra", routerCerveza); // Middleware para manejar las rutas relacionadas con la cerveza, utilizando el router definido en routerCerveza
app.use("/api/vinito", routerVinito); 

app.get("/", (req, res) => {   // Peticion GET a la raiz de el servidor Express
    console.log("Hola mundo desde Express"); // Imprime un mensaje en la consola del servidor   
    res.send("<h1 style='color: lightgreen; background-color: blue; width: fit-content; height: fit-content; padding: 10px;'>Bienvenido a mi api de Prueba Express</h1>"); // Envía una respuesta al cliente con el mensaje "Hola mundo desde Express"

})
app.get("/api", (req, res) => {
    res.json(
        {
            message: "Bienvenido a mi api de Prueba Express",
            version: "1.0.0",
            rutas: {
                cerveza: "/api/birra",
                vinito: "/api/vinito"
            }
        });
})




/// Para ejecutar 'node server.js' en la terminal
app.listen(3000, () => { // El servidor escuchará en el puerto 3000
    console.log("Servidor Express escuchando en el puerto 3000");
});



/*

Deveres:


rutas de vino y cervezas para un crud basico:
usar REST Client para probar las rutas
CRUD: Create, Read, Update, Delete
- Create: POST /api/vinito
- Read: GET /api/vinito (para obtener todos los vinito) y GET /api/vinito/:id (para obtener un vinito por su id)
- Update: PUT /api/vinito/:id (para actualizar un vinito por su id)
- Delete: DELETE /api/vinito/:id (para eliminar un vinito por su id)

lo mismo para las cervezas
*/