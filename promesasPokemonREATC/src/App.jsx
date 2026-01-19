import React from "react";
import { ButtonsDiv } from "./components/ButtonDiv";  
import { divCards } from "./components/DivContainer";
function App() {
  const urlApi = "https://pokeapi.co/api/v2/pokemon/";

  function button1Click() {
    // Lógica para el botón 1 --- .then/.catch/.finally
  }

  function button2Click() {
    // Lógica para el botón 2 --- Async/await
  }

  function button3Click() {
    // Lógica para el botón 3 --- Promise.All
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-black text-white p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-6xl font-black mb-2 bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent drop-shadow-lg">
            ⚡ PokePromesas ⚡
          </h1>
          <p className="text-lg text-gray-300">
            Descubre el poder de las promesas en JavaScript
          </p>
        </div>

        <ButtonsDiv />
        {/* Contenedor de cartas */}
        <divCards />


      </div>
    </div>
  );
}

export default App;
