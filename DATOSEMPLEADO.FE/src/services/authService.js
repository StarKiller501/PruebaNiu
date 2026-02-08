const API_URL = 'http://localhost:3000/auth';

export const login = async (email, password) => {
    const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Error al iniciar sesión');
    }

    const data = await response.json();
    
    //guardamos el token en el almacenamiento local del navegador
    if (data.token) {
        localStorage.setItem('token', data.token);
    }
    
    return data;
};

export const logout = () => {
    localStorage.removeItem('token'); // Borramos el token para salir
};

export const getToken = () => {
    return localStorage.getItem('token');
};

export const isAuthenticated = () => {
    return !!localStorage.getItem('token'); // Devuelve true si hay token
};