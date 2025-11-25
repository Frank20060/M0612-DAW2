import { Alumno } from "./Alumno.jsx"
import { Avatar } from "./avatar"





export function ListaAlumno({datosAlumnos} = datosAlumnos){

    console.log(datosAlumnos)

    return(

        <div className='container'>
            
            {
            datosAlumnos.map((alumno, index) =>{
                return(
                    <Alumno key= { "alumno" + index} nombre={alumno.nombre} apellido={alumno.apellido} promo={alumno.promo} grupo={alumno.grupo}>
                        <Avatar key= { "avatarAlumno" + index} foto={alumno.foto}/>
                    </Alumno>
                )    
            
            })  
            }
        
        </div>


    )


}