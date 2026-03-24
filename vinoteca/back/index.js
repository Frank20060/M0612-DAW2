// Carregar variables d'entorn des del fitxer .env (process.env.PORT, etc.)
import "dotenv/config";
import express from "express";
import cors from 'cors';
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import routerVinito from "./routes/vinoRoutes.js";
import routerCerveza from "./routes/cervezaRoutes.js";
import pedidosRoutes from "./routes/pedidosRoutes.js";
import path from 'path';
import { fileURLToPath } from 'url';

// __dirname per ES Modules (index.js sol estar a src/, uploads a l'arrel)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Crear la instància de l'aplicació Express
const app = express();
// Port: el que digui .env o 3000 per defecte (p. ex. en producció Heroku envia PORT)
const PORT = process.env.PORT || 8000;

// Connectar a la base de dades
connectDB();

// Configuración de CORS
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// Middleware global: interpreta el cos de les peticions en JSON i el posa a req.body
app.use(express.json());

// express.static: les peticions a /uploads/* es resolen servint fitxers de la carpeta uploads
// Exemple: GET /uploads/123456-foto.jpg retorna el fitxer físic
// Sense aquesta línia, el fitxer existiria al disc però no seria accessible per HTTP
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Middleware per capturar errors de sintaxi JSON (p. ex. comes sobrants o cometes simples)
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    return res.status(400).json({
      error:
        "Format JSON invàlid. Revisa la sintaxi (cometes dobles, comes finals, etc.).",
    });
  }
  next();
});

// Endpoint de referència: GET /api retorna informació bàsica de l'API
// Endpoint de referencia: GET /api
app.get("/api", (req, res) => {
  res.json({
    mensaje: "Bienvenido a la API de Vinacoteca",
    version: "1.0",
    estado: "Operativo",
    rutas_principales: {
      auth: "/api/auth",
      vinos: "/api/vino",
      cervezas: "/api/cerveza",
    },
    autor: "Frank - Proyecto DAW",
  });
});

// Endpoint de salut: GET /health per comprovar que el servidor està actiu (monitoratge, load balancers)
app.get("/health", (req, res) => {
  res.status(200).json({ estat: "ok" });
});

// Iniciar el servidor; escolta peticions al port PORT
app.listen(PORT, () => {
  console.log(`Servidor escoltant a http://localhost:${PORT}`);
});

//rutas auth
app.use("/api/auth", authRoutes);

//rutas vino
app.use("/api/vino", routerVinito);

//rutas Cerveza
app.use("/api/cerveza", routerCerveza);

//rutas Pedidos
app.use("/api/pedidos", pedidosRoutes);
