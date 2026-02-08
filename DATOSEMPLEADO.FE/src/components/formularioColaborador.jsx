import { useState } from 'react';
import { createColaborador } from '../services/colaboradorService.js';

const FormularioColaborador = ({ onColaboradorAgregado }) => {
    // Estado inicial del formulario
    const initialState = {
        nombre: '',
        apellido: '',
        direccion: '',
        edad: '',
        profesion: '',
        estadocivil: ''
    };

    const [formData, setFormData] = useState(initialState);
    const [error, setError] = useState('');

    // Manejar cambios en los inputs
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    // manejamos el envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        //validación en el lado del frontend
        if (!formData.nombre || !formData.apellido || !formData.edad) {
            setError('Nombre, Apellido y Edad son obligatorios.');
            return;
        }

        if (parseInt(formData.edad) <= 0) {
            setError('La edad debe ser un número mayor a 0.');
            return;
        }

        //enviamos al back usando el servicio que creamos
        try {
            await createColaborador({
                ...formData,
                edad: parseInt(formData.edad) //aseguramos que sea número
            });
            
            //limpiar formulario y notificar éxito
            setFormData(initialState);
            alert('Colaborador agregado correctamente');
            
            //esta función avisa al padre (App) que recargue la tabla
            if (onColaboradorAgregado) onColaboradorAgregado();

        } catch (err) {
            setError(err.message || 'Error al guardar el colaborador');
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
            <h2 className="text-xl font-bold mb-4 text-gray-800 border-b pb-2">Agregar Nuevo Colaborador</h2>
            
            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Nombre */}
                <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">Nombre *</label>
                    <input 
                        type="text" name="nombre" value={formData.nombre} onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>

                {/* Apellido */}
                <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">Apellido *</label>
                    <input 
                        type="text" name="apellido" value={formData.apellido} onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>

                {/* Edad */}
                <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">Edad *</label>
                    <input 
                        type="number" name="edad" value={formData.edad} onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>

                {/* Dirección */}
                <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">Dirección</label>
                    <input 
                        type="text" name="direccion" value={formData.direccion} onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>

                {/* Profesión */}
                <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">Profesión</label>
                    <input 
                        type="text" name="profesion" value={formData.profesion} onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>

                {/* Estado Civil */}
                <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">Estado Civil</label>
                    <select 
                        name="estadocivil" value={formData.estadocivil} onChange={handleChange}
                        className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white"
                    >
                        <option value="">Seleccione...</option>
                        <option value="Soltero">Soltero(a)</option>
                        <option value="Casado">Casado(a)</option>
                        <option value="Divorciado">Divorciado(a)</option>
                        <option value="Viudo">Viudo(a)</option>
                    </select>
                </div>

                {/* Botón de Enviar (Ocupa las 2 columnas en pantallas grandes) */}
                <div className="md:col-span-2 mt-4">
                    <button 
                        type="submit"
                        className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-200"
                    >
                        Agregar Colaborador
                    </button>
                </div>
            </form>
        </div>
    );
};

export default FormularioColaborador;