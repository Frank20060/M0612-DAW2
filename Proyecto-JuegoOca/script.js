/// Variables
/// Estructura del tablero
const casillas = [
    { numero: 0, top: 732, left: 158, tipo: 'normal' },
    { numero: 1, top: 630, left: 165, tipo: 'normal' },
    { numero: 2, top: 545, left: 180, tipo: 'avanza', destino: 21 },
    { numero: 3, top: 450, left: 190, tipo: 'normal' },
    { numero: 4, top: 375, left: 200, tipo: 'normal' },
    { numero: 5, top: 285, left: 215, tipo: 'perdeTurno' },
    { numero: 6, top: 190, left: 225, tipo: 'normal' },
    { numero: 7, top: 190, left: 325, tipo: 'avanzaEstrella', destino: 11 },
    { numero: 8, top: 190, left: 430, tipo: 'normal' },
    { numero: 9, top: 195, left: 505, tipo: 'normal' },
    { numero: 10, top: 195, left: 600, tipo: 'normal' },
    { numero: 11, top: 200, left: 685, tipo: 'normal' },
    { numero: 12, top: 205, left: 785, tipo: 'vuelveInicio', destino: 0 },
    { numero: 13, top: 290, left: 795, tipo: 'normal' },
    { numero: 14, top: 390, left: 800, tipo: 'suerte', destino: 29 },
    { numero: 15, top: 490, left: 810, tipo: 'normal' },
    { numero: 16, top: 630, left: 820, tipo: 'normal' },
    { numero: 17, top: 620, left: 700, tipo: 'normal' },
    { numero: 18, top: 625, left: 585, tipo: 'perdeTurno' },
    { numero: 19, top: 625, left: 455, tipo: 'normal' },
    { numero: 20, top: 605, left: 345, tipo: 'normal' },
    { numero: 21, top: 530, left: 300, tipo: 'normal' },
    { numero: 22, top: 415, left: 305, tipo: 'avanza', destino: 24 },
    { numero: 23, top: 305, left: 325, tipo: 'normal' },
    { numero: 24, top: 285, left: 410, tipo: 'normal' },
    { numero: 25, top: 290, left: 505, tipo: 'malaSuerte', destino: 9 },
    { numero: 26, top: 290, left: 600, tipo: 'normal' },
    { numero: 27, top: 290, left: 690, tipo: 'normal' },
    { numero: 28, top: 360, left: 695, tipo: 'normal' },
    { numero: 29, top: 410, left: 700, tipo: 'normal' },
    { numero: 30, top: 500, left: 685, tipo: 'retrocede', destino: 27 },
    { numero: 31, top: 495, left: 605, tipo: 'tiraOtraVez' },
    { numero: 32, top: 495, left: 505, tipo: 'normal' },
    { numero: 33, top: 490, left: 415, tipo: 'retrocede', destino: 20 },
    { numero: 34, top: 395, left: 420, tipo: 'normal' },
    { numero: 35, top: 390, left: 515, tipo: 'normal' },
    { numero: 36, top: 395, left: 585, tipo: 'meta' }
];

let jugador1 = {
    posicion: 0,
    valorDado: 1,
    perderTurno: false
};
let jugador2 = {
    posicion: 0,
    valorDado: 1,
    perderTurno: false
};

//Variables del DOM
const tablero = document.querySelector(".divTablero");

const btnDado1 = document.querySelector('.btnDado1');
const btnDado2 = document.querySelector('.btnDado2');
const dadoJdr1 = document.querySelector('.dadoJdr1');
const dadoJdr2 = document.querySelector('.dadoJdr2');

const ficha1 = document.querySelector(".ficha1");
const ficha2 = document.querySelector(".ficha2");

//Eventos
btnDado1.addEventListener('click', () => tirarDado(1));
btnDado2.addEventListener('click', () => tirarDado(2));

