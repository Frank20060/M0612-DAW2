import { useEffect, useState } from "react";
import { BarraBusqueda } from "./components/BarraBusqueda";
import { BotonBuscar } from "./components/BotonBuscar";
import { PantallaClima } from "./components/PantallaClima";

// Componente principal
export function App() {
  const [provincias, setProvincias] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [sugerencias, setSugerencias] = useState([]);
  const [provSeleccionada, setProvSeleccionada] = useState(null);
  const [tiempo, setTiempo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchProvincias() {
      try {
        const res = await fetch("https://api.el-tiempo.net/json/v3/provincias");
        const data = await res.json();
        setProvincias(data.provincias);
      } catch (err) {
        console.error("Error al cargar provincias:", err);
      }
    }
    fetchProvincias();
  }, []);

  useEffect(() => {
    if (busqueda.trim() === "") {
      setSugerencias([]);
    } else {
      setSugerencias(
        provincias.filter((p) =>
          p.NOMBRE_PROVINCIA.toLowerCase().includes(busqueda.toLowerCase()),
        ),
      );
    }
  }, [busqueda, provincias]);

  const seleccionarProvincia = (prov) => {
    setBusqueda(prov.NOMBRE_PROVINCIA);
    setProvSeleccionada(prov);
    setSugerencias([]);
  };

  const buscarTiempo = async () => {
    if (!provSeleccionada) {
      alert("Selecciona una provincia");
      return;
    }
    setIsLoading(true);
    try {
      const res = await fetch(
        `https://api.el-tiempo.net/json/v3/provincias/${provSeleccionada.CODPROV}`,
      );
      const data = await res.json();
      setTiempo(data);
    } catch (err) {
      console.error("Error al obtener el tiempo:", err);
      alert("Error al obtener el tiempo");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 py-8 md:py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-block mb-4">
            <span className="text-5xl">🌤️</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-3 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400">
            El Tiempo en España
          </h1>
          <p className="text-white/60 text-lg">
            Consulta el pronóstico meteorológico por provincia
          </p>
        </div>

        {/* Search Section */}
        <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-3xl p-8 shadow-2xl mb-8">
          <div className="space-y-4">
            <BarraBusqueda
              provincias={provincias}
              busqueda={busqueda}
              setBusqueda={setBusqueda}
              seleccionarProvincia={seleccionarProvincia}
              sugerencias={sugerencias}
            />
            <BotonBuscar buscarTiempo={buscarTiempo} isLoading={isLoading} />
          </div>
        </div>

        {/* Weather Display */}
        {tiempo && <PantallaClima tiempo={tiempo} />}

        {/* Empty State */}
        {!tiempo && (
          <div className="text-center py-16">
            <p className="text-white/50 text-lg">
              Selecciona una provincia y haz clic en buscar para ver el tiempo
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
