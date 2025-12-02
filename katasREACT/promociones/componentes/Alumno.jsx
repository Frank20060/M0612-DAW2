

export function Alumno({ nombre, apellido, promo, grupo, children } = props) {
  return (
    <article className="group flex flex-col items-center gap-3 rounded-2xl border border-white/10 bg-white/10 p-4 text-center shadow-lg backdrop-blur-md transition-all duration-200 hover:-translate-y-1 hover:border-indigo-400/70 hover:bg-white/15 hover:shadow-2xl">
      {children}
      <div className="space-y-1">
        <h1 className="text-base font-semibold text-slate-50">
          {nombre} {apellido}
        </h1>
        <h2 className="text-xs font-medium uppercase tracking-wide text-indigo-300">
          {promo} · {grupo}
        </h2>
      </div>
    </article>
  )
}