//Funciones
function tirarDado(x){
    
    let valorDado = Math.floor(Math.random() * 6) + 1;
    if (x == 1){
        
        dadoJdr1.classList.add('tirando');
        btnDado1.disabled = true;
        
        setTimeout(() => {
            dadoJdr1.classList.remove('tirando');
            jugador1.valorDado = valorDado;
            jugador1.posicion += valorDado;
            if(jugador1.posicion > 36){
                jugador1.posicion = 36;
            }
            dadoJdr1.innerHTML = `<img src="img/dadosNegro/${valorDado}.svg" alt="Dado del Juegor 1">`;
            
            if(jugador2.perderTurno){
                btnDado2.disabled = true;
                btnDado1.disabled = false;
            }else{
                btnDado2.disabled = false;
            }

            mover(1)

        }, 500);
    } else {
        dadoJdr2.classList.add('tirando');
        btnDado2.disabled = true;
        setTimeout(() => {
            dadoJdr2.classList.remove('tirando');
            jugador2.valorDado = valorDado;
            jugador2.posicion += valorDado;
            if(jugador2.posicion > 36){
                jugador2.posicion = 36;
            }
            dadoJdr2.innerHTML = `<img src="img/dadosRojos/${valorDado}.svg" alt="Dado del Juegor 2">`;
            
            if(jugador1.perderTurno){
                btnDado1.disabled = true;
                btnDado2.disabled = false;
            }else{
                btnDado1.disabled = false;
            }
            
            mover(2)
        }, 500);
    }   
}




function mover(jugador){
       
    if(jugador == 1){
        ficha1.style.left = `${casillas[jugador1.posicion].left}px`;
        ficha1.style.top = `${casillas[jugador1.posicion].top}px`;
        if(jugador1.posicion == jugador2.posicion ){
            jugador2.posicion = 0;
            mover(2)
            console.log("Has matado a la ficha rival")
        }
        comprobarAccion(1)

    }else{
        ficha2.style.left = `${casillas[jugador2.posicion].left + 20}px`;
        ficha2.style.top = `${casillas[jugador2.posicion].top }px`;
        if(jugador1.posicion == jugador2.posicion ){
            jugador1.posicion = 0;
            mover(1)
            console.log("Has matado a la ficha rival")
        }
        comprobarAccion(2)
    }
}

let posicionJugador
function comprobarAccion(jugador){
    
    if(jugador == 1){
        posicionJugador = jugador1.posicion
    }else{
        posicionJugador = jugador2.posicion
    }
    switch(casillas[posicionJugador].tipo){

        case 'inicio':
            console.log('Casilla: inicio');
            break;

        case 'normal':
            console.log('Casilla: normal');
            break;

        case 'avanza':
            console.log('Casilla: avanza');
            moverEspecial(jugador)
            break;

        case 'avanzaEstrella':
            console.log('Casilla: avanzaEstrella');
            moverEspecial(jugador)
            break;

        case 'perdeTurno':
            console.log('Casilla: perdeTurno');
            break;

        case 'suerte':
            console.log('Casilla: suerte');
            moverEspecial(jugador)
            break;

        case 'vuelveInicio':
            console.log('Casilla: vuelveInicio');
            moverEspecial(jugador)
            break;

        case 'malaSuerte':
            console.log('Casilla: malaSuerte');
            moverEspecial(jugador)
            break;

        case 'retrocede':
            console.log('Casilla: retrocede');
            moverEspecial(jugador)
            break;

        case 'tiraOtraVez':
            console.log('Casilla: tiraOtraVez');
            break;

        case 'meta':
            console.log('Casilla: meta');
            break;

        default:
            console.warn('Tipo de casilla desconocido');
    }

}

function moverEspecial(jugador){

     if(jugador == 1){
        jugador1.posicion = casillas[posicionJugador].destino
    }else{
        jugador2.posicion = casillas[posicionJugador].destino
    }
    setTimeout(() => {
        mover(jugador)
    }, 500);

}