export function BuscarNombre({ nombre, bucarNombre }) {
  return (
    <form action="#" className="w-full max-w-md">
      <label
        htmlFor="buscarNombre"
        className="mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-slate-300"
      >
        Buscar alumno
      </label>

      <div className="relative">
        {/* Icono lupa */}
        <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-slate-400">
          <svg
            className="h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"
            />
          </svg>
        </span>

        <input
          onChange={bucarNombre}
          value={nombre}
          type="text"
          id="buscarNombre"
          placeholder="Buscar por nombre o apellido..."
          className="w-full rounded-xl border border-white/10 bg-slate-900/70 px-10 py-2 text-sm text-slate-100 shadow-inner placeholder:text-slate-500 outline-none transition-all duration-200 hover:border-indigo-400 hover:bg-slate-900/90 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-slate-900"
        />
      </div>
    </form>
  );
}
