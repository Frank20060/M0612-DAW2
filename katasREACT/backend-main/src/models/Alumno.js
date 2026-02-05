import mongoose from 'mongoose';

const alumnoSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: [true, 'El nombre es obligatorio'],
    trim: true,
  },
  apellido: {
    type: String,
    required: [true, 'Los apellidos son obligatorios'],
    trim: true,
  },
  promo: {
    type: String,
    required: [true, 'La promoción es obligatoria'],
    trim: true,
  },
  grupo: {
    type: String,
    required: [true, 'El ciclo es obligatorio'],
    enum: ['DAW', 'SMX', 'ARI', 'IEA'],
  },
  foto: {
    type: String,
    required: [true, 'La URL de la imagen es obligatoria'],
    trim: true,
  },
}, {
  timestamps: true, // Agrega createdAt y updatedAt automáticamente
});

// Índices para mejorar las búsquedas
alumnoSchema.index({ promo: 1 });
alumnoSchema.index({ nombre: 'text', apellido: 'text' });

const Alumno = mongoose.model('Alumno', alumnoSchema);

export default Alumno;

/*

{
  "_id": {
    "$oid": "6980e975cde5f7bd9998b6cf"
  },
  "nombre": "Frank",
  "apellido": "Villar",
  "promo": "24/25",
  "grupo": "DAW",
  "foto": ""
}*/