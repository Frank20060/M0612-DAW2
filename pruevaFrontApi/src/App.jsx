import { useState } from "react";

function App() {
  const URL_API = "http://localhost:3000/api/alumnos";
  const [resultado, setResultado] = useState("Preparado");

  async function leerAlumons() {
    console.log("fetch API");
    setResultado("Clickado");
    try {
      const respuesta = await fetch(URL_API);
      const datos = await respuesta.json();
      setResultado(JSON.stringify(datos, null, 2)); // formato bonito
    } catch (error) {
      setResultado("Error: " + error.message);
    }
  }

  async function leerAlumonsPorID() {
    console.log("fetch API por ID");
    setResultado("Clickado por ID");
    try {
      const respuesta = await fetch(URL_API + "/6978f3b912526debe994cb95");
      const datos = await respuesta.json();
      setResultado(JSON.stringify(datos, null, 2));
    } catch (error) {
      setResultado("Error: " + error.message);
    }
  }

  return (
    <div className="min-h-screen bg-linear-to-b from-blue-50 to-blue-100 flex flex-col items-center justify-start p-10 font-sans">
      <h1 className="text-4xl font-bold text-blue-800 mb-8">App Alumnos</h1>
      
      <div className="flex flex-row gap-4 mb-8">
        <button
          onClick={leerAlumons}
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg shadow-md transition-colors"
        >
          Leer Alumnos
        </button>
        <button
          onClick={leerAlumonsPorID}
          className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg shadow-md transition-colors"
        >
          Ver Alumno por ID
        </button>
      </div>

      <div className="w-full max-w-2xl bg-white p-6 rounded-xl shadow-lg overflow-x-auto">
        <pre className="text-gray-700 whitespace-pre-wrap">{resultado}</pre>
      </div>
    </div>
  );
}

export default App;
