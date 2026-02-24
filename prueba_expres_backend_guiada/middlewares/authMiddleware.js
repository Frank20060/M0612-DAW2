import jwt from 'jsonwebtoken';
import Usuario from '../models/Usuario.js';

// Middleware: comprova el token JWT i carrega l'usuari a req.usuari per a les rutes següents
const protegir = async (req, res, next) => { // Next te permite pasar al siguiente bloque si el token es válido
  let token = null;
  // Llegir token de l'header Authorization: "Bearer <token>"
  if (req.headers.authorization?.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1]; // Separar "Bearer" del token y nos quedamos con el token
  }
  if (!token) {
    return res.status(401).json({ error: 'No autoritzat: token absent' });
  }
  try {
    // Verificar signatura i caducitat; decoded conté el payload (p. ex. { id })
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.usuari = await Usuario.findById(decoded.id); // Sacamos el id del payload y buscamos el usuario en la base de datos para cargarlo en req.usuari
    if (!req.usuari) {
      return res.status(401).json({ error: 'Usuari no vàlid' });
    }
    next();  // Token vàlid: continuar cap al controlador
  } catch (err) {
    return res.status(401).json({ error: 'Token no vàlid o expirat' });
  }
};

export { protegir };