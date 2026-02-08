import { useState } from 'react';
import { login } from '../services/authService';

const Login = ({ onLoginSuccess }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            await login(email, password);
            onLoginSuccess(); // Avisamos que ya entramos
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-200">
            <div className="bg-white p-8 rounded-lg shadow-md w-96">
                <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">Iniciar Sesión</h2>
                
                {error && <div className="bg-red-100 text-red-700 p-2 rounded mb-4 text-sm">{error}</div>}
                
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
                        <input 
                            type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-2 border rounded focus:outline-blue-500"
                            placeholder="admin@test.com"
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Contraseña</label>
                        <input 
                            type="password" value={password} onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-2 border rounded focus:outline-blue-500"
                            placeholder="******"
                            required
                        />
                    </div>
                    <button type="submit" className="w-full bg-blue-600 text-white font-bold py-2 rounded hover:bg-blue-700">
                        Entrar
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;