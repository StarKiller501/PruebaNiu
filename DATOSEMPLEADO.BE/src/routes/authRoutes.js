import { Router } from 'express';
import { login, register } from '../controllers/authController.js';

const router = Router();

router.post('/register', register); // Crear usuario
router.post('/login', login);       // Obtener token

export default router;