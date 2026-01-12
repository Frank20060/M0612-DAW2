import { SelectorPromocion } from "./componentes/SelectorPromocion";
import { SelectorGrupos } from "./componentes/SelectorGrupo";
import { ListaAlumno } from "./componentes/ListaAlumno";
import { useState, useEffect, useRef } from "react";
import { BuscarNombre } from "./componentes/BuscarNombre";
import { datosAlumnosDB, datosGrupo, datosPromo } from "../datos";
import { FormularioAlumno } from "./componentes/FormularioAlumno";
import { Login } from "./componentes/Login";
import { ButtonLogin } from "./componentes/ButtonLogin";

/*

Copia de el array para que se refresque la app = 

datos.push(contenido que quiero poner)    ///Ponemos en datos lo nuevo que queremos poner  
nuevosDatos = {...datos}    ///Copia los datos  
setDatos(nuevosDatos)       ///Los pone en el estado datos cambiando el puntero



*/

export function App() {
  //Estados
  const [promocion, setPromocion] = useState("Todos");
  const [grupo, setGrupo] = useState("Todos");
  const [nombre, setNombre] = useState("");
  const [showCrear, setShowCrear] = useState(false);
  //Para abrir el modal de login
  const [showLogin, setShowLogin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  //Estado para saber si es crear o editar
  const [typeForm, setTypeForm] = useState("crear");
  const[alumno, setAlumno] = useState(null);


  const [datosAlumnos, setDatosAlumnos] = useState(() => {
    const alumnosLS = localStorage.getItem("alumnos");
    if (!alumnosLS) {
      // No hay nada en localStorage → uso datos de ejemplo
      return datosAlumnosDB;
    }

    try {
      const parsed = JSON.parse(alumnosLS);
      // Si no es un array o está vacío, vuelvo a usar los de ejemplo
      if (!Array.isArray(parsed) || parsed.length === 0) {
        return datosAlumnosDB;
      }
      return parsed;
    } catch (err) {
      console.error("Error parseando alumnos, usando datos de ejemplo", err);
      return datosAlumnosDB;
    }
  });

  // Guardar siempre que cambie datosAlumnos
  useEffect(() => {
    localStorage.setItem("alumnos", JSON.stringify(datosAlumnos));
  }, [datosAlumnos]);

  //Control select promociones
  function controlPromocion(e) {
    const value = e.target.value;
    if (value === "Todos") {
      setPromocion("Todos");
    } else {
      setPromocion(datosPromo[value]);
    }
  }

  //Control select grupos

  function controlGrupo(e) {
    const value = e.target.value;

    if (value === "Todos") {
      setGrupo("Todos");
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
    const okPromo = promocion === "Todos" || d.promo === promocion;

    const okGrupo = grupo === "Todos" || d.grupo === grupo;

    const okNombre =
      nombre === "" ||
      (d.nombre + " " + d.apellido)
        .toLowerCase()
        .includes(nombre.toLowerCase());

    return okPromo && okGrupo && okNombre;
  });

  // Eliminar alumno por id y persistir en localStorage
  function eliminarAlumno(id) {
    if (!window.confirm("¿Eliminar alumno?")) return;
    setDatosAlumnos((prev) => {
      const next = prev.filter((a) => a.id !== id);
      try {
        localStorage.setItem("alumnos", JSON.stringify(next));
        console.log("Alumno eliminado id:", id);
      } catch (err) {
        console.error(
          "Error guardando alumnos en localStorage tras eliminar:",
          err
        );
      }
      return next;
    });
  }

  function editarAlumno(id) {
    console.log("Editar alumno id:", id);
    /*Se tiene que abrir el modal de editar con los datos del alumno y luego mandarlo y que se cree*/
    setShowCrear(true);
    
    /*Poner los datos de el id de el alumno en el formulario*/
    setAlumno(datosAlumnos.find((a) => a.id === id))
    if (alumno) {
      // Aquí puedes usar los datos del alumno para llenar el formulario
      console.log("Datos del alumno:", alumno);
    }
    setTypeForm("editar");
    console.log("Tipo de formulario:", typeForm);



  }


  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 text-slate-50 ">
      <main className="mx-auto flex max-w-5xl flex-col gap-6 px-4 py-10">
        <header className="flex flex-row gap-2 justify-between">
          <div className="flex flex-col gap-2">
            <h1 className="text-4xl font-extrabold tracking-tight">
              Panel de alumnos
            </h1>
            <p className="text-sm text-slate-300">
              Filtra por promoción y revisa a tus panas.
            </p>
          </div>
          <ButtonLogin onClick={() => setShowLogin(true)}/>
        </header>

        <section className="flex flex-col gap-4 rounded-2xl bg-white/5 p-5 shadow-lg ring-1 ring-white/10 backdrop-blur transition-all duration-200 hover:-translate-y-0.5 hover:bg-white/10 hover:shadow-xl sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-3">
            <h2 className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-300">
              Filtro
            </h2>
            <div className="flex flex-col gap-3">
              <SelectorPromocion
                datosPromo={datosPromo}
                controlPromocion={controlPromocion}
              />
              <SelectorGrupos
                datosGrupo={datosGrupo}
                controlGrupo={controlGrupo}
              />
              <BuscarNombre nombre={nombre} bucarNombre={bucarNombre} />
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
                {grupo || "—"}
              </h1>
            </div>

            <div>
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-slate-400">
                Nombre buscado
              </p>
              <h1 className="mt-1 inline-block bg-linear-to-r from-indigo-400 via-sky-400 to-emerald-300  bg-clip-text text-2xl font-extrabold text-transparent transition-all duration-200 hover:scale-[1.02] hover:drop-shadow-[0_0_18px_rgba(56,189,248,0.6)]">
                {nombre || "—"}
              </h1>
            </div>
          </div>
        </section>
        <section className="rounded-2xl bg-white/5 p-4 shadow-xl ring-1 ring-white/10 backdrop-blur">
          {datosFiltrados.length === 0 ? (
            <div className="p-6 text-center text-slate-300">
              No hay alumnos que coincidan con los filtros.
            </div>
          ) : (
            <ListaAlumno
              datosAlumnos={datosFiltrados}
              onCreate={() => setShowCrear(true)}
              onDelete={eliminarAlumno}
              onEdit={editarAlumno}
            />
          )}
        </section>

        <section className="flex flex-row gap-7">
          {showLogin && <Login onClose={() => setShowLogin(false)} setIsLoggedIn={setIsLoggedIn} />}
        </section>

        {showCrear && (
          <FormularioAlumno
            onClose={() => {
              setShowCrear(false);
              setTypeForm("crear"); //Como norma ponemos que cuando se cierre el modal vuelva a crear
            }}
            setDatosAlumnos={setDatosAlumnos}
            datoAlumnoEditar={alumno}
            typeForm={typeForm}
          />
        )}
      </main>
    </div>
  );
}
