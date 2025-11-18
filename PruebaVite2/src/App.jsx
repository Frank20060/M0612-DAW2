import './App.css'
import { TablaBirras } from './components/TablaBirras'

export function  App(){

  return (

    <div className="flexApp">
      
      <div className='borde'>
        <h2>Tabla Birras</h2>
        <TablaBirras/>
      </div>
      <div className='borde'>Columna Derecha</div>
      
    </div>
  )

}