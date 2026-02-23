
import Vinito from "../models/Vinitos.js";

export function leerTodosLosVinito(req, res) {
    Vinito.find()
        .then(vinos => res.json({ vinos, total: vinos.length }))
        .catch(err => res.status(500).json({ error: err.message }));

}

export function vinitoID(req, res) {
    Vinito.findById(req.params.id)
        .then(vino => {
            if (!vino) {
                return res.status(404).json({ error: "Vinito no encontrado" });
            }
            res.json(vino);
        })
        .catch(err => res.status(500).json({ error: err.message }));
}

export function createVino(req, res) {
    const newVino = req.body;
    Vinito.create(newVino)
        .then(vino => res.json({ message: "New vino created", vino }))
        .catch(err => res.status(400).json({ error: err.message }));
}

export function updateVino(req, res) {
    const id = parseInt(req.params.id);
    const updatedData = req.body;
    Vinito.findByIdAndUpdate(id, updatedData, { new: true, runValidators: true })
        .then(vino => {
            if (!vino) {
                return res.status(404).json({ error: "Vinito no encontrado" });
            }
            res.json({ message: "Vinito updated", vino });
        })
        .catch(err => res.status(400).json({ error: err.message }));
}

export function deleteVino(req, res) {
    const id = parseInt(req.params.id);
    Vinito.findByIdAndDelete(id)
        .then(vino => {
            if (!vino) {
                return res.status(404).json({ error: "Vinito no encontrado" });
            }
            res.json({ message: "Vinito deleted", vino });
        })
        .catch(err => res.status(500).json({ error: err.message }));
        res.status(404).json({ message: "Vino not found" });
    }

