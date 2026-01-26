export function BarraBusqueda({
  provincias,
  busqueda,
  setBusqueda,
  seleccionarProvincia,
  sugerencias,
}) {
  return (
    <div className="relative w-full">
      <div className="relative">
        <input
          type="text"
          placeholder="Buscar provincia..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          className="w-full px-6 py-4 bg-white/10 border border-white/20 rounded-2xl focus:outline-none focus:ring-2 focus:ring-cyan-400 text-white placeholder:text-white/50 backdrop-blur-md transition duration-300 hover:border-white/40"
        />
        <svg
          className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>

      {sugerencias.length > 0 && (
        <ul className="absolute z-20 w-full mt-2 bg-gray-900/95 backdrop-blur-md border border-white/20 rounded-2xl shadow-2xl max-h-64 overflow-y-auto">
          {sugerencias.map((prov) => (
            <li
              key={prov.CODPROV}
              onClick={() => seleccionarProvincia(prov)}
              className="px-6 py-3 cursor-pointer hover:bg-cyan-500/20 border-b border-white/10 last:border-b-0 text-white/90 hover:text-white transition duration-200"
            >
              {prov.NOMBRE_PROVINCIA}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
