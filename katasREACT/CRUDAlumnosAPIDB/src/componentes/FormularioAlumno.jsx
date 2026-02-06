  import { HardDrive } from "lucide-react";
  import { datosPromo, datosGrupo } from "../../datos";
  import { useState, useEffect } from "react";

  export function FormularioAlumno({ onClose, datoAlumnoEditar, typeForm, onEdit, onCreate }) {
    const emptyAlumno = { nombre: "", apellido: "", promo: "", grupo: "", foto: "" };
    const [formDatos, setFormDatos] = useState(emptyAlumno);

    useEffect(() => {
      if (typeForm === "editar" && datoAlumnoEditar) setFormDatos(datoAlumnoEditar);
      else setFormDatos(emptyAlumno);
    }, [typeForm, datoAlumnoEditar]);

    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormDatos((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const payload = {
          nombre: formDatos.nombre,
          apellido: formDatos.apellido,
          promo: formDatos.promo,
          grupo: formDatos.grupo,
          foto: formDatos.foto || ""
        };

        if (typeForm === "editar") await onEdit(datoAlumnoEditar.id, payload);
        if (typeForm === "crear") await onCreate(payload);

        if (onClose) onClose();
      } catch (error) {
        console.error("Error procesando el alumno:", error);
      }
    };

    return (
      <div
        id="modalFormulario"
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm transition-opacity duration-200 ease-out"
        onClick={onClose}
      >
        <div
          className="w-full max-w-md rounded-2xl bg-white/5 p-6 shadow-xl ring-1 ring-white/10 backdrop-blur transform transition-all duration-200 ease-out scale-95 opacity-100"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="mb-4 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-linear-to-r from-indigo-400 via-sky-400 to-emerald-300 text-slate-900 shadow-md">
                <HardDrive className="h-5 w-5" />
              </span>
              <div>
                <h2 className="text-lg font-semibold tracking-tight">{typeForm === "editar" ? "Editar alumno" : "Nuevo alumno"}</h2>
                <p className="text-xs text-slate-300">{typeForm === "editar" ? "Modifica los datos del alumno." : "Añade un alumno a la promoción seleccionada."}</p>
              </div>
            </div>
            <button type="button" onClick={onClose} className="rounded-full p-1 text-slate-400 hover:text-slate-100 hover:bg-slate-800/60 transition">✕</button>
          </div>

          <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
            <input name="nombre" type="text" value={formDatos.nombre} onChange={handleChange} placeholder="Nombre" required className="bg-slate-900/60 text-slate-50 border border-slate-700/70 rounded-md px-3 py-2 text-sm placeholder:text-slate-500 focus:border-sky-400 focus:outline-none focus:ring-1 focus:ring-sky-400 transition" />
            <input name="apellido" type="text" value={formDatos.apellido} onChange={handleChange} placeholder="Apellidos" required className="bg-slate-900/60 text-slate-50 border border-slate-700/70 rounded-md px-3 py-2 text-sm placeholder:text-slate-500 focus:border-sky-400 focus:outline-none focus:ring-1 focus:ring-sky-400 transition" />
            <select name="promo" value={formDatos.promo} onChange={handleChange} required className="bg-slate-900/60 text-slate-50 border border-slate-700/70 rounded-md px-3 py-2 text-sm focus:border-sky-400 focus:outline-none focus:ring-1 focus:ring-sky-400 transition">
              <option value="">Selecciona promoción</option>
              {datosPromo.map((p) => <option key={p} value={p}>{p}</option>)}
            </select>
            <select name="grupo" value={formDatos.grupo} onChange={handleChange} required className="bg-slate-900/60 text-slate-50 border border-slate-700/70 rounded-md px-3 py-2 text-sm focus:border-sky-400 focus:outline-none focus:ring-1 focus:ring-sky-400 transition">
              <option value="">Selecciona ciclo</option>
              {datosGrupo.map((g) => <option key={g} value={g}>{g}</option>)}
            </select>
            <input name="foto" type="text" value={formDatos.foto} onChange={handleChange} placeholder="URL imagen" className="bg-slate-900/60 text-slate-50 border border-slate-700/70 rounded-md px-3 py-2 text-sm placeholder:text-slate-500 focus:border-sky-400 focus:outline-none focus:ring-1 focus:ring-sky-400 transition" />
            <button type="submit" className="mt-2 inline-flex items-center justify-center rounded-md bg-linear-to-r from-indigo-500 via-sky-500 to-emerald-400 px-4 py-2 text-sm font-semibold text-slate-950 shadow-md transition hover:brightness-110 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2 focus:ring-offset-slate-900">{typeForm === "editar" ? "Editar alumno" : "Guardar alumno"}</button>
          </form>
        </div>
      </div>
    );
  }
