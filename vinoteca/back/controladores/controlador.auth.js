import jwt from 'jsonwebtoken';
import Usuario from '../models/Usuario.js';

// Funció auxiliar per generar el JWT
const generarToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

// POST /api/auth/registro — crear compte nou amb imatge opcional
// Si s'envia un fitxer via Multer (upload.single('imatge')), es guarda la ruta a l'usuari
const registro = async (req, res) => {
  try {
    const { email, password, rol } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email i contrasenya requerits' });
    }

    const existent = await Usuario.findOne({ email });
    if (existent) {
      return res.status(400).json({ error: 'Aquest email ja està registrat' });
    }

    // Preparar dades de l'usuari; si arriba fitxer, afegir la ruta de la imatge
    const dades = { email, password };
    if (rol) dades.rol = rol;
    if (req.file) {
      dades.imatge = 'uploads/' + req.file.filename;
    }

    const usuari = await Usuario.create(dades);
    const token = generarToken(usuari._id);

    res.status(201).json({
      token,
      usuari: { id: usuari._id, email: usuari.email, rol: usuari.rol, imatge: usuari.imatge }
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// POST /api/auth/login — validar credencials i retornar JWT
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const usuari = await Usuario.findOne({ email }).select('+password');

    if (!usuari || !(await usuari.comprovarPassword(password))) {
      return res.status(401).json({ error: 'Credencials incorrectes' });
    }

    const token = generarToken(usuari._id);
    res.json({
      token,
      usuari: { id: usuari._id, email: usuari.email, rol: usuari.rol, imatge: usuari.imatge }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// PUT /api/auth/perfil — actualitzar dades de l'usuari autenticat
const actualitzarPerfil = async (req, res) => {
  try {
    const usuari = req.usuari;
    const { email, password } = req.body;

    if (email && email !== usuari.email) {
      const existent = await Usuario.findOne({ email });
      if (existent) {
        return res.status(400).json({ error: 'Aquest email ja està registrat' });
      }
      usuari.email = email;
    }

    if (password) {
      usuari.password = password;
    }

    await usuari.save();

    const token = generarToken(usuari._id);
    res.json({
      token,
      usuari: { id: usuari._id, email: usuari.email, rol: usuari.rol, imatge: usuari.imatge }
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// PATCH /api/auth/perfil/imatge — pujar imatge de perfil
const pujarImatgePerfil = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'Cap fitxer pujat' });
    }

    const pathImatge = 'uploads/' + req.file.filename;

    const usuari = await Usuario.findByIdAndUpdate(
      req.usuari._id,
      { imatge: pathImatge },
      { new: true }
    );
    res.json({
      usuari: { id: usuari._id, email: usuari.email, rol: usuari.rol, imatge: usuari.imatge }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export { registro, login, actualitzarPerfil, pujarImatgePerfil };
