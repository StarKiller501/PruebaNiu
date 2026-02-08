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
        <div className="bg-white p-4 md:p-6 rounded-lg shadow-lg">
            {/* ENCABEZADO: se adapta (Columna en móvil, Fila en PC) */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                <h2 className="text-xl md:text-2xl font-bold text-gray-800 text-center md:text-left">
                    Lista de Colaboradores
                </h2>
                <button 
                    onClick={cargarDatos} 
                    className="w-full md:w-auto bg-blue-100 text-blue-600 hover:bg-blue-200 px-4 py-2 rounded-lg font-semibold transition"
                >
                    Actualizar
                </button>
            </div>

            {/* --- VISTA MÓVIL (TARJETAS) --- */}
            {/* Visible solo en pantallas pequeñas (md:hidden) */}
            <div className="grid grid-cols-1 gap-4 md:hidden">
                {colaboradores.length > 0 ? (
                    colaboradores.map((colaborador) => (
                        <div key={colaborador.IDCOLABORADOR} className="bg-gray-50 p-4 rounded-lg border border-gray-200 shadow-sm relative">
                            {/* Borde decorativo lateral */}
                            <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500 rounded-l-lg"></div>
                            
                            <div className="space-y-2 pl-2">
                                <div className="flex justify-between">
                                    <span className="text-xs font-bold text-gray-500 uppercase">Nombre:</span>
                                    <span className="font-medium text-gray-900">{colaborador.NOMBRE} {colaborador.APELLIDO}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-xs font-bold text-gray-500 uppercase">Edad:</span>
                                    <span className="text-gray-700">{colaborador.EDAD} años</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-xs font-bold text-gray-500 uppercase">Profesión:</span>
                                    <span className="text-gray-700">{colaborador.PROFESION}</span>
                                </div>
                                
                                {/* Botones de Acción en Móvil (Grandes para tocar fácil) */}
                                <div className="pt-4 flex gap-2">
                                    <button 
                                        onClick={() => verificarRiesgo(colaborador.EDAD)}
                                        className="flex-1 bg-purple-100 text-purple-700 py-2 rounded text-sm font-bold active:bg-purple-200"
                                    >
                                        Riesgo
                                    </button>
                                    <button 
                                        onClick={() => handleDelete(colaborador.IDCOLABORADOR)}
                                        className="flex-1 bg-red-100 text-red-700 py-2 rounded text-sm font-bold active:bg-red-200"
                                    >
                                        Eliminar
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-gray-500">No hay datos.</p>
                )}
            </div>

            {/* --- VISTA ESCRITORIO (TABLA) --- */}
            {/* Visible solo en pantallas medianas hacia arriba (hidden md:block) */}
            <div className="hidden md:block overflow-x-auto min-h-[300px]">
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
                                            className="bg-purple-100 text-purple-700 hover:bg-purple-200 px-3 py-1 rounded text-xs font-semibold transition"
                                        >
                                            Riesgo
                                        </button>
                                        <button 
                                            onClick={() => handleDelete(colaborador.IDCOLABORADOR)}
                                            className="bg-red-100 text-red-700 hover:bg-red-200 px-3 py-1 rounded text-xs font-semibold transition"
                                        >
                                            Eliminar
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="px-6 py-10 text-center text-gray-500">
                                    No hay colaboradores.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* CONTROLES DE PAGINACIÓN (Responsivos) */}
            <div className="flex flex-col md:flex-row justify-between items-center mt-6 border-t pt-4 gap-4">
                <span className="text-sm text-gray-600 order-2 md:order-1">
                    Página <span className="font-bold text-gray-900">{page}</span> de <span className="font-bold text-gray-900">{totalPages || 1}</span>
                </span>
                
                <div className="flex gap-2 w-full md:w-auto order-1 md:order-2">
                    <button 
                        onClick={handlePrev}
                        disabled={page === 1}
                        className={`flex-1 md:flex-none px-4 py-2 text-sm font-medium rounded-lg 
                            ${page === 1 
                                ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                                : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300 shadow-sm'}`}
                    >
                        Anterior
                    </button>
                    
                    <button 
                        onClick={handleNext}
                        disabled={page >= totalPages}
                        className={`flex-1 md:flex-none px-4 py-2 text-sm font-medium rounded-lg 
                            ${page >= totalPages 
                                ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                                : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300 shadow-sm'}`}
                    >
                        Siguiente
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TablaColaboradores;