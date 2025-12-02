import { BotonChulo } from "../componentes/BotonChulo"
import { Usuario } from "../componentes/Usuario"
export function App2(){

    return(
        <div className="flex flex-col justify-center items-center bg-gray-300 h-screen">
            
            <div className="flex gap-5">
                <Usuario/>
                <Usuario/>
                <Usuario/>
                <Usuario/>
                <Usuario/>
                <Usuario/>
            </div>
            
            <BotonChulo/>
        </div>
    )

}