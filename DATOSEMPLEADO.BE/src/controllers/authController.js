import { pool } from '../config/db.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

//aca vamos a registrar el usuario desde el login
export const register = async (req, res) => {
    const { email, password } = req.body;

    try {
        //validamos que vengan los datos
        if (!email || !password) {
            return res.status(400).json({ message: 'Email y password son obligatorios' });
        }

        const [existingUser] = await pool.query('SELECT * FROM USUARIO WHERE EMAIL = ?', [email]);
        if (existingUser.length > 0) {
            return res.status(400).json({ message: 'El usuario ya existe' });
        }

        // Encriptar la contraseña
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Guardar en bd
        await pool.query('INSERT INTO USUARIO (EMAIL, PASSWORD) VALUES (?, ?)', [email, hashedPassword]);

        res.status(201).json({ message: 'Usuario registrado exitosamente' });

    } catch (error) {
        res.status(500).json({ message: 'Error al registrar usuario', error });
    }
};

//aca ya inicia el inicio de sesión
export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Buscar el usuario
        const [rows] = await pool.query('SELECT * FROM USUARIO WHERE EMAIL = ?', [email]);
        
        if (rows.length === 0) {
            return res.status(401).json({ message: 'Credenciales inválidas (Usuario no encontrado)' });
        }

        const user = rows[0];

        // compara la contraseña en texto plano con la contraseña encriptada en la base de datos
        const validPassword = await bcrypt.compare(password, user.PASSWORD);
        
        if (!validPassword) {
            return res.status(401).json({ message: 'Credenciales inválidas (Contraseña incorrecta)' });
        }

        // genera el token jwt
        const token = jwt.sign(
            { id: user.IDUSUARIO, email: user.EMAIL },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.json({ 
            message: 'Login exitoso',
            token 
        });

    } catch (error) {
        res.status(500).json({ message: 'Error en el servidor', error });
    }
};