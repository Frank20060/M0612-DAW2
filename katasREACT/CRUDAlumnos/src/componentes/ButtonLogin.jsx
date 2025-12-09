export function ButtonLogin({ onClick }) {
  return (
    <button
      onClick={onClick}
      className=" h-fit  group inline-flex cursor-pointer items-center justify-center rounded-xl border-slate-600/70 bg-linear-to-r from-indigo-500 via-sky-500 to-emerald-400 px-6 py-3 text-sm font-semibold text-slate-950 shadow-md shadow-sky-500/40 transition hover:brightness-110 hover:shadow-lg hover:shadow-emerald-400/50 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2 focus:ring-offset-slate-900"
    >
      <div className="relative overflow-hidden">
        <p className="translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:-translate-y-7">
          Iniciar Sesión
        </p>
        <p className="absolute left-0 top-7 translate-y-0 transition-all duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:top-0">
          Iniciar Sesión
        </p>
      </div>
    </button>
  );
}
