// Declaración de variables principales del juego
let tablero = []; // Matriz del tablero (17x17)
let snake = []; // Array que contiene los segmentos de la serpiente
let apple = []; // Array con las posiciones de las manzanas
let manzana = {}; // Objeto temporal (no se usa directamente)
let pared = {}; // Objeto temporal (no se usa directamente)
let paredes = []; // Array con las posiciones de las paredes
let snakeLength = 3; // Longitud inicial de la serpiente
let numManzanas = 3; // Número inicial de manzanas
let numParedes = 6; // Número inicial de paredes
let cabeza = {x: 8, y: 8} // Posición inicial de la cabeza de la serpiente
let reiniciarPartida = false // Controla si hay que reiniciar la partida
let puntos = 0; // Puntuación del jugador
let direccionConstante = 'izquierda' // Dirección inicial de movimiento
let speed = 200; // Velocidad del movimiento (milisegundos por tick)

/// Referencias a elementos del DOM
const zonaJuego = document.querySelector(".gameZone");
const zonaTablero = document.querySelector(".tablero");
const marcadorPuntos = document.querySelector(".marcadorPuntos");
const btnJuego = document.querySelector(".botones");
const btnIniciar = document.querySelector("#iniciar");
const btnParar = document.querySelector("#parar");

/// Se genera el tablero vacío al iniciar
generarTableroVacio();

let moverse; // Variable que almacenará el intervalo de movimiento

/// Eventos para los botones de iniciar/parar
btnJuego.addEventListener("click", function(e){
    if(e.target.id=='iniciar'){
        // Si se pulsa "Iniciar"
        btnParar.disabled = false;
        btnIniciar.disabled = true;
        // Se inicia el movimiento automático de la serpiente
        moverse = setInterval(()=>{
            mover(direccionConstante);
        }, speed);
    }else if(e.target.id=='parar'){
        // Si se pulsa "Parar"
        console.log('parar');
        btnParar.disabled = true;
        btnIniciar.disabled = false;
        clearInterval(moverse); // Se detiene el movimiento
    }
});

//// Control del teclado para cambiar la dirección
addEventListener("keydown", function(e){
    if(e.key == 'ArrowUp'){
        direccionConstante = 'arriba';
    }else if(e.key == 'ArrowDown'){
        direccionConstante = 'abajo';
    }else if(e.key == 'ArrowLeft'){
        direccionConstante = 'izquierda';
    }else if(e.key == 'ArrowRight'){
        direccionConstante = 'derecha';
    }
});

/// Función para generar las manzanas
function generarManzana(){  
    for (let i = 0; i<numManzanas; i++){
        let x = numAleatorio();
        let y = numAleatorio();
        // Se evita colocar manzanas encima de la serpiente o paredes
        if(tablero[x][y] == 'manzana' || tablero[x][y] == 'snake' || tablero[x][y] == 'cabeza' || tablero[x][y] == 'pared'){
            --i; // Si hay conflicto, se repite la iteración
        }else{
            tablero[x][y]  = 'manzana';
            const nuevaManzana = { x: x, y: y };
            apple[i] = nuevaManzana;
        }
    }
}

/// Función que crea un tablero vacío (nada en cada celda)
function generarTableroVacio(){
    let casilla = [];
    for (let i = 0; i<=16; i++){
        tablero[i]=[];
        for (let j = 0; j<=16; j++){
            tablero[i][j] = 'nada';
        }   
    }
    // Se reinicia la cabeza y se generan los elementos
    cabeza = {x: 8,y: 8};
    generarSnakeIncio();
    generarManzana();
    generarPared();
    renderTablero();
    direccionConstante = 'izquierda';
}

/// Dibuja el tablero en el HTML (actualiza DOM)
function renderTablero(){
    zonaTablero.innerHTML= '';
    for (let i = 0; i<=16; i++){ 
        let celda = `<div>`;
        for (let j = 0; j<=16; j++){
            // Cada celda tiene una clase según su contenido
            celda += `<div class='celda ${tablero[i][j]}' data-x ='${i}' data-y ='${j}' ></div>`;
        }
        celda += `</div>`;
        zonaTablero.innerHTML += celda;
        marcadorPuntos.innerHTML = `<p>PUNTOS: ${puntos }</p>`;
    }
}

/// Genera un número aleatorio entre 0 y 15 (para posiciones)
function numAleatorio(){
    return Math.floor(Math.random()*16); 
}

