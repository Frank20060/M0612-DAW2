import { HardDrive } from "lucide-react";
import { datosPromo, datosGrupo } from '../../datos'

export function FormularioAlumno({ onClose, setDatosAlumnos, datosAlumnos }) {
  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const datosNuevo = {
      nombre: (formData.get("nombre") || '').trim(),
      apellido: (formData.get("apellido") || '').trim(),
      promo: formData.get("promo") || '',
      grupo: formData.get("grupo") || '',
      foto: (formData.get("foto") || '').trim(),
    };

    console.log('Guardando alumno:', datosNuevo);

    // Actualizamos el estado y guardamos inmediatamente en localStorage para evitar condiciones de carrera
    setDatosAlumnos((prev) => {
      const next = [...prev, datosNuevo];
      try {
        localStorage.setItem('alumnos', JSON.stringify(next));
        console.log('Guardado en localStorage:', next);
      } catch (err) {
        console.error('Error guardando alumnos en localStorage:', err);
      }
      return next;
    });

    // Cerrar modal tras guardar
    if (typeof onClose === 'function') onClose();
      
    };

  /**
   * 
    Copia de el array para que se refresque la app = 
    datos.push(contenido que quiero poner)    ///Ponemos en datos lo nuevo que queremos poner  
    nuevosDatos = {...datos}    ///Copia los datos  
    setDatos(nuevosDatos)       ///Los pone en el estado datos cambiando el puntero
   * 
  */
  


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
        <form className="flex flex-col gap-3" onSubmit={handleSubmit} >
          <input
            name="nombre"
            type="text"
            className="bg-slate-900/60 text-slate-50 border border-slate-700/70 rounded-md px-3 py-2 text-sm placeholder:text-slate-500 focus:border-sky-400 focus:outline-none focus:ring-1 focus:ring-sky-400 transition"
            placeholder="Nombre"
            required
            id="inpNombre"
          />
          <input
            name="apellido"
            type="text"
            className="bg-slate-900/60 text-slate-50 border border-slate-700/70 rounded-md px-3 py-2 text-sm placeholder:text-slate-500 focus:border-sky-400 focus:outline-none focus:ring-1 focus:ring-sky-400 transition"
            placeholder="Apellidos"
            required
            id="inpApellido"
          />
          <select
            name="promo"
            className="bg-slate-900/60 text-slate-50 border border-slate-700/70 rounded-md px-3 py-2 text-sm focus:border-sky-400 focus:outline-none focus:ring-1 focus:ring-sky-400 transition"
            required
            id="inpPromo"
          >
            <option value="">Selecciona promoción</option>
            {datosPromo.map((p) => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>

          <select
            name="grupo"
            className="bg-slate-900/60 text-slate-50 border border-slate-700/70 rounded-md px-3 py-2 text-sm focus:border-sky-400 focus:outline-none focus:ring-1 focus:ring-sky-400 transition"
            required
            id="inpCiclo"
          >
            <option value="">Selecciona ciclo</option>
            {datosGrupo.map((g) => (
              <option key={g} value={g}>{g}</option>
            ))}
          </select>
          <input
            name="foto"
            type="text"
            className="bg-slate-900/60 text-slate-50 border border-slate-700/70 rounded-md px-3 py-2 text-sm placeholder:text-slate-500 focus:border-sky-400 focus:outline-none focus:ring-1 focus:ring-sky-400 transition"
            placeholder="URL imagen"
            id="inpImg"
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
