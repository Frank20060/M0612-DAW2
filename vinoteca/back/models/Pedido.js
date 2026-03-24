import mongoose from 'mongoose';

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
        refPath: 'productos.producto_modelo', 
        required: true 
      },
      producto_modelo: {
        type: String,
        required: true,
        enum: ['Vino', 'Cerveza']
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

export default mongoose.model('Pedido', pedidoSchema);