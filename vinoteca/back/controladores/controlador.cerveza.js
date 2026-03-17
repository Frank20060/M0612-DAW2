import Producto from "../models/Producto.js";

// Listado: find() sin filtro devuelve todos; sort({ createdAt: -1 }) = mas nuevos primero
const getCervezas = async (req, res) => {
  try {
    const dades = await Producto.find({ tipo_producto: "cerveza" }).sort({
      createdAt: -1,
    });
    res.json({ dades, total: dades.length });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Uno por id: findById devuelve null si no existe; MongoDB usa _id (ObjectId)
const getCervezaById = async (req, res) => {
  try {
    const cerveza = await Producto.findById(req.params.id);
    if (!cerveza) {
      return res
        .status(404)
        .json({ error: "Cerveza no encontrada", id: req.params.id });
    }
    res.json(cerveza);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Crear: create() valida con el esquema y guarda en la coleccion
const createCerveza = async (req, res) => {
  try {
    // Forzamos que el tipo siempre sea 'cerveza', independientemente de lo que llegue en req.body
    const nuevo = await Producto.create({
      ...req.body,
      tipo_producto: "cerveza",
    });
    res.status(201).json(nuevo);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Actualizar: new: true devuelve el documento ya actualizado; runValidators aplica reglas del esquema
const updateCerveza = async (req, res) => {
  try {
    const actualizado = await Producto.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true },
    );
    if (!actualizado) {
      return res
        .status(404)
        .json({ error: "Cerveza no encontrada", id: req.params.id });
    }
    res.json(actualizado);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Borrar: findByIdAndDelete devuelve el documento eliminado o null
const deleteCerveza = async (req, res) => {
  try {
    const eliminado = await Producto.findByIdAndDelete(req.params.id);
    if (!eliminado) {
      return res
        .status(404)
        .json({ error: "Cerveza no encontrada", id: req.params.id });
    }
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export {
  getCervezas,
  getCervezaById,
  createCerveza,
  updateCerveza,
  deleteCerveza,
};
