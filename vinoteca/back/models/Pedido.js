const mongoose = require('mongoose');

const pedidoSchema = new mongoose.Schema({
  usuario_id: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Usuario', 
    required: true 
  },
  productos: [
    {
      producto_id: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Producto', 
        required: true 
      },
      cantidad: { type: Number, required: true, min: 1 }
    }
  ],
  total: { type: Number, required: true },
  estado: { 
    type: String, 
    enum: ['pendiente', 'confirmado', 'enviado'], 
    default: 'pendiente' 
  },
  fecha_creacion: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Pedido', pedidoSchema);