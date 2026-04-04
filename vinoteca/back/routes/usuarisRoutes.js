import express from 'express';
import { getUsuaris, updateRolUsuari } from '../controladores/controlador.usuaris.js';
import { protegir, autoritzar } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/', protegir, autoritzar('admin'), getUsuaris);
router.patch('/:id/rol', protegir, autoritzar('admin'), updateRolUsuari);

export default router;
