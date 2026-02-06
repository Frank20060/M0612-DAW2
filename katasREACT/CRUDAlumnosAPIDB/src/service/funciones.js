export const cargarAlumnos = (datosDefault) => {
  const alumnosLS = localStorage.getItem("alumnos");

  if (!alumnosLS) {
    // No hay nada en localStorage → uso datos de ejemplo
    return datosDefault;
  }

  try {
    const parsed = JSON.parse(alumnosLS);
    // Si no es un array o está vacío, vuelvo a usar los de ejemplo
    if (!Array.isArray(parsed) || parsed.length === 0) {
      return datosDefault;
    }
    return parsed;
  } catch (err) {
    console.error("Error parseando alumnos, usando datos de ejemplo", err);
    return datosDefault;
  }
};

export const guardarAlumnos = (alumnos) => {
  try {
    localStorage.setItem("alumnos", JSON.stringify(alumnos));
  } catch (err) {
    console.error("Error guardando alumnos en localStorage:", err);
  }
};

export const eliminarAlumnoLS = (alumnos, id) => {
  const alumnosActualizados = alumnos.filter((a) => a.id !== id);
  guardarAlumnos(alumnosActualizados);
  console.log("Alumno eliminado id:", id);
  return alumnosActualizados;
};

export const editarAlumnoLS = (alumnos, id, datosActualizados) => {
  const alumnosActualizados = alumnos.map((a) =>
    a.id === id ? { ...a, ...datosActualizados } : a,
  );
  guardarAlumnos(alumnosActualizados);
  console.log("Alumno editado id:", id);
  return alumnosActualizados;
};

export const crearAlumnoLS = (alumnos, nuevoAlumno) => {
  const alumnosActualizados = [...alumnos, nuevoAlumno];
  guardarAlumnos(alumnosActualizados);
  console.log("Alumno creado:", nuevoAlumno);
  return alumnosActualizados;
};

// Login

export const guardarUsuario = (user) => {
  try {
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("isLoggedIn", "true");
    console.log("Usuario guardado:", user);
  } catch (err) {
    console.error("Error guardando usuario en localStorage:", err);
  }
};

export const cargarUsuario = () => {
  const userLS = localStorage.getItem("user");

  if (!userLS) {
    console.log("No hay usuario en localStorage");
    return null;
  }

  try {
    const user = JSON.parse(userLS);
    console.log("Usuario en localStorage:", user);
    return user;
  } catch (err) {
    console.error("Error parseando usuario de localStorage:", err);
    return null;
  }
};

export const cerrarSesionLS = () => {
  try {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("user");
    console.log("Sesión cerrada");
  } catch (err) {
    console.error("Error al cerrar sesión:", err);
  }
};

export const estaLogueado = () => {
  return localStorage.getItem("isLoggedIn") === "true";
};

/////////
///////// En vez de localStorage poner API con la bd
/////////

//Tengo que cambiar los nombres de los apartados de elll json una vez esten en el local porque en la db tienen otros nombres

/*

ejemplo de lo que tengo yo (Asi sa quedao)
{
  id: 6978f3ae12526debe994cb8f,
  nombre: "Lucía",
  apellido: "Fernández",
  promo: "26/27",
  grupo: "DAW",
  foto: "",
}

o cambio la db o cambio mi codigo, o lo pongo desde codigo


Hay que ponerlos en el datosAlumnos con setDatosAlumnos


*/

//Get alumnos


/*
    const res = await fetch("http://localhost:3000/api/alumnos", {
      method: "POST", // esto indica que es POST
      headers: {
        "Content-Type": "application/json" // le decimos que enviamos JSON
      },
      body: JSON.stringify(nuevoAlumno) // los datos que queremos mandar
    });
 */
export async function getAlumnosApi() {
  try {
    const res = await fetch("https://m0612-backend-alumnos.vercel.app/");
    const datos = await res.json();

    return datos.map(alumno => ({
      id: alumno._id,
      nombre: alumno.nombre,
      apellido: alumno.apellidos,
      promo: alumno.promocion,
      grupo: alumno.ciclo,
      foto:
        alumno.urlImagen && alumno.urlImagen.trim() !== ""
          ? alumno.urlImagen
          : `https://api.dicebear.com/9.x/big-smile/svg?seed=${alumno.nombre+alumno.apellido}`
    }));
  } catch {
    console.log("Error al cargar los alumnos");
  }
}

export async function eliminarAlumnoBD(id) {
  try {
    const res = await fetch(`http://localhost:3000/api/alumnos/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    });
    return await res.json();
  } catch {
    console.log("Error al eliminar el alumno");
  }
}

export async function editarAlumnoBD(id, datosActu) {
  try {
    const body = {
      nombre: datosActu.nombre,
      apellidos: datosActu.apellido,
      promocion: datosActu.promo,
      ciclo: datosActu.grupo,
      urlImagen:
        datosActu.foto && datosActu.foto.trim() !== ""
          ? datosActu.foto
          : `https://api.dicebear.com/9.x/big-smile/svg?seed=${datosActu.nombre}`
    };

    const res = await fetch(`http://localhost:3000/api/alumnos/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    });
    return await res.json();
  } catch {
    console.log("Error al editar el alumno");
  }
}

export async function crearAlumnoBD(datosCrear) {
  try {
    const body = {
      nombre: datosCrear.nombre,
      apellidos: datosCrear.apellido,
      promocion: datosCrear.promo,
      ciclo: datosCrear.grupo,
      urlImagen:
        datosCrear.foto && datosCrear.foto.trim() !== ""
          ? datosCrear.foto
          : `https://api.dicebear.com/9.x/big-smile/svg?seed=${datosCrear.nombre}`
    };

    const res = await fetch("http://localhost:3000/api/alumnos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    });
    return await res.json();
  } catch {
    console.log("Error al crear el alumno");
  }
}

