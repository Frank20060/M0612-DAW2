import './App.css'
import { TablaBirras } from './components/TablaBirras'
import { FormPedir } from './components/FormPedir'
import { SalaMesas } from './components/salaMesas'

export function  App(){

  return (

    <div className ="container">
      <div class="columna-izquierda" id="columnaIzquierda">
				<button class="btn-toggle" id="btnToggle">
					Mostrar/Ocultar Lista de Cervezas
				</button>
				<h2>Lista de Cervezas</h2>
				<TablaBirras/>
			</div>
      
        
  
      <div class="columna-derecha">
      <FormPedir/>
      <SalaMesas/>
      </div>
      
    </div>
  )
}