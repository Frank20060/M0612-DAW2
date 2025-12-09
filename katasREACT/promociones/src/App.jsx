import { SelectorPromocion } from '../componentes/SelectorPromocion'
import { SelectorGrupos } from '../componentes/SelectorGrupo'
import { ListaAlumno } from '../componentes/ListaAlumno'
import { use, useState } from 'react'
import { BuscarNombre } from '../componentes/BuscarNombre'
import { datosAlumnos, datosGrupo, datosPromo } from '../datos'


export function App() {


  //Estados
  const [promocion, setPromocion] = useState("Todos")
  const [grupo, setGrupo] = useState("Todos")
  const [nombre, setNombre] = useState("")

  //Control select promociones
  function controlPromocion(e) {
    const value = e.target.value;
    if (value === 'Todos') {
      setPromocion('Todos');          
    } else {
      setPromocion(datosPromo[value]); 
    }
  }

  //Control select grupos

  function controlGrupo(e) {
  const value = e.target.value;

  if (value === 'Todos') {
    setGrupo('Todos');
  } else {
    setGrupo(datosGrupo[value]);     
  }
  }
  //Control imput nombre

  function bucarNombre(e) {
    setNombre(e.target.value);
  }

  //aplicar Filtro
  const datosFiltrados = datosAlumnos.filter((d) => {
    const okPromo =
      promocion === 'Todos' || d.promo === promocion;

    const okGrupo =
      grupo === 'Todos' || d.grupo === grupo;

    const okNombre =
      nombre === '' ||
     (d.nombre +" "+ d.apellido ).toLowerCase().includes(nombre.toLowerCase());

    return okPromo && okGrupo && okNombre;
  });




  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 text-slate-50">
      <main className="mx-auto flex max-w-5xl flex-col gap-6 px-4 py-10">
        <header className="flex flex-col gap-2">
          <h1 className="text-4xl font-extrabold tracking-tight">
            Panel de alumnos
          </h1>
          <p className="text-sm text-slate-300">
            Filtra por promoción y revisa a tus panas.
          </p>
        </header>

        <section className="flex flex-col gap-4 rounded-2xl bg-white/5 p-5 shadow-lg ring-1 ring-white/10 backdrop-blur transition-all duration-200 hover:-translate-y-0.5 hover:bg-white/10 hover:shadow-xl sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-3">
            <h2 className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-300">
              Filtro
            </h2>
            <div className='flex flex-col gap-3'>
              <SelectorPromocion datosPromo={datosPromo} controlPromocion={controlPromocion}/>
              <SelectorGrupos datosGrupo={datosGrupo} controlGrupo={controlGrupo}/>
              <BuscarNombre nombre={nombre} bucarNombre={bucarNombre}/>
            </div>
            

          </div>
          <div className="text-right">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-slate-400">
              Promoción actual
              </p>
              <h1 className="mt-1 inline-block bg-linear-to-r from-indigo-400 via-sky-400 to-emerald-300  bg-clip-text text-2xl font-extrabold text-transparent transition-all duration-200 hover:scale-[1.02] hover:drop-shadow-[0_0_18px_rgba(56,189,248,0.6)]">
                {promocion || "—"}
              </h1>
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-slate-400">
              Grupo actual
              </p>
              <h1 className="mt-1 inline-block bg-linear-to-r from-indigo-400 via-sky-400 to-emerald-300  bg-clip-text text-2xl font-extrabold text-transparent transition-all duration-200 hover:scale-[1.02] hover:drop-shadow-[0_0_18px_rgba(56,189,248,0.6)]">
                {grupo  || "—"}
              </h1>
            </div>

            <div>
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-slate-400">
              Nombre buscado
              </p>
              <h1 className="mt-1 inline-block bg-linear-to-r from-indigo-400 via-sky-400 to-emerald-300  bg-clip-text text-2xl font-extrabold text-transparent transition-all duration-200 hover:scale-[1.02] hover:drop-shadow-[0_0_18px_rgba(56,189,248,0.6)]">
                {nombre  || "—"}
              </h1>
            </div>
          </div>
        </section>

        <section className="rounded-2xl bg-white/5 p-4 shadow-xl ring-1 ring-white/10 backdrop-blur">
          <ListaAlumno datosAlumnos={datosFiltrados} />
        </section>
      </main>
    </div>
  )
}
