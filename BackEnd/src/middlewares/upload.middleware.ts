// src/middlewares/upload.middleware.ts
import multer from 'multer';
import path from 'path';

// Usamos almacenamiento en memoria para obtener Buffer directamente
const storage = multer.memoryStorage();

// Filtro para aceptar solo .mp3
const fileFilter = (_req: any, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  const ext = path.extname(file.originalname).toLowerCase();
  if (ext !== '.mp3') {
    return cb(new Error('Solo se permiten archivos MP3'));
  }
  cb(null, true);
};

export const uploadMp3 = multer({
  storage,
  fileFilter,
  limits: { fileSize: 50 * 1024 * 1024 } // Límite 50 MB
});
