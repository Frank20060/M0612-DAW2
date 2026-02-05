import { SelectorPromocion } from "./componentes/SelectorPromocion";
import { SelectorGrupos } from "./componentes/SelectorGrupo";
import { ListaAlumno } from "./componentes/ListaAlumno";
import { useState, useEffect, useRef } from "react";
import { BuscarNombre } from "./componentes/BuscarNombre";
import { datosAlumnosDB, datosGrupo, datosPromo } from "../datos";
import { FormularioAlumno } from "./componentes/FormularioAlumno";
import { Login } from "./componentes/Login";
import { ButtonLogin } from "./componentes/ButtonLogin";
import { Logout } from "./componentes/Logout";
import {
  cargarAlumnos, // XXXXXX local storage
  guardarAlumnos, // XXXXXX local storage
  eliminarAlumnoLS, // XXXXXX local storage
  cargarUsuario,
  cerrarSesionLS,
  getAlumnosApi,
  eliminarAlumnoBD,
} from "./service/funciones";

export function App() {
  // estados de filtros
  const [promocion, setPromocion] = useState("Todos");
  const [grupo, setGrupo] = useState("Todos");
  const [nombre, setNombre] = useState("");

  // estados UI
  const [showCrear, setShowCrear] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  // estados autenticación
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [Rol, setRol] = useState("invitado");

  // estados formulario
  const [typeForm, setTypeForm] = useState("crear");
  const [alumno, setAlumno] = useState(null);

  // estados alumnos
  const [datosAlumnos, setDatosAlumnos] = useState([]);
  const [loadingAlumnos, setLoadingAlumnos] = useState(true);

  const [tipoCRUD, setTipoCRUD] = useState(true); //true = API, False = no APi  (mas facil)

  // cargar usuario desde localStorage
  useEffect(() => {
    const user = cargarUsuario();
    if (user) {
      setIsLoggedIn(true);
      setRol(user.rol);
    }
  }, []);

  // cerrar sesión
  const logOut = () => {
    cerrarSesionLS();
    setIsLoggedIn(false);
    setRol("invitado");
    alert("Has cerrado sesión");
  };

  ////apiiiiii

  // cargar alumnos desde API al empezar
  useEffect(() => {
    cargarAlumnosApi();
  }, []);
  //Carga los datos de la api
  const cargarAlumnosApi = async () => {
    try {
      const datos = await getAlumnosApi();

      const alumnosFormateados = datos.map((a) => ({
        id: a._id ?? a.id,
        nombre: a.nombre,
        apellido: a.apellido,
        promo: a.promo,
        grupo: a.grupo,
        foto: a.foto || "",
      }));

      setDatosAlumnos(alumnosFormateados);
    } catch (error) {
      console.error("Error cargando alumnos", error);
    } finally {
      setLoadingAlumnos(false);
    }
  };

  //Eliminar el

  async function eliminarAlumnoApi(id) {
    const quiereEliminar = window.confirm(
      "¿Seguro que quieres eliminar este alumno?",
    )
    if (quiereEliminar) {
      await eliminarAlumnoBD(id);
      cargarAlumnosApi();
    } else {
      console.log("Eliminación cancelada");
    }
  }

  


  

  // guardar alumnos en localStorage (desactivado)
  // useEffect(() => {
  //   guardarAlumnos(datosAlumnos); // XXXXXX local storage
  // }, [datosAlumnos]);

  // controlar select promociones
  function controlPromocion(e) {
    const value = e.target.value;
    if (value === "Todos") {
      setPromocion("Todos");
    } else {
      setPromocion(datosPromo[value]);
    }
  }

  // controlar select grupos
  function controlGrupo(e) {
    const value = e.target.value;
    if (value === "Todos") {
      setGrupo("Todos");
    } else {
      setGrupo(datosGrupo[value]);
    }
  }

  // controlar input nombre
  function bucarNombre(e) {
    setNombre(e.target.value);
  }

  // filtrar alumnos
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

  // eliminar alumno
  function eliminarAlumno(id) {
    if (!window.confirm("¿Eliminar alumno?")) return;

    setDatosAlumnos((prev) => {
      return eliminarAlumnoLS(prev, id); // XXXXXX local storage
    });
  }

  // editar alumno
  function editarAlumno(id) {
    setShowCrear(true);
    setAlumno(datosAlumnos.find((a) => a.id === id));
    setTypeForm("editar");
  }

  // render
  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 text-slate-50 ">
      <main className="mx-auto flex max-w-5xl flex-col gap-6 px-4 py-10">
        {/* HEADER */}
        <header className="flex flex-row gap-2 justify-between">
          <div className="flex flex-col gap-2">
            <h1 className="text-4xl font-extrabold tracking-tight">
              Panel de alumnos {isLoggedIn && `-- ${Rol.toLocaleUpperCase()}`}
            </h1>
            <p className="text-sm text-slate-300">
              Filtra por promoción y revisa a tus panas.
            </p>
          </div>

          {!isLoggedIn && <ButtonLogin onClick={() => setShowLogin(true)} />}
          {isLoggedIn && <Logout onClick={logOut} />}
        </header>

        {/* FILTROS */}
        <section className="flex flex-col gap-4 rounded-2xl bg-white/5 p-5 shadow-lg ring-1 ring-white/10 backdrop-blur sm:flex-row sm:items-center sm:justify-between">
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
        </section>

        {/* LISTA */}
        <section className="rounded-2xl bg-white/5 p-4 shadow-xl ring-1 ring-white/10 backdrop-blur">
          {datosFiltrados.length === 0 ? (
            <div className="p-6 text-center text-slate-300">
              No hay alumnos que coincidan con los filtros.
            </div>
          ) : (
            <ListaAlumno
              datosAlumnos={datosFiltrados}
              onCreate={() => setShowCrear(true)}
              onDelete={tipoCRUD ? eliminarAlumnoApi : eliminarAlumno}
              onEdit={editarAlumno}
              Rol={Rol}
            />
          )}
        </section>

        {/* MODALES */}
        {showLogin && (
          <Login
            onClose={() => setShowLogin(false)}
            setIsLoggedIn={setIsLoggedIn}
            setRol={setRol}
          />
        )}

        {showCrear && (
          <FormularioAlumno
            onClose={() => {
              setShowCrear(false);
              setTypeForm("crear");
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
