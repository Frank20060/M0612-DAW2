const preguntas = [     ///generadas con chatGPT
    "¿Qué devuelve la función document.querySelector()?",
    "¿Qué es la especificidad en CSS y por qué es importante?",
    "¿Qué significa la sigla CSS?",
    "¿Qué diferencia hay entre relative, absolute y fixed en la propiedad position?",
    "¿Cuál es la diferencia entre div y span?",
    "¿Qué diferencia hay entre == y ===?",
    "¿Cómo se inserta una imagen en una página web?",
    "¿Qué significa la sigla HTML?",
    "¿Qué hace la propiedad display: flex;?",
    "¿Qué atributo de un enlace a indica la dirección a la que lleva?",
    "¿Qué es un array en JavaScript?",
    "¿Qué sucede si intentas acceder a una variable que no ha sido declarada?",
    "¿Cuál es la diferencia entre id y class en CSS?",
    "¿Qué significa que JavaScript sea un lenguaje interpretado?",
    "¿Qué propiedad se usa para cambiar el color de fondo?",
    "¿Cuál es la diferencia entre var, let y const?",
    "¿Qué diferencia hay entre ol y ul?",
    "¿Qué es una función de callback?",
    "¿Para qué sirve la etiqueta head?",
    "¿Qué selector se usa para dar estilo a todos los párrafos p dentro de un div con clase 'container'?",

  ];
  

///declaracion de variables

let POSICION = 0; //Posicion en la que queremos iniciar

const btnJuego = document.querySelector("button")
const divDado = document.querySelector("#dado")
const pPregunta = document.querySelector("#pregunta")
const mensajeFin = document.querySelector("#fin")
const posicion = document.querySelector("#posicion")

btnJuego.addEventListener("click", function(){
    let valorDado = Math.floor(Math.random()*6 +1)
    console.log("Le has dado al boton : " + valorDado)
    
    
    if(POSICION >= 20){ 
        
        posicion.innerHTML = `Posición del jugador: ${20}`
        pPregunta.innerHTML = `Pregunta: ${preguntas[19]}`
        divDado.innerHTML = `<p>?</p>`
        POSICION = 0;
        posicion.innerHTML = `Posición del jugador: ${0}`
        pPregunta.innerHTML = `Pregunta:`
        btnJuego.innerHTML = `Tirar Dado`
        btnJuego.classList.remove("rojo")
        mensajeFin.innerHTML = ``

    }else{
        divDado.innerHTML = `<p>${valorDado}</p>`
        ///Avanzamos la posicion      
        posicion.innerHTML = `Posición del jugador: ${POSICION}`
        pPregunta.innerHTML = `Pregunta: ${preguntas[POSICION]}`
        POSICION += valorDado;
        posicion.innerHTML = `Posición del jugador: ${POSICION}`
        pPregunta.innerHTML = `Pregunta: ${preguntas[POSICION]}`
        if(POSICION >= 20){
            posicion.innerHTML = `Posición del jugador: ${20}`
            pPregunta.innerHTML = `Pregunta: ${preguntas[19]}`
            btnJuego.innerHTML = `Reiniciar`
            btnJuego.classList.add("rojo")
            mensajeFin.innerHTML = `HAS LLEGADO AL FINAL`
        }
            
    }
   
    


})