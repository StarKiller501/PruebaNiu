import { createPool } from 'mysql2/promise'; // Usamos promesas para poder usar async/await
import dotenv from 'dotenv';

// Cargar las variables del archivo .env con dotenv
dotenv.config();

// Con el pool usamos múltiples conexiones y las reutilizamos
export const pool = createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: 3306 // Puerto de MySQL
});
