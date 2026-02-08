import { useState, useEffect } from 'react';
import TablaColaboradores from './components/tablaColaboradores';
import FormularioColaborador from './components/formularioColaborador';
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
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 md:mb-8 gap-4">
          <h1 className="text-2xl md:text-4xl font-extrabold text-blue-700 text-center md:text-left drop-shadow-sm">
            Gestión de Colaboradores
          </h1>
          <button
            onClick={handleLogout}
            className="w-full md:w-auto bg-red-500 hover:bg-red-600 text-white text-sm font-bold py-3 md:py-2 px-4 rounded shadow-md transition"
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