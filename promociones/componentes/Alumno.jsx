import { Avatar } from "./avatar";


export function Alumno({nombre, apellido, promo, grupo, children} = props){



    return(
        <>
        <div className="alumno">
            {children}
            <h1>{nombre} {apellido}</h1>
            <h2>{promo} {grupo}</h2>
        </div>
    
        </>    
    )

}