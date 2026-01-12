import { useState } from "react";

function App() {
  // Token de la API (en un proyecto real debería ir en variables de entorno)
  const token = "b3a37cd5767744781e571fa4c127621c";

  // Estado del texto que escribe el usuario en el input
  const [search, setSearch] = useState("");
  // Estado donde guardaremos el superhéroe seleccionado (objeto de la API)
  const [hero, setHero] = useState(null);
  // Estado para guardar mensajes de error (no encontrado, fallo de red, etc.)
  const [error, setError] = useState(null);
  // Estado para saber si estamos esperando la respuesta de la API
  const [loading, setLoading] = useState(false);

  // Función que se ejecuta al enviar el formulario
  const handleSubmit = async (e) => {
    // Evita que el formulario recargue la página por defecto
    e.preventDefault();

    // Limpiamos espacios al principio/final del texto buscado
    const busquedaSuper = search.trim();

    // Si el input está vacío, no hacemos nada
    if (!busquedaSuper) return;

    // Antes de llamar a la API: activamos "cargando",
    // limpiamos errores anteriores y el héroe anterior
    setLoading(true);
    setError(null);
    setHero(null);

    try {
      // Llamada a la API de superhéroes usando fetch
      const res = await fetch(
        `https://superheroapi.com/api.php/${token}/search/${busquedaSuper}`
      );

      // Convertimos la respuesta a JSON
      const data = await res.json();

      // Comprobamos si la API ha devuelto un error o no hay resultados
      if (
        data.response === "error" ||
        !data.results ||
        data.results.length === 0
      ) {
        setError("No se ha encontrado ningún superhéroe con ese nombre.");
      } else {
        // Intentamos buscar un héroe cuyo nombre coincida exactamente
        // (ignorando mayúsculas/minúsculas)
        const found =
          data.results.find(
            (superH) =>
              superH.name.toLowerCase() === busquedaSuper.toLowerCase()
          ) || data.results[0]; // si no, usamos el primer resultado

        // Guardamos el héroe encontrado en el estado
        setHero(found);
      }
    } catch (err) {
      // Si hay un error de red o algo falla en el fetch
      setError("Error al conectar con la API.");
    } finally {
      // En cualquier caso (éxito o error) quitamos el estado de "cargando"
      setLoading(false);
    }
  };

  // Dada una cadena (nombre del héroe), genera la URL del avatar de Dicebear
  // Usamos encodeURIComponent por si el nombre tiene espacios o caracteres especiales
  const getAvatarUrl = (name) => {
    if (!name) return "";
    return `https://api.dicebear.com/9.x/micah/svg?seed=${encodeURIComponent(
      name
    )}`;
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-slate-950 to-indigo-950 text-slate-100 flex flex-col items-center px-4 py-10">
      <div className="w-full max-w-2xl">
        {/* Cabecera de la página */}
        <header className="text-center mb-8">
          <p className="text-xs tracking-[0.25em] uppercase text-indigo-300/80">
            Superhero Database
          </p>
          <h1 className="mt-2 text-4xl font-black tracking-tight bg-linear-to-r from-indigo-400 via-sky-400 to-emerald-400 bg-clip-text text-transparent drop-shadow-[0_0_12px_rgba(56,189,248,0.55)]">
            Buscador de Superhéroes
          </h1>
          <p className="mt-2 text-sm text-slate-300/80">
            Escribe el nombre de tu héroe favorito y descubre sus stats.
          </p>
        </header>

        {/* Formulario de búsqueda */}
        <form
          action="#"
          onSubmit={handleSubmit}
          className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-center"
        >
          {/* Input controlado por el estado `search` */}
          <div className="relative flex-1">
            <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-slate-500">
              🔍
            </span>
            <input
              type="text"
              name="search"
              id="Searcher"
              placeholder="Buscar superhéroe (ej: Batman)"
              value={search}
              // Cada vez que el usuario escribe, actualizamos el estado `search`
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-2xl border border-white/10 bg-slate-900/70 px-10 py-2.5 text-sm outline-none
                         shadow-[0_0_15px_rgba(15,23,42,0.9)] backdrop-blur
                         placeholder:text-slate-500
                         focus:border-sky-400 focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 focus:ring-offset-slate-950
                         hover:border-indigo-400 transition-all"
            />
          </div>

          {/* Botón de enviar formulario */}
          <button
            type="submit"
            className="relative inline-flex items-center justify-center overflow-hidden rounded-2xl px-6 py-2.5 text-sm font-semibold
                       text-slate-950 bg-linear-to-r from-amber-400 via-emerald-400 to-sky-400
                       shadow-[0_0_20px_rgba(56,189,248,0.7)]
                       transition-all duration-300
                       hover:scale-[1.03] hover:shadow-[0_0_30px_rgba(56,189,248,0.95)]
                       focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950
                       group"
          >
            <span className="absolute inset-0 bg-linear-to-r from-sky-500 via-indigo-500 to-fuchsia-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 mix-blend-screen" />
            <span className="relative flex items-center gap-1">
              <span>Buscar</span>
              <span className="text-lg group-hover:translate-x-0.5 transition-transform">
                ⚡
              </span>
            </span>
          </button>
        </form>

        <div id="infoSuperHeroe" className="w-full">
          {/* Estado de carga: mostramos spinner + skeleton */}
          {loading && (
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div
                  className="w-8 h-8 border-4 border-slate-700 border-t-sky-400 rounded-full animate-spin"
                  role="status"
                  aria-label="Cargando"
                />
                <p className="text-slate-300">
                  Buscando héroe en el multiverso...
                </p>
              </div>

              <div className="mt-4 rounded-3xl bg-white/5 p-4 shadow-2xl border border-white/10 backdrop-blur-lg animate-pulse">
                <div className="flex gap-4">
                  <div className="w-28 h-28 bg-slate-700/70 rounded-2xl" />
                  <div className="flex-1 space-y-3 py-1">
                    <div className="h-5 bg-slate-700/70 rounded w-3/4" />
                    <div className="h-4 bg-slate-700/70 rounded w-1/2" />
                    <div className="h-3 bg-slate-700/70 rounded w-1/3" />
                    <div className="mt-3 grid grid-cols-2 gap-2">
                      <div className="h-3 bg-slate-700/70 rounded w-full" />
                      <div className="h-3 bg-slate-700/70 rounded w-full" />
                      <div className="h-3 bg-slate-700/70 rounded w-full" />
                      <div className="h-3 bg-slate-700/70 rounded w-full" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Mensaje de error si algo ha ido mal y no estamos cargando */}
          {error && !loading && (
            <div className="rounded-2xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-200 shadow-lg shadow-red-900/50">
              {error}
            </div>
          )}

          {/* Card principal del héroe (solo si hay datos y no estamos cargando) */}
          {hero && !loading && (
            <div
              className="relative overflow-hidden rounded-3xl bg-white/5 border border-white/15 backdrop-blur-xl
                         shadow-2xl shadow-sky-900/40 mt-4
                         transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_40px_rgba(56,189,248,0.8)]"
            >
              {/* Luces/gradientes decorativos de fondo */}
              <div className="pointer-events-none absolute -top-24 -right-10 h-48 w-48 rounded-full bg-sky-500/20 blur-3xl" />
              <div className="pointer-events-none absolute -bottom-24 -left-10 h-52 w-52 rounded-full bg-emerald-400/20 blur-3xl" />

              <div className="relative p-5 sm:p-6">
                <div className="flex flex-col gap-4 sm:flex-row">
                  {/* Columna de avatar e identificador */}
                  <div className="flex flex-col items-center gap-2">
                    <div className="relative">
                      <div className="absolute -inset-1 rounded-3xl bg-linear-to-tr from-sky-400/40 via-emerald-400/30 to-fuchsia-400/30 blur" />
                      {/* Imagen generada con Dicebear */}
                      <img
                        src={getAvatarUrl(hero.name)}
                        alt={hero.name}
                        className="relative w-32 h-32 sm:w-36 sm:h-36 object-cover rounded-3xl border border-white/30 bg-slate-900 shadow-[0_0_25px_rgba(56,189,248,0.6)]"
                      />
                    </div>
                    <span className="inline-flex items-center rounded-full border border-sky-400/40 bg-sky-500/10 px-3 py-0.5 text-[11px] font-medium tracking-wide text-sky-200/90">
                      #{hero.id} •{" "}
                      {hero.biography.alignment === "good"
                        ? "Héroe"
                        : "Anti-héroe"}
                    </span>
                  </div>

                  {/* Columna de datos básicos */}
                  <div className="flex-1 space-y-2">
                    <h2 className="text-2xl font-extrabold tracking-tight flex items-center gap-2">
                      {hero.name}
                      <span className="text-lg">✨</span>
                    </h2>
                    <p className="text-sm text-slate-300">
                      <span className="font-semibold text-sky-300">
                        Nombre real:
                      </span>{" "}
                      {hero.biography["full-name"] || "Desconocido"}
                    </p>
                    <p className="text-sm text-slate-300">
                      <span className="font-semibold text-emerald-300">
                        Publisher:
                      </span>{" "}
                      {hero.biography.publisher || "Desconocido"}
                    </p>
                    <p className="text-sm text-slate-300">
                      <span className="font-semibold text-fuchsia-300">
                        Primera aparición:
                      </span>{" "}
                      {hero.biography["first-appearance"] || "N/A"}
                    </p>
                    <p className="mt-2 text-xs uppercase tracking-[0.18em] text-slate-400">
                      {hero.biography["place-of-birth"] || "Origen desconocido"}
                    </p>
                  </div>
                </div>

                {/* Sección de powerstats */}
                <div className="mt-5">
                  <h3 className="text-sm font-semibold text-slate-200 mb-2 flex items-center gap-2">
                    Powerstats
                    <span className="h-px flex-1 bg-linear-to-r from-sky-400/60 via-emerald-400/40 to-transparent" />
                  </h3>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
                    {[
                      [
                        "Inteligencia",
                        hero.powerstats.intelligence,
                        "from-sky-400/80 to-sky-500/60",
                      ],
                      [
                        "Fuerza",
                        hero.powerstats.strength,
                        "from-amber-400/80 to-orange-500/70",
                      ],
                      [
                        "Velocidad",
                        hero.powerstats.speed,
                        "from-emerald-400/80 to-teal-500/70",
                      ],
                      [
                        "Durabilidad",
                        hero.powerstats.durability,
                        "from-fuchsia-400/80 to-pink-500/70",
                      ],
                      [
                        "Poder",
                        hero.powerstats.power,
                        "from-indigo-400/80 to-purple-500/70",
                      ],
                      [
                        "Combate",
                        hero.powerstats.combat,
                        "from-rose-400/80 to-red-500/70",
                      ],
                    ].map(([label, value, gradient]) => (
                      // Card individual de cada stat con hover
                      <div
                        key={label}
                        className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-slate-900/70 px-3 py-2
                                   shadow-[0_0_10px_rgba(15,23,42,0.9)] flex items-center justify-between gap-2
                                   transition-all duration-200 hover:-translate-y-0.5 hover:border-sky-400/60 hover:shadow-[0_0_18px_rgba(56,189,248,0.7)]`}
                      >
                        <span className="text-slate-200">{label}</span>
                        <span
                          className={`inline-flex items-center justify-center rounded-full bg-linear-to-r ${gradient}
                                     px-2 py-0.5 text-[11px] font-bold text-slate-950 shadow-sm
                                     transition-transform duration-200 group-hover:scale-110`}
                        >
                          {value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Mensaje inicial cuando no hay héroe, error ni carga */}
          {!hero && !loading && !error && (
            <p className="mt-4 text-center text-sm text-slate-400">
              Busca un nombre como{" "}
              <span className="text-sky-300 font-semibold">Batman</span> o{" "}
              <span className="text-emerald-300 font-semibold">Spider-Man</span>{" "}
              para empezar.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
