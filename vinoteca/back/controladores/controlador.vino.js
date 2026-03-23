import Vino from "../models/Vino.js";

// Listado: find() sin filtro devuelve todos; sort({ createdAt: -1 }) = mas nuevos primero
const getVinos = async (req, res) => {
  try {
    const dades = await Vino.find().sort({ createdAt: -1 });
    res.json({ dades, total: dades.length });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Uno por id: findById devuelve null si no existe; MongoDB usa _id (ObjectId)
const getVinoById = async (req, res) => {
  try {
    const vino = await Vino.findById(req.params.id);
    if (!vino) {
      return res
        .status(404)
        .json({ error: "Vino no encontrado", id: req.params.id });
    }
    res.json(vino);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Crear: create() valida con el esquema y guarda en la coleccion
const createVino = async (req, res) => {
  try {
    const nuevo = await Vino.create(req.body);
    res.status(201).json(nuevo);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Actualizar: new: true devuelve el documento ya actualizado; runValidators aplica reglas del esquema
const updateVino = async (req, res) => {
  try {
    const actualizado = await Vino.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true },
    );
    if (!actualizado) {
      return res
        .status(404)
        .json({ error: "Vino no encontrado", id: req.params.id });
    }
    res.json(actualizado);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Borrar: findByIdAndDelete devuelve el documento eliminado o null
const deleteVino = async (req, res) => {
  try {
    const eliminado = await Vino.findByIdAndDelete(req.params.id);
    if (!eliminado) {
      return res
        .status(404)
        .json({ error: "Vino no encontrado", id: req.params.id });
    }
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Subir imagen: el fitxer arriba via Multer a req.file
const updateVinoWithImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'Cap fitxer pujat' });
    }

    const pathImatge = 'uploads/' + req.file.filename;

    const actualitzat = await Vino.findByIdAndUpdate(
      req.params.id,
      { imatge: pathImatge },
      { new: true }
    );
    if (!actualitzat) {
      return res.status(404).json({ error: 'Vino no encontrado' });
    }
    res.json(actualitzat);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export { getVinos, getVinoById, createVino, updateVino, deleteVino, updateVinoWithImage };
