import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer';

// Configurar Cloudinary amb les credencials del .env
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key:    process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// memoryStorage: Multer desa el fitxer en RAM (buffer), no al disc
// Així podem enviar-lo a Cloudinary sense deixar residus al sistema de fitxers
const storage = multer.memoryStorage();

// fileFilter: rebutjar fitxers que no siguin imatges (seguretat)
const fileFilter = (req, file, cb) => {
  const allowed = /jpeg|jpg|png|gif|webp/i.test(file.mimetype);
  if (allowed) {
    cb(null, true);
  } else {
    cb(new Error('Tipus de fitxer no permès. Només imatges.'), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB màxim
});

// Funció auxiliar: puja el buffer de Multer a Cloudinary i retorna la URL pública
// Retorna una Promise per poder usar-la amb await als controladors
export const uploadToCloudinary = (buffer, folder = 'vinoteca') => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder }, // carpeta a Cloudinary (organització)
      (error, result) => {
        if (error) return reject(error);
        resolve(result.secure_url); // URL https permanent
      }
    );
    stream.end(buffer); // enviem el buffer al stream
  });
};

export default upload;