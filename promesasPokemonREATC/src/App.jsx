import React from "react";
import { useState } from "react";
import { ButtonsDiv } from "./components/ButtonDiv";
import { DivCards } from "./components/DivContainer";
function App() {
  const urlApi = "https://pokeapi.co/api/v2/pokemon/";
  const [pokemons, setPokemons] = useState([]);
  const [time1, setTime1] = useState(0);
  const [time2, setTime2] = useState(0);
  const [time3, setTime3] = useState(0);
  function button1Click() {
    setPokemons([]);
    // Lógica para el botón 1 --- .then/.catch/.finally
    console.clear();
    console.log("Botón 1 clickeado");
    const startTime = performance.now();
    fetch(urlApi + "1")
      .then((response) => response.json())
      .then((pokemon1) => {
        console.log(pokemon1);
        setPokemons((prev) => [...prev, pokemon1]);
        fetch(urlApi + "2")
          .then((response) => response.json())
          .then((pokemon2) => {
            console.log(pokemon2);
            setPokemons((prev) => [...prev, pokemon2]);
            fetch(urlApi + "3")
              .then((response) => response.json())
              .then((pokemon3) => {
                console.log(pokemon3);
                setPokemons((prev) => [...prev, pokemon3]);
                fetch(urlApi + "4")
                  .then((response) => response.json())
                  .then((pokemon4) => {
                    console.log(pokemon4);
                    setPokemons((prev) => [...prev, pokemon4]);
                    fetch(urlApi + "5")
                      .then((response) => response.json())
                      .then((pokemon5) => {
                        console.log(pokemon5);
                        setPokemons((prev) => [...prev, pokemon5]);
                        fetch(urlApi + "6")
                          .then((response) => response.json())
                          .then((pokemon6) => {
                            console.log(pokemon6);
                            setPokemons((prev) => [...prev, pokemon6]);
                            fetch(urlApi + "7")
                              .then((response) => response.json())
                              .then((pokemon7) => {
                                console.log(pokemon7);
                                setPokemons((prev) => [...prev, pokemon7]);
                                fetch(urlApi + "8")
                                  .then((response) => response.json())
                                  .then((pokemon8) => {
                                    console.log(pokemon8);
                                    setPokemons((prev) => [...prev, pokemon8]);
                                    fetch(urlApi + "9")
                                      .then((response) => response.json())
                                      .then((pokemon9) => {
                                        console.log(pokemon9);
                                        setPokemons((prev) => [
                                          ...prev,
                                          pokemon9,
                                        ]);
                                        fetch(urlApi + "10")
                                          .then((response) => response.json())
                                          .then((pokemon10) => {
                                            console.log(pokemon10);
                                            setPokemons((prev) => [
                                              ...prev,
                                              pokemon10,
                                            ]);
                                            fetch(urlApi + "11")
                                              .then((response) =>
                                                response.json(),
                                              )
                                              .then((pokemon11) => {
                                                console.log(pokemon11);
                                                setPokemons((prev) => [
                                                  ...prev,
                                                  pokemon11,
                                                ]);
                                                fetch(urlApi + "12")
                                                  .then((response) =>
                                                    response.json(),
                                                  )
                                                  .then((pokemon12) => {
                                                    console.log(pokemon12);
                                                    setPokemons((prev) => [
                                                      ...prev,
                                                      pokemon12,
                                                    ]);
                                                    const endTime =
                                                      performance.now();
                                                    const elapsedTime =
                                                      Math.round(
                                                        endTime - startTime,
                                                      );
                                                    console.log(
                                                      `Tiempo transcurrido: ${elapsedTime} ms`,
                                                    );
                                                    setTime1(elapsedTime);
                                                  });
                                              });
                                          });
                                      });
                                  });
                              });
                          });
                      });
                  });
              });
          });
      })
      .catch((error) => console.error(error));
  }

  function button2Click() {
    // Lógica para el botón 2 --- Async/await
    console.log("Botón 2 clickeado");
  }

  function button3Click() {
    // Lógica para el botón 3 --- Promise.All
    console.log("Botón 3 clickeado");
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

        <ButtonsDiv
          button1Click={button1Click}
          button2Click={button2Click}
          button3Click={button3Click}
          time1={time1}
          time2={time2}
          time3={time3}
        />
        {/* Contenedor de cartas */}
        <DivCards pokemons={pokemons} />
      </div>
    </div>
  );
}

export default App;
