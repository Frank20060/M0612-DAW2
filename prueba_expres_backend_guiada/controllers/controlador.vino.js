const vinos = [
        { id: 1, name: "Vino Albino", description: "Un vino de mierda"},
        { id: 2, name: "Vino Reserva", description: "Un vino decentillo"},
        { id: 3, name: "Vino Gran Reserva", description: "Un asco, menudo vino más rancio" }
];

export function leerTodosLosVinito(req, res) {
    res.json(vinos);
    return vinos;
}

export function vinitoID(req, res) {
    const id = parseInt(req.params.id);
    const vino = vinos.find(v => v.id === id);
    res.json(vino);
}

export function createVino(req, res) {
    const newVino = req.body;
    vinos.push(newVino);
    res.json({ message: "New vino created", vino: newVino });
}

export function updateVino(req, res) {
    const id = parseInt(req.params.id);
    const updatedVino = req.body;
    const index = vinos.findIndex(v => v.id === id);
    if (index !== -1) {
        vinos[index] = { ...vinos[index], ...updatedVino };
        res.json({ message: "Vino updated", vino: vinos[index] });
    } else {
        res.status(404).json({ message: "Vino not found" });
    }
}

export function deleteVino(req, res) {
    const id = parseInt(req.params.id);
    const index = vinos.findIndex(v => v.id === id);
    if (index !== -1) {
        const deletedVino = vinos.splice(index, 1);
        res.json({ message: "Vino deleted", vino: deletedVino[0] });
    } else {
        res.status(404).json({ message: "Vino not found" });
    }
}
