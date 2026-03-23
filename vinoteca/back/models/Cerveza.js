import mongoose from "mongoose";

const cervezaSchema = new mongoose.Schema(
  {
    nombre: { type: String, required: true },
    descripcion: { type: String, required: true },
    graduacion: { type: Number, required: true },
    precio: { type: Number, required: true },
    stock: { type: Number, default: 0 },
    detalles: {
      estilo: String,
      amargor: String,
      formato: String,
    },
    imatge: {
      type: String,
      trim: true,
    }
  },
  { timestamps: true },
);

export default mongoose.model("Cerveza", cervezaSchema);
