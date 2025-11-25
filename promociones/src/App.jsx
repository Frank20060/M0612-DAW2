import { SelectorPromocion } from '../componentes/SelectorPromocion'
import { ListaAlumno } from '../componentes/ListaAlumno'
import './App.css'

export function App(){

  const datosPromo =[
    "24/25","25/26","26/27","27/28",
  ]

  const datosAlumnos = [
    {
      nombre: "Frank",
      apellido: "Villar",
      promo:"24/25",
      grupo:"DAW",
      foto:"https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Happy_Shrek_%28cropped%29.jpg/330px-Happy_Shrek_%28cropped%29.jpg" 
      
    },
    {
      nombre: "Ciro",
      apellido: "Martínez",
      promo:"23/24",
      grupo:"DAW",
      foto:"https://pokemon.gishan.cc/static/i/pokemon/shiny-kabuto.png"  
    }
  ]


  let alumnosFiltradosPromo=datosAlumnos.filter((al)=> al.promo == "24/25")


  return(
    <>
      <h1>Promociones</h1>  
      <SelectorPromocion datosPromo={datosPromo}/>
      <ListaAlumno datosAlumnos={alumnosFiltradosPromo}/>
    </>
  )


}
