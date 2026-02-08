import { useEffect, useState } from 'react';
import { getColaboradores, deleteColaborador } from '../services/colaboradorService.js';

const TablaColaboradores = ({ refreshTrigger }) => {
    const [colaboradores, setColaboradores] = useState([]);

    // Esta función carga los datos usando los fetches que creamos en el servicio
    const cargarDatos = async () => {
        const data = await getColaboradores();
        setColaboradores(data);
    };

    // useEffect ejecuta esto al iniciar el componente
    useEffect(() => {
        cargarDatos();
    }, [refreshTrigger]);

    // Acá creamos la función eliminar que se va a ejecutar al hacer click en el botón eliminar de cada fila
    const handleDelete = async (id) => {
        if (window.confirm('¿Estás seguro de eliminar este colaborador?')) {
            const eliminado = await deleteColaborador(id);
            if (eliminado) {
                setColaboradores(colaboradores.filter(c => c.IDCOLABORADOR !== id));
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

    return (
        <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Lista de Colaboradores</h2>
                <button
                    onClick={cargarDatos}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-200 flex items-center gap-2"
                >
                    {/* Icono de recarga simple */}
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                    </svg>
                    Cargar Colaboradores
                </button>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full text-sm text-left text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-100">
                        <tr>
                            <th className="px-6 py-3">Nombre</th>
                            <th className="px-6 py-3">Apellido</th>
                            <th className="px-6 py-3">Dirección</th>
                            <th className="px-6 py-3">Edad</th>
                            <th className="px-6 py-3">Profesión</th>
                            <th className="px-6 py-3">Estado Civil</th>
                            <th className="px-6 py-3 text-center">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {colaboradores.length > 0 ? (
                            colaboradores.map((colaborador) => (
                                <tr key={colaborador.IDCOLABORADOR} className="bg-white border-b hover:bg-gray-50">
                                    <td className="px-6 py-4 font-medium text-gray-900">{colaborador.NOMBRE}</td>
                                    <td className="px-6 py-4">{colaborador.APELLIDO}</td>
                                    <td className="px-6 py-4">{colaborador.DIRECCION}</td>
                                    <td className="px-6 py-4">{colaborador.EDAD}</td>
                                    <td className="px-6 py-4">{colaborador.PROFESION}</td>
                                    <td className="px-6 py-4">{colaborador.ESTADOCIVIL}</td>
                                    <td className="px-6 py-4 flex justify-center gap-2">
                                        {/* Botón de Riesgo */}
                                        <button
                                            onClick={() => verificarRiesgo(colaborador.EDAD)}
                                            className="bg-purple-100 text-purple-700 hover:bg-purple-200 px-3 py-1 rounded text-xs font-semibold border border-purple-200"
                                            title="Ver Nivel de Riesgo"
                                        >
                                            Riesgo
                                        </button>

                                        {/* Botón Eliminar */}
                                        <button
                                            onClick={() => handleDelete(colaborador.IDCOLABORADOR)}
                                            className="bg-red-100 text-red-700 hover:bg-red-200 px-3 py-1 rounded text-xs font-semibold border border-red-200"
                                        >
                                            Eliminar
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="7" className="px-6 py-10 text-center text-gray-500">
                                    No hay colaboradores registrados.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TablaColaboradores;