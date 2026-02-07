import express from 'express';
import { pool } from './config/db.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para entender JSON para post
app.use(express.json());

// Ruta de prueba para verificar conexión a DB
app.get('/ping', async (req, res) => {
    try {
        // una consulta simple 1 + 1 a la base de datos para probar la conexión 
        const [result] = await pool.query('SELECT 1 + 1 AS solution');
        res.json({ 
            mensaje: 'Conexión exitosa a la base de datos', 
            resultado: result[0].solution 
        });
    } catch (error) {
        res.status(500).json({ 
            mensaje: 'Error conectando a la BD', 
            error: error.message 
        });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});