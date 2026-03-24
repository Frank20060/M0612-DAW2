import express from 'express';
import { crearPedido, getMisPedidos, getPedidos } from '../controladores/controlador.pedido.js';
import { protegir, autoritzar } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/', protegir, crearPedido);
router.get('/me', protegir, getMisPedidos);
router.get('/', protegir, autoritzar('admin'), getPedidos);

export default router;
