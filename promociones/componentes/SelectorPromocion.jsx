export function SelectorPromocion({datosPromo}= datosPromo){

    return(

        <select name="promocion" id="promocion">
            <option value="default">Selecciona la promoción</option>
            
            { datosPromo.map((p, indexP)=> <option value={p} key={indexP}>Promoción: {p}</option> )} {/*Arrow function que itera por cada elemeto de la array y devuelve un option*/}

        </select>
    )

}