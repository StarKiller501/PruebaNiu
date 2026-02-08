import { createPool } from 'mysql2/promise';
import dotenv from 'dotenv';

//cargamos las variables del archivo .env con dotenv
dotenv.config();

//con el pool usamos múltiples conexiones y las reutilizamos
export const pool = createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: 3306, //puerto de MySQL
    connectionLimit: 10,
    waitForConnections: true,
    queueLimit: 0
});
