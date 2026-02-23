import mongoose from "mongoose";

const vinitoSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: [true, "El nombre es obligatorio"]
    },
    precio: Number,
})

export default mongoose.model("Vinito", vinitoSchema);