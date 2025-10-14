/// Variavles
/// Estructura del tablero

/*      Añadir las posiciones top y left para cada casilla
, top: x, left: y
*/
const casillas = [
    { numero: 1, tipo: 'normal' },
    { numero: 2, tipo: 'avanza', destino: 21},
    { numero: 3, tipo: 'normal' },
    { numero: 4, tipo: 'normal' },
    { numero: 5, tipo: 'perdeTurno' },
    { numero: 6, tipo: 'normal' },
    { numero: 7, tipo: 'avanzaEstrella', destino: 11 },
    { numero: 8, tipo: 'normal' },
    { numero: 9, tipo: 'normal' },
    { numero: 10, tipo: 'normal' },
    { numero: 11, tipo: 'normal' },
    { numero: 12, tipo: 'vuelveInicio', destino: 1 },
    { numero: 13, tipo: 'normal' },
    { numero: 14, tipo: 'suerte', destino: 29 },
    { numero: 15, tipo: 'normal' },
    { numero: 16, tipo: 'normal' },
    { numero: 17, tipo: 'normal' },
    { numero: 18, tipo: 'perdeTurno' },
    { numero: 19, tipo: 'normal' },
    { numero: 20, tipo: 'normal' },
    { numero: 21, tipo: 'normal' },
    { numero: 22, tipo: 'avanza', destino: 24 },
    { numero: 23, tipo: 'normal' },
    { numero: 24, tipo: 'normal' },
    { numero: 25, tipo: 'malaSuerte', destino: 9 },
    { numero: 26, tipo: 'normal' },
    { numero: 27, tipo: 'normal' },
    { numero: 28, tipo: 'normal' },
    { numero: 29, tipo: 'normal' },
    { numero: 30, tipo: 'retrocede', destino: 27 },
    { numero: 31, tipo: 'tiraOtraVez' },
    { numero: 32, tipo: 'normal' },
    { numero: 33, tipo: 'retrocede', destino: 20 },
    { numero: 34, tipo: 'normal' },
    { numero: 35, tipo: 'normal' },
    { numero: 36, tipo: 'meta' }
];

let jugador1 = {
    posicion: 0,
    valorDado: 1,
};
let jugador2 = {
    posicion: 0,
    valorDado: 1,
};



//Variables del DOM

const btnDado1 = document.querySelector('.btnDado1');
const btnDado2 = document.querySelector('.btnDado2');
const dadoJdr1 = document.querySelector('.dadoJdr1');
const dadoJdr2 = document.querySelector('.dadoJdr2');

//Eventos

btnDado1.addEventListener('click', () => tirarDado(1));   //x es 1 o 2 dependiendo del jugador
btnDado2.addEventListener('click', () => tirarDado(2));   //x es 1 o 2 dependiendo del jugador

//Funciones

function tirarDado(x){
    
    let valorDado = Math.floor(Math.random() * 6) + 1;
    if (x == 1){
        
        dadoJdr1.classList.add('tirando');
        setTimeout(() => {
            dadoJdr1.classList.remove('tirando');
            jugador1.valorDado = valorDado;
            dadoJdr1.innerHTML = `<img src="img/dadosNegro/${valorDado}.svg" alt="Dado del Juegor 1">`;
            btnDado1.disabled = true;
            btnDado2.disabled = false;
        }, 500);
    } else {
        dadoJdr2.classList.add('tirando');
        setTimeout(() => {
            dadoJdr2.classList.remove('tirando');
            jugador2.valorDado = valorDado;
            dadoJdr2.innerHTML = `<img src="img/dadosRojos/${valorDado}.svg" alt="Dado del Juegor 2">`;
            btnDado2.disabled = true;
            btnDado1.disabled = false;
        }, 500);
    }   
}