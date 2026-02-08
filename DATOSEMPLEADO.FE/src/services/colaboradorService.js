//La URL base del API Backend
const API_URL = 'http://localhost:3000/colaborador';

//Hacemos un get para obtener la lista de colaboradores
export const getColaboradores = async () => {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error('Error al cargar colaboradores');
        return await response.json();
    } catch (error) {
        console.error(error);
        return []; // Retornamos un array vacío para que la tabla no se arruine
    }
};

//Creamos el metódo post
export const createColaborador = async (colaborador) => {
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(colaborador),
        });
        
        // Si el backend responde con error, lanzamos el error
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Error al crear');
        }

        return await response.json();
    } catch (error) {
        throw error; // Re-lanzamos el error para que el formulario lo muestre
    }
};

//Hacemos el put
// Recibe el ID y el objeto con los datos nuevos
export const updateColaborador = async (id, colaborador) => {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(colaborador),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Error al actualizar');
        }

        return await response.json();
    } catch (error) {
        throw error;
    }
};

//Hacemos el metodo delete
export const deleteColaborador = async (id) => {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE',
        });

        if (!response.ok) throw new Error('Error al eliminar');
        return true; // Retornamos true si se borró con exito
    } catch (error) {
        console.error(error);
        return false;
    }
};
