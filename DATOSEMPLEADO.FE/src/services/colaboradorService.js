const API_URL = 'http://localhost:3000/colaborador'; //La URL base del API Backend

//Función para obtener los headers con el token
const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    return {
        'Content-Type': 'application/json',
        'Authorization': token ? `Bearer ${token}` : '' // aca va el token
    };
};

//Hacemos un get para obtener la lista de colaboradores
export const getColaboradores = async (page = 1, limit = 5) => {
    try {
        // Agregamos los parámetros a la URL
        const response = await fetch(`${API_URL}?page=${page}&limit=${limit}`, {
            method: 'GET',
            headers: getAuthHeaders()
        });
        
        if (!response.ok) throw new Error('Error al cargar (Posiblemente Auth)');
        
        return await response.json(); 
        // Nota: Ahora esto devuelve { data: [...], pagination: {...} }
    } catch (error) {
        console.error(error);
        // Si falla, devolvemos una estructura vacía segura
        return { data: [], pagination: { totalPaginas: 0 } };
    }
};

//Creamos el metódo post
export const createColaborador = async (colaborador) => {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: getAuthHeaders(), 
        body: JSON.stringify(colaborador),
    });
        // Si el backend responde con error, lanzamos el error
        if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al crear');
    }
    return await response.json();
};

//Hacemos el put
// Recibe el ID y el objeto con los datos nuevos
export const updateColaborador = async (id, colaborador) => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: getAuthHeaders(), 
        body: JSON.stringify(colaborador),
    });

       if (!response.ok) throw new Error('Error al actualizar');
    return await response.json();
};

//Hacemos el metodo delete
export const deleteColaborador = async (id) => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders() 
    });
    if (!response.ok) throw new Error('Error al eliminar');
    return true;
};
