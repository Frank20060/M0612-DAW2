import { HardDrive } from "lucide-react";

export function FormularioAlumno({ onClose }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Formulario enviado");
    // aquí podrías llamar a onClose() si quieres cerrar al guardar
    // onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm
                 transition-opacity duration-200 ease-out"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-2xl bg-white/5 p-6 shadow-xl ring-1 ring-white/10 backdrop-blur
                   transform transition-all duration-200 ease-out scale-95 opacity-100"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-linear-to-r from-indigo-400 via-sky-400 to-emerald-300 text-slate-900 shadow-md">
              <HardDrive className="h-5 w-5" />
            </span>
            <div>
              <h2 className="text-lg font-semibold tracking-tight">
                Nuevo alumno
              </h2>
              <p className="text-xs text-slate-300">
                Añade un alumno a la promoción seleccionada.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-1 text-slate-400 hover:text-slate-100 hover:bg-slate-800/60 transition"
          >
            ✕
          </button>
        </div>

        <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
          <input
            type="text"
            className="bg-slate-900/60 text-slate-50 border border-slate-700/70 rounded-md px-3 py-2 text-sm placeholder:text-slate-500 focus:border-sky-400 focus:outline-none focus:ring-1 focus:ring-sky-400 transition"
            placeholder="Nombre"
          />
          <input
            type="text"
            className="bg-slate-900/60 text-slate-50 border border-slate-700/70 rounded-md px-3 py-2 text-sm placeholder:text-slate-500 focus:border-sky-400 focus:outline-none focus:ring-1 focus:ring-sky-400 transition"
            placeholder="Apellidos"
          />
          <input
            type="email"
            className="bg-slate-900/60 text-slate-50 border border-slate-700/70 rounded-md px-3 py-2 text-sm placeholder:text-slate-500 focus:border-sky-400 focus:outline-none focus:ring-1 focus:ring-sky-400 transition"
            placeholder="Email"
          />
          <input
            type="number"
            className="bg-slate-900/60 text-slate-50 border border-slate-700/70 rounded-md px-3 py-2 text-sm placeholder:text-slate-500 focus:border-sky-400 focus:outline-none focus:ring-1 focus:ring-sky-400 transition"
            placeholder="Promoción"
          />
          <input
            type="text"
            className="bg-slate-900/60 text-slate-50 border border-slate-700/70 rounded-md px-3 py-2 text-sm placeholder:text-slate-500 focus:border-sky-400 focus:outline-none focus:ring-1 focus:ring-sky-400 transition"
            placeholder="Ciclo"
          />
          <input
            type="text"
            className="bg-slate-900/60 text-slate-50 border border-slate-700/70 rounded-md px-3 py-2 text-sm placeholder:text-slate-500 focus:border-sky-400 focus:outline-none focus:ring-1 focus:ring-sky-400 transition"
            placeholder="URL imagen"
          />

          <button
            type="submit"
            className="mt-2 inline-flex items-center justify-center rounded-md bg-linear-to-r from-indigo-500 via-sky-500 to-emerald-400 px-4 py-2 text-sm font-semibold text-slate-950 shadow-md transition hover:brightness-110 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2 focus:ring-offset-slate-900"
          >
            Guardar/Editar alumno
          </button>
        </form>
      </div>
    </div>
  );
}
