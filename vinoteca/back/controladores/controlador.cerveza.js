import Cerveza from "../models/Cerveza.js";
import { uploadToCloudinary } from '../middlewares/upload.js';

// Listado: find() sin filtro devuelve todos; sort({ createdAt: -1 }) = mas nuevos primero
const getCervezas = async (req, res) => {
  try {
    const dades = await Cerveza.find().sort({ createdAt: -1 });
    res.json({ dades, total: dades.length });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Uno por id: findById devuelve null si no existe; MongoDB usa _id (ObjectId)
const getCervezaById = async (req, res) => {
  try {
    const cerveza = await Cerveza.findById(req.params.id);
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
    const nuevo = await Cerveza.create(req.body);
    res.status(201).json(nuevo);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Actualizar: new: true devuelve el documento ya actualizado; runValidators aplica reglas del esquema
const updateCerveza = async (req, res) => {
  try {
    const actualizado = await Cerveza.findByIdAndUpdate(
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
    const eliminado = await Cerveza.findByIdAndDelete(req.params.id);
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

// El fitxer arriba via Multer a req.file.buffer (memoryStorage) i es puja a Cloudinary
const updateCervezaWithImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'Cap fitxer pujat' });
    }

    // Pujar el buffer a Cloudinary → retorna URL https permanent
    const urlImatge = await uploadToCloudinary(req.file.buffer, 'vinoteca/cervezas');

    const actualitzada = await Cerveza.findByIdAndUpdate(
      req.params.id,
      { imatge: urlImatge },
      { new: true }
    );
    if (!actualitzada) {
      return res.status(404).json({ error: 'Cervesa no trobada' });
    }
    res.json(actualitzada);
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
  updateCervezaWithImage,
};