/// Genera paredes en posiciones aleatorias del tablero
function generarPared(){
    for (let i = 0; i<numParedes; i++){
        let x = numAleatorio();
        let y = numAleatorio();
        // Evita colocar una pared encima de otro objeto
        if(tablero[x][y] == 'manzana' || tablero[x][y] == 'snake' || tablero[x][y] == 'cabeza'|| tablero[x][y] == 'pared'){
            --i;
        }else{
            tablero[x][y]  = 'pared';
            const nuevaPared = { x: x, y: y };
            paredes[i] = nuevaPared;
        }
    }
}

/// Genera la serpiente al inicio
function generarSnakeIncio(){ 
    snake = []; // Reinicia el array
    const x = cabeza.x;
    let y = cabeza.y;

    // Se coloca la cabeza
    const head = { x: x, y: y };
    snake.push(head);
    tablero[x][y] = 'cabeza';

    // Se añaden los segmentos del cuerpo hacia la derecha
    for (let i = 1; i < snakeLength; i++) {
        y++; 
        const segmento = { x: x, y: y };
        snake.push(segmento);
        tablero[x][y] = 'snake';
    }
}

let antiguo = { x:'', y:'' }; // Guarda la posición del último segmento
let nuevaCabeza; // Nueva posición de la cabeza

/// Función principal de movimiento
function mover(direccion){  
    // Guarda la última posición de la cola
    antiguo.x = snake[snake.length-1].x;
    antiguo.y = snake[snake.length-1].y;

    // Calcula la nueva posición según la dirección
    switch(direccion){
        case 'arriba':
            nuevaCabeza= { x: cabeza.x -1, y: cabeza.y };
            break;
        case 'derecha':
            nuevaCabeza= { x: cabeza.x, y: cabeza.y +1};
            break;
        case 'izquierda':
            nuevaCabeza= { x: cabeza.x, y: cabeza.y-1 };
            break;
        case 'abajo':
            nuevaCabeza= { x: cabeza.x +1, y: cabeza.y };
            break;
    }

    // Si la nueva posición está vacía, se mueve sin problema
    if(tablero[nuevaCabeza.x][nuevaCabeza.y] == 'nada'){
        bloqueCodigoMover();
    }else{
        // Si hay algo en la posición nueva...
        if(tablero[nuevaCabeza.x][nuevaCabeza.y] == 'manzana'){ // Comer manzana
            puntos++;
            apple.pop();
            bloqueCodigoMover();

            // Si ya no quedan manzanas, gana el jugador
            if(apple.length == 0){
                ganar();
            }
        }
        // Si choca con pared, cuerpo o borde => pierde
        if(tablero[nuevaCabeza.x][nuevaCabeza.y] == 'pared' || tablero[nuevaCabeza.x][nuevaCabeza.y] == 'snake' || tablero[nuevaCabeza.x][nuevaCabeza.y] == undefined){
            perder();
        }
    }
}

/// Lógica al perder
function perder(){
    clearInterval(moverse);
    console.log("perder");
    btnParar.disabled = true;
    btnIniciar.disabled = false;
    reiniciarPartida = true;
    puntos = 0;
    numManzanas=3;
    snakeLength=3;
    direccion = 'izquierda';
    renderTablero();
    speed = 200;
    apple = [];
    generarTableroVacio();
}

/// Lógica al ganar
function ganar(){
    console.log("ganar");
    numManzanas++;
    snakeLength++;
    reiniciarPartida = false;
    puntos +=10;
    speed -=50;
    generarTableroVacio();
    renderTablero();
}

/// Bloque que ejecuta realmente el movimiento del cuerpo
function bloqueCodigoMover(){
    console.log("Camino despejado");
    console.log(nuevaCabeza);
    tablero[antiguo.x][antiguo.y] = 'nada'; // Borra la cola
    tablero[cabeza.x][cabeza.y] = 'snake';  // La antigua cabeza pasa a cuerpo
    tablero[nuevaCabeza.x][nuevaCabeza.y] = 'cabeza'; // Nueva cabeza
    cabeza.x = nuevaCabeza.x;
    cabeza.y = nuevaCabeza.y;
    snake.pop(); // Elimina el último segmento
    snake.unshift(nuevaCabeza); // Inserta la nueva cabeza
    renderTablero();
}

/// Función auxiliar (no se usa mucho)
function moverSerpiente(x, y){
    const posicionSnake = { x: x, y: y };
    snake.pop();
    snake.unshift(posicionSnake);
}



