const mongoose = require('mongoose');

const productoSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  descripcion: { type: String, required: true },
  tipo_producto: { 
    type: String, 
    enum: ['vino', 'cerveza'], 
    required: true 
  },
  graduacion: { type: Number, required: true },
  precio: { type: Number, required: true },
  stock: { type: Number, default: 0 },
  // Detalles específicos que variarán según si es vino o cerveza
  detalles: {
    bodega: String,
    uva: String,
    tipo_vino: String,
    estilo: String,
    amargor: String,
    formato: String
  }
}, { timestamps: true });

module.exports = mongoose.model('Producto', productoSchema);