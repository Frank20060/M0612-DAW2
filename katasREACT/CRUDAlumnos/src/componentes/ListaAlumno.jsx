import { Alumno } from "./Alumno.jsx"
import { Avatar } from "./Avatar.jsx"
import { ButtonCrear } from "./buttonCrear.jsx"
import { use, useState } from 'react'



//Para abrir el modal de crear / editar


export function ListaAlumno({ datosAlumnos } = datosAlumnos) {


  const [showCrear, setShowCrear] = useState(false);


  return (
    <div className="space-y-4">
      <div className="flex flex-row justify-between">
        <h3 className="text-lg font-semibold text-slate-100">
          Alumnos ({datosAlumnos.length})
        </h3>
        <ButtonCrear onClick={() => setShowCrear(true)} />
      </div>
      
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

        {showCrear && <FormularioAlumno onClose={() => setShowCrear(false)} />}
      
    </div>
  )
}

