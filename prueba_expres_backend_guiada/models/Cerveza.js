import mongoose from "mongoose";

const cervezasSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: [true, "El nombre es obligatorio"]
    },
    precio: Number,
})

export default mongoose.model("Cerveza", cervezasSchema);