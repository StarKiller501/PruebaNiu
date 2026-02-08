import { useEffect, useState } from 'react';
import { getColaboradores, deleteColaborador } from '../services/colaboradorService.js';

const tablaColaboradores = () => {
    const [colaboradores, setColaboradores] = useState([]);

    // Esta función carga los datos usando los fetches que creamos en el servicio
    const cargarDatos = async () => {
        const data = await getColaboradores();
        setColaboradores(data);
    };

    // useEffect ejecuta esto al iniciar el componente
    useEffect(() => {
        cargarDatos();
    }, []);

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">Lista de Colaboradores</h2>
            <div className="bg-white shadow-md rounded my-6 overflow-x-auto">
                {/* Aquí imprimiremos el JSON crudo por ahora para probar conexión */}
                <pre>{JSON.stringify(colaboradores, null, 2)}</pre>
            </div>
        </div>
    );
};

export default tablaColaboradores;