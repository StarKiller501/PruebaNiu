import { useState, useEffect } from 'react';
import TablaColaboradores from './components/TablaColaboradores';
import FormularioColaborador from './components/FormularioColaborador';
import Login from './components/Login';
import { isAuthenticated, logout } from './services/authService';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  // Al cargar la página, verificamos si ya hay un token guardado
  useEffect(() => {
    setIsLoggedIn(isAuthenticated());
  }, []);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    logout();
    setIsLoggedIn(false);
  };

  const handleColaboradorAgregado = () => {
    setRefreshKey(prev => prev + 1); // cambia valor para forzar recarga de tabla
  };

  // Si NO está logueado, mostramos el Login y nada más
  if (!isLoggedIn) {
    return <Login onLoginSuccess={handleLoginSuccess} />;
  }

  // Si SÍ está logueado, mostramos la tabla
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="container mx-auto max-w-4xl">
        <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-extrabold text-blue-700 drop-shadow-sm">
            Gestión de Colaboradores
            </h1>
            <button 
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white text-sm font-bold py-2 px-4 rounded"
            >
                Cerrar Sesión
            </button>
        </div>
        
        <FormularioColaborador onColaboradorAgregado={handleColaboradorAgregado} />
        <TablaColaboradores refreshTrigger={refreshKey} />
      </div>
    </div>
  );
}

export default App;