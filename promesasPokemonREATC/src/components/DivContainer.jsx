export function DivCards({ pokemons }) {
  // Mapeo de tipos a colores y gradientes
  const typeColorMap = {
    fire: {
      gradient: "from-red-700 to-orange-600",
      hover: "hover:shadow-red-500/50",
      border: "hover:border-red-500",
    },
    water: {
      gradient: "from-blue-700 to-cyan-600",
      hover: "hover:shadow-blue-500/50",
      border: "hover:border-blue-500",
    },
    grass: {
      gradient: "from-green-700 to-emerald-600",
      hover: "hover:shadow-green-500/50",
      border: "hover:border-green-500",
    },
    electric: {
      gradient: "from-yellow-700 to-yellow-500",
      hover: "hover:shadow-yellow-500/50",
      border: "hover:border-yellow-500",
    },
    ice: {
      gradient: "from-blue-400 to-cyan-300",
      hover: "hover:shadow-cyan-500/50",
      border: "hover:border-cyan-500",
    },
    fighting: {
      gradient: "from-red-900 to-orange-700",
      hover: "hover:shadow-orange-500/50",
      border: "hover:border-orange-500",
    },
    poison: {
      gradient: "from-purple-700 to-fuchsia-600",
      hover: "hover:shadow-purple-500/50",
      border: "hover:border-purple-500",
    },
    ground: {
      gradient: "from-amber-600 to-yellow-700",
      hover: "hover:shadow-amber-500/50",
      border: "hover:border-amber-500",
    },
    flying: {
      gradient: "from-sky-700 to-blue-400",
      hover: "hover:shadow-sky-500/50",
      border: "hover:border-sky-500",
    },
    psychic: {
      gradient: "from-pink-700 to-rose-500",
      hover: "hover:shadow-pink-500/50",
      border: "hover:border-pink-500",
    },
    bug: {
      gradient: "from-lime-700 to-green-600",
      hover: "hover:shadow-lime-500/50",
      border: "hover:border-lime-500",
    },
    rock: {
      gradient: "from-amber-900 to-stone-600",
      hover: "hover:shadow-stone-500/50",
      border: "hover:border-stone-500",
    },
    ghost: {
      gradient: "from-indigo-400 to-purple-500",
      hover: "hover:shadow-indigo-500/50",
      border: "hover:border-indigo-500",
    },
    dragon: {
      gradient: "from-violet-700 to-indigo-600",
      hover: "hover:shadow-violet-500/50",
      border: "hover:border-violet-500",
    },
    dark: {
      gradient: "from-gray-900 to-slate-800",
      hover: "hover:shadow-gray-500/50",
      border: "hover:border-gray-500",
    },
    steel: {
      gradient: "from-slate-600 to-zinc-500",
      hover: "hover:shadow-slate-500/50",
      border: "hover:border-slate-500",
    },
    fairy: {
      gradient: "from-pink-600 to-red-400",
      hover: "hover:shadow-pink-500/50",
      border: "hover:border-pink-500",
    },
  };

  const getTypeColor = (pokemon) => {
    const primaryType = pokemon.types[0]?.type?.name?.toLowerCase() || "normal";
    return (
      typeColorMap[primaryType] || {
        gradient: "from-slate-400 to-slate-500",
        hover: "hover:shadow-gray-500/50",
        border: "hover:border-gray-500",
      }
    );
  };

  return (
    <div
      id="cardsContainer"
      className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3"
    >
      {/* Aquí van las cartas de los pokemons */}

      {pokemons.map((pokemon) => {
        const colors = getTypeColor(pokemon);
        const isShiny = Math.random() < 1; // 1% de probabilidad de ser shiny
        const spriteUrl =
          isShiny && pokemon.sprites.front_shiny
            ? pokemon.sprites.front_shiny
            : pokemon.sprites.front_default;

        return (
          <div
            key={pokemon.id}
            className={`group bg-linear-to-br ${colors.gradient} backdrop-blur-xl rounded-lg shadow-lg p-3 flex flex-col items-center ${colors.hover} hover:shadow-lg transform transition-all duration-300 hover:-translate-y-1 border border-slate-700 ${colors.border}`}
          >
            {/* Fondo decorativo */}
            <div
              className="absolute inset-0 bg-linear-to-tr opacity-0 group-hover:opacity-100 transition-opacity rounded-lg duration-300"
              style={{
                backgroundImage: `linear-gradient(to top right, ${colors.gradient.includes("red") ? "rgba(239, 68, 68, 0.15)" : "rgba(59, 130, 246, 0.15)"}, transparent)`,
              }}
            ></div>

            <div className="relative z-10 w-full flex flex-col items-center">
              {/* Imagen con efecto */}
              <div className="relative mb-2">
                <img
                  src={spriteUrl}
                  alt={pokemon.name}
                  className={`relative w-24 h-24 mb-1 group-hover:drop-shadow-lg transition-all duration-300 ${isShiny ? "drop-shadow-[0_0_8px_rgba(255,215,0,0.6)]" : ""}`}
                />
              </div>

              {/* Nombre */}
              <h2 className="text-lg font-black mb-2 capitalize text-white drop-shadow-xl [text-shadow:0_2px_8px_rgba(0,0,0,0.8)]">
                {isShiny && <span className="text-yellow-300">⭐ </span>}
                {pokemon.name}
              </h2>

              {/* Info */}
              <div className="w-full space-y-1 text-center text-xs">
                <div className="bg-black/40 rounded p-1 border-2 border-white/30 group-hover:border-white/60 transition-colors backdrop-blur-sm">
                  <p className="text-white font-bold">
                    <span className="text-yellow-300">ID:</span> {pokemon.id}
                  </p>
                </div>

                <div className="bg-black/40 rounded p-1 border-2 border-white/30 group-hover:border-white/60 transition-colors backdrop-blur-sm">
                  <p className="text-white font-bold">
                    <span className="text-cyan-300">Type:</span>{" "}
                    <span className="text-white capitalize text-xs font-bold">
                      {pokemon.types.map((type) => type.type.name).join(", ")}
                    </span>
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-1">
                  <div className="bg-black/40 rounded p-1 border-2 border-white/30 group-hover:border-white/60 transition-colors backdrop-blur-sm">
                    <p className="text-white font-bold">
                      <span>⚖️</span> {pokemon.weight / 10} kg
                    </p>
                  </div>
                  <div className="bg-black/40 rounded p-1 border-2 border-white/30 group-hover:border-white/60 transition-colors backdrop-blur-sm">
                    <p className="text-white font-bold">
                      <span>📏</span> {pokemon.height / 10} m
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
