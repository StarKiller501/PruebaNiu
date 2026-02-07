import express from 'express';
import { pool } from './config/db.js';
import dotenv from 'dotenv';
import cors from 'cors';
import colaboradorRoutes from './routes/colaboradorRoutes.js'; //ruta para el uso del CRUD

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors()); 
app.use(express.json());

app.use(colaboradorRoutes);

app.get('/ping', async (req, res) => {
    try {
        const [result] = await pool.query('SELECT 1 + 1 AS solution');
        res.json({ mensaje: 'Conexión exitosa', resultado: result[0].solution });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error BD', error });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});