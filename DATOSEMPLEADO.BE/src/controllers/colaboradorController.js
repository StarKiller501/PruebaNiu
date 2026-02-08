import {pool} from '../config/db.js';

// Creo el get para todos select * from colaborador
export const getColaboradores = async (req, res) => {
    try {
        // Leemos los parámetros de la URL (ej: ?page=1&limit=5)
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 5;
        const offset = (page - 1) * limit; // Calculamos desde dónde empezar a leer

        //obtenemos el TOTAL de registros (para saber cuántas páginas hay)
        const [totalResult] = await pool.query('SELECT COUNT(*) as total FROM COLABORADOR');
        const totalRegistros = totalResult[0].total;
        const totalPaginas = Math.ceil(totalRegistros / limit);

        //aca solo obtenemos los registros de esta página
        // Usamos LIMIT y OFFSET para cortar los datos
        const [rows] = await pool.query('SELECT * FROM COLABORADOR LIMIT ? OFFSET ?', [limit, offset]);

        // Devolvemos un objeto con los datos Y la información de paginación
        res.json({
            data: rows,
            pagination: {
                page,
                limit,
                totalRegistros,
                totalPaginas
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener datos', error });
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