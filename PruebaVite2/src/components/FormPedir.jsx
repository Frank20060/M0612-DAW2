
import { SelectCervezas } from "./SelectCerveza"

export function FormPedir(){



    return(
        <div class="barra-control">
            {/*Select cervexas*/}
            <SelectCervezas/>
            <select id="selectCantidad">
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
            </select>
            <select id="selectMesa">
                <option>Mesa 1</option>
                <option>Mesa 2</option>
                <option>Mesa 3</option>
                <option>Mesa 4</option>
                <option>Mesa 5</option>
            </select>
            <button class="btn-pedido" id="btnHacerPedido">Hacer Pedido</button>
        </div>
    )

}