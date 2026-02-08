import TablaColaboradores from './components/tablaColaboradores.jsx';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-8">
          Gestión de Colaboradores
        </h1>
        <TablaColaboradores />
      </div>
    </div>
  )
}

export default App