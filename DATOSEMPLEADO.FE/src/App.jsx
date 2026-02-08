import { useState } from 'react';
import TablaColaboradores from './components/tablaColaboradores.jsx';
import FormularioColaborador from './components/formularioColaborador.jsx';

function App() {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleColaboradorAgregado = () => {
    setRefreshKey(prev => prev + 1); // Cambia el valor para forzar recarga de datos
  };

 return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="container mx-auto max-w-4xl">
        <h1 className="text-4xl font-extrabold text-center text-blue-700 mb-8 drop-shadow-sm">
          Gestión de Colaboradores
        </h1>
        
        {/* El Formulario recibe la función para avisar cuando termine */}
        <FormularioColaborador onColaboradorAgregado={handleColaboradorAgregado} />
        
        {/* La Tabla recibe la "señal" (refreshKey) para saber cuándo recargar */}
        <TablaColaboradores refreshTrigger={refreshKey} />
      </div>
    </div>
  )
}

export default App