const vinos = [
        { id: 1, name: "Alhambra", description: "Cerveza de alta calidad, ideal para disfrutar en verano" },
        { id: 2, name: "Estrella Galicia", description: "Cerveza de calidad media, perfecta para maridar con pescados y mariscos" },
        { id: 3, name: "Cerveza La Cerveza", description: "Cerveza fresca y ligera, ideal para acompañar platos de mariscos" }
];


export function leerCervezas(req, res) {
    res.json(vinos);
    return vinos;
}

export function leerCervezaPorID(req, res) {
    const id = parseInt(req.params.id);
    const vino = vinos.find(v => v.id === id);
    res.json(vino);
}

export function createCerveza(req, res) {
    const newCerveza = req.body;
    vinos.push(newCerveza);
    res.json({ message: "New cerveza created", cerveza: newCerveza });
}

export function updateCerveza(req, res) {
    const id = parseInt(req.params.id);
    const updatedCerveza = req.body;
    const index = vinos.findIndex(v => v.id === id);
    if (index !== -1) {
        vinos[index] = { ...vinos[index], ...updatedCerveza };
        res.json({ message: "Cerveza updated", cerveza: vinos[index] });
    } else {
        res.status(404).json({ message: "Cerveza not found" });
    }
}

export function deleteCerveza(req, res) {
    const id = parseInt(req.params.id);
    const index = vinos.findIndex(v => v.id === id);
    if (index !== -1) {
        const deletedCerveza = vinos.splice(index, 1);
        res.json({ message: "Cerveza deleted", cerveza: deletedCerveza[0] });
    } else {
        res.status(404).json({ message: "Cerveza not found" });
    }
}

