import path from 'path';
import { fileURLToPath } from 'url';
import multer from 'multer';

// Amb ES Modules no existeix __dirname; es construeix des de import.meta.url
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Carpeta on es guardaran els fitxers pujats (relativa a la ubicació d'aquest fitxer)
const dest = path.join(__dirname, '../../uploads');

// diskStorage: guardar a disc; destination = carpeta, filename = nom del fitxer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // 1) Indiquem a Multer la carpeta física de destí
    cb(null, dest);
  },
  filename: (req, file, cb) => {
    // 2) Nom únic i sanejat per evitar problemes amb caràcters especials o accents
    const original = file.originalname || 'fitxer';
    const sanitized = original
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "") // Elimina accents
      .replace(/[^a-zA-Z0-9.\-_]/g, ""); // Manté només alfanumèrics i punt/guió
    
    const unique = Date.now() + '-' + sanitized;
    cb(null, unique);
  }
});

// fileFilter: rebutjar fitxers que no siguin imatges (seguretat)
const fileFilter = (req, file, cb) => {
  // El MIME type ve informat pel client; és una primera validació (no infal·lible)
  const allowed = /jpeg|jpg|png|gif|webp/i.test(file.mimetype);
  if (allowed) {
    // Fitxer acceptat
    cb(null, true);
  } else {
    // Fitxer rebutjat: el controlador no s'executarà amb fitxer vàlid
    cb(new Error('Tipus de fitxer no permès. Només imatges.'), false);
  }
};

const upload = multer({
  storage,      // On i com es desa el fitxer
  fileFilter,   // Quin tipus de fitxer permetem
  limits: { fileSize: 5 * 1024 * 1024 }  // 5 MB màxim
});

export default upload;