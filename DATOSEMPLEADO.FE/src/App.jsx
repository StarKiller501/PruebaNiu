function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <h1 className="text-4xl font-bold text-blue-600 mb-4">
          Frontend Listo
        </h1>
        <p className="text-gray-600 text-lg">
          Si ves este texto azul y centrado, Tailwind está funcionando.
        </p>
        <button className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition">
          Botón de Prueba
        </button>
      </div>
    </div>
  )
}

export default App