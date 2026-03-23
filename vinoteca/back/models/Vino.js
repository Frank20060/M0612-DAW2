import mongoose from "mongoose";

const vinoSchema = new mongoose.Schema(
  {
    nombre: { type: String, required: true },
    descripcion: { type: String, required: true },
    graduacion: { type: Number, required: true },
    precio: { type: Number, required: true },
    stock: { type: Number, default: 0 },
    detalles: {
      bodega: String,
      uva: String,
      tipo_vino: String,
      formato: String,
    },
  },
  { timestamps: true },
);

export default mongoose.model("Vino", vinoSchema);
