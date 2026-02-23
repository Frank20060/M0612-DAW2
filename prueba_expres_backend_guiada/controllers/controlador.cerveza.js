import Cerveza from '../models/Cerveza.js';

// Llistat: find() sense filtre retorna tots; sort({ createdAt: -1 }) = més nous primer
const getCervezas = async (req, res) => {
  try {
    const dades = await Cerveza.find().sort({ createdAt: -1 });
    res.json({ dades, total: dades.length });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Un per id: findById retorna null si no existeix; MongoDB usa _id (ObjectId)
const getCervezaById = async (req, res) => {
  try {
    const cerveza = await Cerveza.findById(req.params.id);
    if (!cerveza) {
      return res.status(404).json({ error: 'Cervesa no trobada', id: req.params.id });
    }
    res.json(cerveza);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Crear: create() valida amb l'esquema i guarda a la col·lecció
const createCerveza = async (req, res) => {
  try {
    const nova = await Cerveza.create(req.body);
    res.status(201).json(nova);
  } catch (err) {
    res.status(400).json({ error: err.message });  // 400 per errors de validació
  }
};

// Actualitzar: new: true retorna el document ja actualitzat; runValidators aplica les regles de l'esquema
const updateCerveza = async (req, res) => {
  try {
    const actualitzada = await Cerveza.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!actualitzada) {
      return res.status(404).json({ error: 'Cervesa no trobada', id: req.params.id });
    }
    res.json(actualitzada);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Esborrar: findByIdAndDelete retorna el document esborrat o null
const deleteCerveza = async (req, res) => {
  try {
    const eliminada = await Cerveza.findByIdAndDelete(req.params.id);
    if (!eliminada) {
      return res.status(404).json({ error: 'Cervesa no trobada', id: req.params.id });
    }
    res.status(204).send();  // 204 No Content: èxit sense cos
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export {
  getCervezas,
  getCervezaById,
  createCerveza,
  updateCerveza,
  deleteCerveza
};