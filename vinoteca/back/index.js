// Carregar variables d'entorn des del fitxer .env (process.env.PORT, etc.)
import 'dotenv/config';
import express from 'express';

// Crear la instància de l'aplicació Express
const app = express();
// Port: el que digui .env o 3000 per defecte (p. ex. en producció Heroku envia PORT)
const PORT = process.env.PORT || 8000;

// Middleware global: interpreta el cos de les peticions en JSON i el posa a req.body
app.use(express.json());

// Endpoint de referència: GET /api retorna informació bàsica de l'API
app.get('/api', (req, res) => {
  res.json({
    missatge: 'API de vinoteca',
    versio: '1.0',
    endpoints: ['/api', '/api/vinoteca (a implementar)']
  });
});

// Endpoint de salut: GET /health per comprovar que el servidor està actiu (monitoratge, load balancers)
app.get('/health', (req, res) => {
  res.status(200).json({ estat: 'ok' });
});

// Iniciar el servidor; escolta peticions al port PORT
app.listen(PORT, () => {
  console.log(`Servidor escoltant a http://localhost:${PORT}`);
});