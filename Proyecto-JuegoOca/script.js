/// Variavles

const casillas = [

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
        jugador1.valorDado = valorDado;
        dadoJdr1.innerHTML = `<img src="img/dadosNegro/${valorDado}.svg" alt="Dado del Juegor 1">`;
        btnDado1.disabled = true;
        btnDado2.disabled = false;
    } else {
        jugador2.valorDado = valorDado;
        dadoJdr2.innerHTML = `<img src="img/dadosRojos/${valorDado}.svg" alt="Dado del Juegor 2">`;
        btnDado2.disabled = true;
        btnDado1.disabled = false;
    }
    
}