import 'dotenv/config.js';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import alumnosRoutes from '../routes/alumnos.routes.js';

const app = express();

// Configurar CORS correctamente para Vercel
const corsOptions = {
  origin: function(origin, callback) {
    // Permitir requests sin origin (como mobile apps o curl requests)
    if (!origin || origin === 'undefined') return callback(null, true);
    
    // Orígenes permitidos
    const allowedOrigins = [
      'https://m0612-daw-front-alumnos.vercel.app',
      'http://localhost:5173',
      'http://localhost:3000'
    ];
    
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(null, true); // Por ahora permitir todos para debug
    }
  },
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Conectar a la base de datos
const connectDatabase = async () => {
  if (mongoose.connection.readyState === 0) {
    try {
      const MONGODB_URI = process.env.MONGODB_URI;
      if (!MONGODB_URI) {
        throw new Error('MONGODB_URI no está definida en las variables de ambiente');
      }
      await mongoose.connect(MONGODB_URI, {
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 45000,
      });
      console.log('✅ Conectado a MongoDB Atlas');
    } catch (error) {
      console.error('❌ Error conectando a la base de datos:', error.message);
      throw error;
    }
  }
};

// Middleware para conectar DB antes de cada request
app.use(async (req, res, next) => {
  try {
    await connectDatabase();
    next();
  } catch (error) {
    console.error('Error en middleware de conexión:', error.message);
    res.status(500).json({ 
      error: 'Error de conexión a la base de datos',
      message: error.message 
    });
  }
});

// Rutas
app.get('/', (req, res) => {
  res.json({ 
    message: 'API de Gestión de Alumnos',
    version: '1.0.0',
    endpoints: {
      alumnos: '/api/alumnos',
    },
  });
});

// Test de conexión
app.get('/health', async (req, res) => {
  try {
    const mongooseStatus = mongoose.connection.readyState;
    const states = {
      0: 'disconnected',
      1: 'connected',
      2: 'connecting',
      3: 'disconnecting'
    };
    
    res.json({
      status: 'ok',
      mongodb: states[mongooseStatus],
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.use('/api/alumnos', alumnosRoutes);

// Manejo de rutas no encontradas
app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

// Manejo de errores
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ 
    error: 'Error interno del servidor',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined,
  });
});

// Exportar para Vercel (serverless function)
export default app;
