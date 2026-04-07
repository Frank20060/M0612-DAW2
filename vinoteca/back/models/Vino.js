import mongoose from "mongoose";

const vinoSchema = new mongoose.Schema(
  {
    nombre: { type: String, required: true },
    descripcion: { type: String, required: true },
    graduacion: { type: Number, required: true },
    precio: { type: Number, required: true },
    stock: { type: Number, default: 0 },
    detalles: { type: mongoose.Schema.Types.Mixed, default: {} },
    imatge: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true },
);

export default mongoose.model("Vino", vinoSchema);
