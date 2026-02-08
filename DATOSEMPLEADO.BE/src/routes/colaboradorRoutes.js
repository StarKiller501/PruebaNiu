import { Router } from 'express';
import { getColaboradores, createColaborador, updateColaborador, deleteColaborador } from '../controllers/colaboradorController.js';

import { verifyToken } from '../middlewares/authMiddleware.js';

const router = Router();
//dejo los endpoints para cada método del CRUD protegidas con el middleware
//Buscarlo en /src/controllers/colaboradorController.js
router.get('/colaborador', verifyToken, getColaboradores); 
router.post('/colaborador', verifyToken, createColaborador);
router.put('/colaborador/:id', verifyToken, updateColaborador);
router.delete('/colaborador/:id', verifyToken, deleteColaborador);

export default router;