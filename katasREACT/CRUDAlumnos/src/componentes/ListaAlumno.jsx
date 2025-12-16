import { Alumno } from "./Alumno.jsx"
import { Avatar } from "./Avatar.jsx"
import { ButtonCrear } from "./buttonCrear.jsx"



//Para abrir el modal de crear / editar


export function ListaAlumno({ datosAlumnos, onCreate }) {

  const getAvatarUrl = (name) => `https://api.dicebear.com/9.x/big-smile/svg?seed=${name}`


  return (
    <div className="space-y-4">
      <div className="flex flex-row justify-between">
        <h3 className="text-lg font-semibold text-slate-100">
          Alumnos ({datosAlumnos.length})
        </h3>
        <ButtonCrear onClick={onCreate} />
      </div>
      
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {datosAlumnos.map((alumno, index) => (
          <Alumno
            key={alumno.id ?? "alumno" + index}
            id={alumno.id}
            nombre={alumno.nombre}
            apellido={alumno.apellido}
            promo={alumno.promo}
            grupo={alumno.grupo}
          >
            <Avatar key={"avatarAlumno" + index} foto={alumno.foto === "" ? getAvatarUrl(`${alumno.nombre} ${alumno.apellido}`) : alumno.foto} />
          </Alumno>
        ))}
      </div>

        
      
    </div>
  )
}

