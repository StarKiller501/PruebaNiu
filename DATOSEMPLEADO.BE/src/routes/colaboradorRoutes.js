import { Router } from 'express';
import { getColaboradores, createColaborador, updateColaborador, deleteColaborador } from '../controllers/colaboradorController.js';

const router = Router();
//Defino los endpoints para cada método del CRUD
//Buscarlo en /src/controllers/colaboradorController.js
router.get('/colaborador', getColaboradores);
router.post('/colaborador', createColaborador);
router.put('/colaborador/:id', updateColaborador);
router.delete('/colaborador/:id', deleteColaborador);

export default router;