/// Variables
/// Estructura del tablero
const casillas = [
    { numero: 0, top: 732, left: 158, tipo: 'inicio' },
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

const preguntas = [
  { pregunta: "¿Cuál es el planeta más grande del sistema solar?", opciones: ["Júpiter", "Saturno", "Neptuno"], respuestaCorrecta: "Júpiter" },
  { pregunta: "¿Quién pintó la Mona Lisa?", opciones: ["Leonardo da Vinci", "Pablo Picasso", "Miguel Ángel"], respuestaCorrecta: "Leonardo da Vinci" },
  { pregunta: "¿En qué continente se encuentra Egipto?", opciones: ["África", "Asia", "Europa"], respuestaCorrecta: "África" },
  { pregunta: "¿Cuál es el océano más grande del mundo?", opciones: ["Atlántico", "Índico", "Pacífico"], respuestaCorrecta: "Pacífico" },
  { pregunta: "¿Quién escribió 'Don Quijote de la Mancha'?", opciones: ["Miguel de Cervantes", "Lope de Vega", "Gabriel García Márquez"], respuestaCorrecta: "Miguel de Cervantes" },
  { pregunta: "¿Qué gas respiramos principalmente los seres humanos?", opciones: ["Oxígeno", "Nitrógeno", "Dióxido de carbono"], respuestaCorrecta: "Oxígeno" },
  { pregunta: "¿Cuántos lados tiene un hexágono?", opciones: ["Seis", "Cinco", "Ocho"], respuestaCorrecta: "Seis" },
  { pregunta: "¿Cuál es la capital de Francia?", opciones: ["París", "Londres", "Roma"], respuestaCorrecta: "París" },
  { pregunta: "¿Qué instrumento musical tiene teclas blancas y negras?", opciones: ["Piano", "Violín", "Guitarra"], respuestaCorrecta: "Piano" },
  { pregunta: "¿En qué año llegó el ser humano a la Luna?", opciones: ["1969", "1971", "1965"], respuestaCorrecta: "1969" },
  { pregunta: "¿Qué país ganó la Copa Mundial de Fútbol 2010?", opciones: ["España", "Alemania", "Brasil"], respuestaCorrecta: "España" },
  { pregunta: "¿Cuál es el metal más ligero?", opciones: ["Litio", "Aluminio", "Mercurio"], respuestaCorrecta: "Litio" },
  { pregunta: "¿Cuál es el idioma más hablado del mundo?", opciones: ["Inglés", "Mandarín", "Español"], respuestaCorrecta: "Mandarín" },
  { pregunta: "¿Qué animal pone huevos y amamanta a sus crías?", opciones: ["Ornitorrinco", "Murciélago", "Delfín"], respuestaCorrecta: "Ornitorrinco" },
  { pregunta: "¿Cuál es el país más grande del mundo?", opciones: ["China", "Rusia", "Canadá"], respuestaCorrecta: "Rusia" },
  { pregunta: "¿Qué número romano representa al 50?", opciones: ["L", "C", "X"], respuestaCorrecta: "L" },
  { pregunta: "¿Qué órgano del cuerpo humano bombea la sangre?", opciones: ["Corazón", "Pulmones", "Hígado"], respuestaCorrecta: "Corazón" },
  { pregunta: "¿Qué científico propuso la teoría de la relatividad?", opciones: ["Isaac Newton", "Albert Einstein", "Nikola Tesla"], respuestaCorrecta: "Albert Einstein" },
  { pregunta: "¿Cuál es la moneda oficial de Japón?", opciones: ["Yen", "Won", "Yuan"], respuestaCorrecta: "Yen" },
  { pregunta: "¿Qué animal es conocido como 'el rey de la selva'?", opciones: ["Tigre", "León", "Elefante"], respuestaCorrecta: "León" },
  { pregunta: "¿Cuántos colores tiene el arcoíris?", opciones: ["Siete", "Seis", "Ocho"], respuestaCorrecta: "Siete" },
  { pregunta: "¿En qué continente está Brasil?", opciones: ["Sudamérica", "África", "Oceanía"], respuestaCorrecta: "Sudamérica" },
  { pregunta: "¿Cuál es el país con más habitantes del mundo?", opciones: ["India", "China", "Estados Unidos"], respuestaCorrecta: "India" },
  { pregunta: "¿Quién descubrió América?", opciones: ["Cristóbal Colón", "Fernando de Magallanes", "Américo Vespucio"], respuestaCorrecta: "Cristóbal Colón" },
  { pregunta: "¿Qué vitamina se obtiene del sol?", opciones: ["Vitamina D", "Vitamina C", "Vitamina A"], respuestaCorrecta: "Vitamina D" },
  { pregunta: "¿Cuál es la capital de México?", opciones: ["Ciudad de México", "Guadalajara", "Monterrey"], respuestaCorrecta: "Ciudad de México" },
  { pregunta: "¿Qué planeta es conocido como el planeta rojo?", opciones: ["Venus", "Marte", "Júpiter"], respuestaCorrecta: "Marte" },
  { pregunta: "¿Cuál es el hueso más largo del cuerpo humano?", opciones: ["Fémur", "Tibia", "Húmero"], respuestaCorrecta: "Fémur" },
  { pregunta: "¿Qué país inventó la pizza?", opciones: ["Italia", "Estados Unidos", "Francia"], respuestaCorrecta: "Italia" },
  { pregunta: "¿Cuántos días tiene un año bisiesto?", opciones: ["366", "365", "364"], respuestaCorrecta: "366" },
  { pregunta: "¿Qué instrumento se usa para medir la temperatura?", opciones: ["Termómetro", "Barómetro", "Altímetro"], respuestaCorrecta: "Termómetro" },
  { pregunta: "¿Cuál es el símbolo químico del oro?", opciones: ["Au", "Ag", "O"], respuestaCorrecta: "Au" },
  { pregunta: "¿En qué país se encuentra la Torre Eiffel?", opciones: ["Francia", "Italia", "Inglaterra"], respuestaCorrecta: "Francia" },
  { pregunta: "¿Qué animal puede volar hacia atrás?", opciones: ["Colibrí", "Murciélago", "Águila"], respuestaCorrecta: "Colibrí" },
  { pregunta: "¿Cuántos continentes hay en el mundo?", opciones: ["Seis", "Siete", "Cinco"], respuestaCorrecta: "Siete" },
  { pregunta: "¿Cuál es el desierto más grande del mundo?", opciones: ["Sahara", "Antártico", "Gobi"], respuestaCorrecta: "Antártico" }
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
const chivatoTurno = document.querySelector(".chivatoTurnos");
const btnDado1 = document.querySelector('.btnDado1');
const btnDado2 = document.querySelector('.btnDado2');
const dadoJdr1 = document.querySelector('.dadoJdr1');
const dadoJdr2 = document.querySelector('.dadoJdr2');

const espacioPreguntas1 = document.querySelector(".preguntasJugador1")
const espacioPreguntas2 = document.querySelector(".preguntasJugador2")
const btnReiniciar = document.querySelector(".reiniciar")

const ficha1 = document.querySelector(".ficha1");
const ficha2 = document.querySelector(".ficha2");

//Eventos
btnDado1.addEventListener('click', () => tirarDado(1));
btnDado2.addEventListener('click', () => tirarDado(2));



let auxganar

//location.reload()


///reiniciar partida

btnReiniciar.addEventListener('click', function() {
    auxganar = false;

    jugador1.posicion = 0;
    jugador2.posicion = 0;

    // Mover fichas manualmente a la casilla 0  ///Si no se hace asi da error y no se puede cambiar el estado de los botones mas adelante
    ficha1.style.left = `${casillas[0].left}px`;
    ficha1.style.top = `${casillas[0].top}px`;
    ficha2.style.left = `${casillas[0].left + 20}px`;
    ficha2.style.top = `${casillas[0].top}px`;

    jugador1.perderTurno = false;
    jugador2.perderTurno = false;

    btnDado1.disabled = false;  // Jugador 1 puede tirar
    btnDado2.disabled = true;   // Jugador 2 espera
    btnReiniciar.disabled = true; // No se puede reiniciar hasta que alguien gane

    dadoJdr1.innerHTML = `<img src="img/dadosNegro/1.svg" alt="Dado del Jugador 1">`;
    dadoJdr2.innerHTML = `<img src="img/dadosRojos/1.svg" alt="Dado del Jugador 2">`;

    console.log("Partida reiniciada correctamente.");
});




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
                mover(1)
                cabioTurno(1)
                
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
                mover(2)
                cabioTurno(2)
            }, 500);
            
    }   
}
function cabioTurno(jugador) {
    if (auxganar) {
        // Si alguien ganó, desactivar ambos dados
        btnDado1.disabled = true;
        btnDado2.disabled = true;
        return;
    }

    if (jugador == 1) {
        // Turno del jugador 2
        if (jugador2.perderTurno) {
            console.log("Jugador 2 pierde turno");
            btnDado1.disabled = false;   // jugador 1 puede tirar
            btnDado2.disabled = true;    // jugador 2 bloqueado
            jugador2.perderTurno = false; // turno ya consumido
            chivatoTurno.innerHTML = `Turno del jugador 1`;
        } else {
            btnDado1.disabled = true;    // jugador 1 termina turno
            btnDado2.disabled = false;   // jugador 2 puede tirar
            chivatoTurno.innerHTML = `Turno del jugador 2`;
        }
    } else {
        // Turno del jugador 1
        if (jugador1.perderTurno) {
            console.log("Jugador 1 pierde turno");
            btnDado2.disabled = false;   // jugador 2 puede tirar
            btnDado1.disabled = true;    // jugador 1 bloqueado
            jugador1.perderTurno = false; // turno ya consumido
            chivatoTurno.innerHTML = `Turno del jugador 2`;
        } else {
            btnDado2.disabled = true;    // jugador 2 termina turno
            btnDado1.disabled = false;   // jugador 1 puede tirar
            chivatoTurno.innerHTML = `Turno del jugador 1`;
        }
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

            // Elegimos una pregunta aleatoria
            const preguntaAleatoria = preguntas[Math.floor(Math.random() * preguntas.length)];

            // Construimos el HTML de la pregunta (3 botones sin bucle)
            const htmlPregunta = `
                <div class="cuestionario">
                    <h2>${preguntaAleatoria.pregunta}</h2>
                    <div class="botonesCuestionario">
                        <button value="${preguntaAleatoria.opciones[0]}">${preguntaAleatoria.opciones[0]}</button>
                        <button value="${preguntaAleatoria.opciones[1]}">${preguntaAleatoria.opciones[1]}</button>
                        <button value="${preguntaAleatoria.opciones[2]}">${preguntaAleatoria.opciones[2]}</button>
                    </div>
                </div>
            `;

            const espacio = jugador == 1 ? espacioPreguntas1 : espacioPreguntas2;
            espacio.innerHTML = htmlPregunta;

            // Deshabilitamos ambos dados mientras responde
            btnDado1.disabled = true;
            btnDado2.disabled = true;

            // Listener en el contenedor de botones
            const contenedorBotones = espacio.querySelector(".botonesCuestionario");

            contenedorBotones.addEventListener("click", (event) => {
                if(event.target.tagName === 'BUTTON'){

                    const respuestaSeleccionada = event.target.value;

                    if (respuestaSeleccionada == preguntaAleatoria.respuestaCorrecta) {
                        espacio.innerHTML = "<p>✅ ¡Correcto!</p>";
                    } else {
                        espacio.innerHTML = "<p>❌ Incorrecto. Retrocedes una casilla.</p>";

                        // Retrocedemos la ficha visualmente
                        if (jugador == 1) {
                            jugador1.posicion = jugador1.posicion - 1;
                            ficha1.style.left = `${casillas[jugador1.posicion].left}px`;
                            ficha1.style.top = `${casillas[jugador1.posicion].top}px`;

                        } else {
                            jugador2.posicion = jugador2.posicion - 1;
                            ficha2.style.left = `${casillas[jugador2.posicion].left + 20}px`;
                            ficha2.style.top = `${casillas[jugador2.posicion].top}px`;
                            
                        }
                    }

                    // Esperamos 1s para que el jugador vea el mensaje, luego limpiamos y cambiamos turno
                    setTimeout(() => {
                        espacio.innerHTML = "";
                        cabioTurno(jugador); // pasa turno al siguiente jugador
                    }, 1000);
                }
            }); // listener solo se ejecuta una vez
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
            if (jugador == 1) {
                jugador1.perderTurno = true;
                btnDado1.disabled = true;
                btnDado2.disabled = false; // solo jugador 2 puede tirar
            } else {
                jugador2.perderTurno = true;
                btnDado2.disabled = true;
                btnDado1.disabled = false; // solo jugador 1 puede tirar
            }
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

            if (jugador == 1) {
                jugador2.perderTurno = true;
                btnDado2.disabled = true;
                btnDado1.disabled = false; // solo jugador 2 puede tirar
            } else {
                jugador1.perderTurno = true;
                btnDado1.disabled = true;
                btnDado2.disabled = false; // solo jugador 1 puede tirar
            }
            break;
            
        case 'meta':
            ganar(jugador)
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
    }, 1000);

}


///por implementar

function ganar(jugador){
    auxganar =true
    console.log(`ha ganado el jugador ${jugador}`)
    btnDado1.disabled= true;
    btnDado2.disabled= true;
    btnReiniciar.disabled = false;

}