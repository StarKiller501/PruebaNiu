import { useEffect, useState } from 'react';
import { getColaboradores, deleteColaborador } from '../services/colaboradorService.js';

const TablaColaboradores = ({ refreshTrigger }) => {
    const [colaboradores, setColaboradores] = useState([]);

    // Estados para la paginación
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const LIMIT = 5; // Registros por página

    // Esta función carga los datos usando los fetches que creamos en el servicio
    const cargarDatos = async () => {
        const response = await getColaboradores(page, LIMIT);
        // Actualizamos estado con la nueva estructura
        if (response.data) {
            setColaboradores(response.data);
            setTotalPages(response.pagination.totalPaginas);
        } else {
            setColaboradores([]);
        }
    };

    // useEffect ejecuta esto al iniciar el componente
    useEffect(() => {
        cargarDatos();
    }, [page, refreshTrigger]);

    // Acá creamos la función eliminar que se va a ejecutar al hacer click en el botón eliminar de cada fila
    const handleDelete = async (id) => {
        if (window.confirm('¿Estás seguro de eliminar este colaborador?')) {
            const eliminado = await deleteColaborador(id);
            if (eliminado) {
                cargarDatos(); // Recargamos la lista después de eliminar
                alert('Colaborador eliminado correctamente');
            }
        }
    };
    // Cree esta función para verficar el rango de edad al colaborador
    const verificarRiesgo = (edad) => {
        if (edad >= 18 && edad <= 25) {
            alert("FUERA DE PELIGRO");
        } else if (edad >= 26 && edad <= 50) {
            alert("TENGA CUIDADO, TOME TODAS LAS MEDIDAS DE PREVENCIÓN");
        } else if (edad >= 51) {
            alert("POR FAVOR QUÉDESE EN CASA");
        } else {
            alert("EDAD NO VÁLIDA PARA ESTE ANÁLISIS");
        }
    };

    // Funciones para cambiar de página
    const handlePrev = () => {
        if (page > 1) setPage(page - 1);
    };

    const handleNext = () => {
        if (page < totalPages) setPage(page + 1);
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Lista de Colaboradores</h2>
                <button onClick={cargarDatos} className="text-blue-600 hover:text-blue-800 font-semibold text-sm">
                    Actualizar
                </button>
            </div>

            <div className="overflow-x-auto min-h-[300px]"> {/* Altura mínima para evitar saltos */}
                <table className="min-w-full text-sm text-left text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-100">
                        <tr>
                            <th className="px-6 py-3">Nombre</th>
                            <th className="px-6 py-3">Edad</th>
                            <th className="px-6 py-3">Profesión</th>
                            <th className="px-6 py-3 text-center">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {colaboradores.length > 0 ? (
                            colaboradores.map((colaborador) => (
                                <tr key={colaborador.IDCOLABORADOR} className="bg-white border-b hover:bg-gray-50">
                                    <td className="px-6 py-4 font-medium text-gray-900">
                                        {colaborador.NOMBRE} {colaborador.APELLIDO}
                                    </td>
                                    <td className="px-6 py-4">{colaborador.EDAD}</td>
                                    <td className="px-6 py-4">{colaborador.PROFESION}</td>
                                    <td className="px-6 py-4 flex justify-center gap-2">
                                        <button 
                                            onClick={() => verificarRiesgo(colaborador.EDAD)}
                                            className="bg-purple-100 text-purple-700 hover:bg-purple-200 px-3 py-1 rounded text-xs font-semibold"
                                        >
                                            Riesgo
                                        </button>
                                        <button 
                                            onClick={() => handleDelete(colaborador.IDCOLABORADOR)}
                                            className="bg-red-100 text-red-700 hover:bg-red-200 px-3 py-1 rounded text-xs font-semibold"
                                        >
                                            Eliminar
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="px-6 py-10 text-center text-gray-500">
                                    No hay colaboradores en esta página.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* --- CONTROLES DE PAGINACIÓN --- */}
            <div className="flex justify-between items-center mt-6 border-t pt-4">
                <span className="text-sm text-gray-600">
                    Página <span className="font-bold text-gray-900">{page}</span> de <span className="font-bold text-gray-900">{totalPages || 1}</span>
                </span>
                
                <div className="flex gap-2">
                    <button 
                        onClick={handlePrev}
                        disabled={page === 1}
                        className={`px-4 py-2 text-sm font-medium rounded-lg 
                            ${page === 1 
                                ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                                : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'}`}
                    >
                        Anterior
                    </button>
                    
                    <button 
                        onClick={handleNext}
                        disabled={page >= totalPages}
                        className={`px-4 py-2 text-sm font-medium rounded-lg 
                            ${page >= totalPages 
                                ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                                : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'}`}
                    >
                        Siguiente
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TablaColaboradores;