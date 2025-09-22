//Inicializamos variables importantes
const INTENTOS_MAX = 5;
const RANGO_MIN = 1;
const RANGO_MAX = 20;
let aux = 0;
let intentos = 0;
//Capturamos algunos elementos
const divResultado = document.querySelector("#resultado");
const cortesiaIntentos = document.querySelector("#cortesiaIntentos")
const divMensaje = document.querySelector("#mensajes");
const numeroSeleccionado = document.querySelector("#introducirNumero")
const espacioJuego = document.querySelector("#espacioJuego")
const historialNum = document.querySelector("#historial")
//Mensaje de cortesía
cortesiaIntentos.innerHTML = `<p>Escribe un número del 1 al 20</p>`
//Capturar el número del botón
const btnComprobar = document.querySelector("#comprobar");
let numRand = generar();
btnComprobar.addEventListener("click", function (){
    if(intentos == 6){

        reiniciar()
        btnComprobar.innerHTML = `Comprobar`
    }else{
        const numeroSeleccionado = document.querySelector("#introducirNumero");
        console.log(numeroSeleccionado.value);
        comprobar()
        numeroSeleccionado.value = null;

    } 
});
function comprobar(){
    if(intentos < 5)    {
    if (numeroSeleccionado.value >= RANGO_MIN && numeroSeleccionado.value <= RANGO_MAX){
            console.log(numRand)
            if ( numRand == numeroSeleccionado.value){  //Coincide
                divResultado.innerHTML = `<h1>VICTORIA</h1>`
                divMensaje.innerHTML = `El número ganador era ${numRand}`;
                intentos = 6;
                btnComprobar.innerHTML = `REINICIAR`
            }else if(numRand < numeroSeleccionado.value ){ ///Te pasas
                intentos += 1;
                comprobarIntentos()
                historialNum.innerHTML += ` <p>${numeroSeleccionado.value}⬇  </p>`
                divMensaje.innerHTML = `Te has pasado`;


            }else{                                          ////te quedas corto
                intentos += 1;
                comprobarIntentos()
                historialNum.innerHTML += ` <p>${numeroSeleccionado.value}⬆  </p>`
                divMensaje.innerHTML = `Te has quedado corto`;
            }
        }else{
            console.log("El número no es válido ")
            divMensaje.innerHTML = `El número no es válido`;
        }
        }else{
            divMensaje.innerHTML = `No te quedan intentos`;
        }
}
function comprobarIntentos(){
    if (intentos >= INTENTOS_MAX){
        divResultado.innerHTML = `<h1>HAS PERDIDO</h1>`
        divMensaje.innerHTML ="";
        btnComprobar.innerHTML = `REINICIAR`
        intentos = 6;
        cortesiaIntentos.innerHTML = `` 
        divMensaje.innerHTML = `El número ganador era ${numRand}`;
    }else{
        cortesiaIntentos.innerHTML = `<p>Escribe un número del 1 al 20 --- INTENTOS ${5 - intentos}</p>` 
    }
    
}
function generar(){
    return(Math.floor(Math.random() * RANGO_MAX) +1);
}
function reiniciar(){
    numRand = generar();
    intentos=0;
    divResultado.innerHTML = "";
    divMensaje.innerHTML = "";
    historialNum.innerHTML = `<p>Historial de números : </p>`
}


