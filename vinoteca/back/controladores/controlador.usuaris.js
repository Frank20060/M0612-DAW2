import Usuario from "../models/Usuario.js";

// GET /api/usuaris — obte tots els usuaris (només admin)
export const getUsuaris = async (req, res) => {
  try {
    const usuaris = await Usuario.find().select('-password').sort({ createdAt: -1 }).lean();
    
    // Añadimos un fallback para el nombre basado en el email para que quede bien en el Frontend
    const mappedUsuaris = usuaris.map(u => ({
      ...u,
      nombre: u.nombre || u.nom || u.email.split('@')[0]
    }));

    res.json({ usuaris: mappedUsuaris });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// PATCH /api/usuaris/:id/rol — canvia el rol d'un usuari
export const updateRolUsuari = async (req, res) => {
  try {
    const { id } = req.params;
    const { rol } = req.body;
    
    if (!['usuari', 'editor', 'admin', 'client'].includes(rol.toLowerCase())) {
      return res.status(400).json({ error: 'Rol invàlid' });
    }

    const usuariModificat = await Usuario.findByIdAndUpdate(
      id,
      { rol: rol.toLowerCase() },
      { new: true }
    ).select('-password').lean();

    if (!usuariModificat) {
      return res.status(404).json({ error: 'Usuari no trobat' });
    }

    res.json({ usuari: {
      ...usuariModificat,
      nombre: usuariModificat.nombre || usuariModificat.nom || usuariModificat.email.split('@')[0]
    } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
