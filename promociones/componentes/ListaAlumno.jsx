import { Alumno } from "./Alumno.jsx"
import { Avatar } from "./avatar"





export function ListaAlumno({ datosAlumnos } = datosAlumnos) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-slate-100">
        Alumnos ({datosAlumnos.length})
      </h3>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {datosAlumnos.map((alumno, index) => (
          <Alumno
            key={"alumno" + index}
            nombre={alumno.nombre}
            apellido={alumno.apellido}
            promo={alumno.promo}
            grupo={alumno.grupo}
          >
            <Avatar key={"avatarAlumno" + index} foto={alumno.foto} />
          </Alumno>
        ))}
      </div>
    </div>
  )
}

