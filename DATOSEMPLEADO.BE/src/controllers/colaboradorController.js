import {pool} from '../config/db.js';

// Creo el get para todos select * from colaborador
export const getColaboradores = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM COLABORADOR');
        res.json(rows);
    } catch (error) {
        res.status(500).json({message: 'Error al obtener datos', error });
    }
};

// Creo el post
export const createColaborador = async (req, res) => {
    const {nombre, apellido, direccion, edad, profesion, estadocivil} = req.body;

    if (!nombre || !apellido || !edad) {
        return res.status(400).json({message: 'Nombre, apellido y edad son obligatorios' });
    }
    if (edad <= 0 || isNaN(edad)) {
        return res.status(400).json({message: 'Edad debe ser mayor a 0' });
    }
    try {
        const [result] = await pool.query(
            'INSERT INTO COLABORADOR (NOMBRE, APELLIDO, DIRECCION, EDAD, PROFESION, ESTADOCIVIL) VALUES (?, ?, ?, ?, ?, ?)',
            [nombre, apellido, direccion, edad, profesion, estadocivil]
        );
        res.status(201).json({
            id: result.insertId,
            nombre, apellido, direccion, edad, profesion, estadocivil
        });
    } catch (error) {
        res.status(500).json({ message: 'Error al guardar', error });
    }
};

// Creo el put para actualizar la info de la bd
export const updateColaborador = async (req, res) => {
    const { id } = req.params;
    const { nombre, apellido, direccion, edad, profesion, estadocivil } = req.body;

    if (edad && (edad <= 0 || isNaN(edad))) {
        return res.status(400).json({ message: 'La edad debe ser mayor a 0' });
    }
    try {
        const [result] = await pool.query(
            'UPDATE COLABORADOR SET NOMBRE = ?, APELLIDO = ?, DIRECCION = ?, EDAD = ?, PROFESION = ?, ESTADOCIVIL = ? WHERE IDCOLABORADOR = ?',
            [nombre, apellido, direccion, edad, profesion, estadocivil, id]
        );

        if (result.affectedRows === 0) 
            return res.status(404).json({ message: 'Colaborador no encontrado' });
        res.json({ message: 'Colaborador actualizado correctamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar', error });
    }
};

// Creo el delete para eliminar un colaborador de la bd
export const deleteColaborador = async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await pool.query('DELETE FROM COLABORADOR WHERE IDCOLABORADOR = ?', [id]);
        
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Colaborador no encontrado' });
        
        res.json({ message: 'Colaborador eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar', error });
    }
};