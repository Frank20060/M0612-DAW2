const preguntas = [ 
    {
        enunciado: "¿Cuál es la red social más popular en 2025?",
        opciones: ["MySpace", "Instagram", "TikTok"],
        correcta: 2,
    },
    {
        enunciado: "¿Qué país ganó la Copa Mundial de la FIFA 2022?",
        opciones: ["Argentina", "Francia", "Brasil"],
        correcta: 0,
    },
    {
        enunciado: "¿Qué evento climático extremo ocurrió en varias partes del mundo en 2023?",
        opciones: ["Olas de calor", "Era glacial", "Erupciones volcánicas masivas"],
        correcta: 0,
    },
    {
        enunciado: "¿Cuál es la moneda digital más conocida actualmente?",
        opciones: ["Bitcoin", "PayPal", "Euro"],
        correcta: 0,
    },
    {
        enunciado: "¿Qué gigante tecnológico lanzó recientemente el modelo GPT-5?",
        opciones: ["Google", "OpenAI", "Meta"],
        correcta: 1,
    },
    {
        enunciado: "¿Qué tipo de energía está ganando popularidad para reducir emisiones de carbono?",
        opciones: ["Energía solar", "Carbón", "Gas natural"],
        correcta: 0,
    },
    {
        enunciado: "¿Qué plataforma de streaming tiene la serie más vista en 2024?",
        opciones: ["Netflix", "Disney+", "HBO Max"],
        correcta: 0,
    },
    {
        enunciado: "¿Qué empresa está liderando la carrera de autos eléctricos en 2025?",
        opciones: ["Tesla", "Ford", "Toyota"],
        correcta: 0,
    },
    {
        enunciado: "¿Cuál es la app más usada para mensajería instantánea en el mundo?",
        opciones: ["WhatsApp", "Telegram", "Signal"],
        correcta: 0,
    },
    {
        enunciado: "¿Qué país es conocido por su avance en inteligencia artificial en 2025?",
        opciones: ["China", "India", "Canadá"],
        correcta: 0,
    },
    {
        enunciado: "¿Qué red social es famosa por sus videos cortos virales?",
        opciones: ["TikTok", "Facebook", "LinkedIn"],
        correcta: 0,
    },
    {
        enunciado: "¿Qué evento deportivo se celebra cada cuatro años?",
        opciones: ["Olimpiadas", "Super Bowl", "Tour de Francia"],
        correcta: 0,
    },
    {
        enunciado: "¿Cuál es el buscador de internet más usado en el mundo?",
        opciones: ["Bing", "Yahoo", "Google"],
        correcta: 2,
    },
    {
        enunciado: "¿Qué empresa produce los iPhone?",
        opciones: ["Samsung", "Apple", "Huawei"],
        correcta: 1,
    },
    {
        enunciado: "¿Qué plataforma permite crear y compartir videos cortos verticales?",
        opciones: ["YouTube Shorts", "Netflix", "Spotify"],
        correcta: 0,
    },
    {
        enunciado: "¿Qué aplicación permite enviar dinero de forma digital entre amigos?",
        opciones: ["Venmo", "Instagram", "TikTok"],
        correcta: 0,
    },
    {
        enunciado: "¿Qué país lidera la producción de autos eléctricos en 2025?",
        opciones: ["Estados Unidos", "China", "Alemania"],
        correcta: 1,
    },
    {
        enunciado: "¿Qué plataforma es popular para comprar y vender productos en línea?",
        opciones: ["Amazon", "Netflix", "Spotify"],
        correcta: 0,
    },
    {
        enunciado: "¿Qué red social es usada principalmente para networking profesional?",
        opciones: ["LinkedIn", "TikTok", "Snapchat"],
        correcta: 0,
    },
    {
        enunciado: "¿Qué tecnología se usa para generar imágenes y textos mediante inteligencia artificial?",
        opciones: ["IA generativa", "Blockchain", "Cloud computing"],
        correcta: 0,
    },
];


let POSICION = 0; //Posicion en la que queremos iniciar

///Ponemos las variables que vamos a necesitar

const enunciado = document.querySelector(".question-title")
const btn1 = document.querySelector("#btn1")
const btn2 = document.querySelector("#btn2")
const btn3 = document.querySelector("#btn3")
const spanPosicionPly1 = document.querySelector("#posicionJdr1")
const spanDado = document.querySelector(".dice-number")
const btntirarDado = document.querySelector("#tirarDado")
const spanPosicionPly2 = document.querySelector("#posicionJdr2")
const contPreguntas = document.querySelector("#contPreguntas")
let contador=0;
let estado = false;
let estadoDado=true;
let ganar = false;
const porcentaje = document.querySelector("#pProgreso")
const barraProgreso = document.querySelector(".progress-fill")
const reloj = document.querySelector("#contador")
let segundos = 0;
const contadorTimpo = setInterval(() =>{
    if(!ganar){
        segundos++
        reloj.innerHTML = `⏱️ ${segundos}s`

    }else{

        clearInterval(contadorTimpo);

    }

}, 1000);

btntirarDado.addEventListener("click", function(){

    const valorDado = Math.floor(Math.random()*6 +1)  
    
    if(estadoDado){
        if (POSICION<20){

            contador++;
            contPreguntas.innerHTML = `Pregunta ${contador} de 10`
            spanDado.innerHTML = valorDado;
            POSICION += valorDado;
            if(POSICION<20){
                spanPosicionPly1.innerHTML = POSICION;
                porcentaje.innerHTML = `${POSICION*100/20} %`;
                document.querySelector('.progress-fill').style.width = (POSICION*100/20) + '%';
                estado = true;
            }else{
                POSICION = 20
                spanPosicionPly1.innerHTML = POSICION;
                porcentaje.innerHTML = `${POSICION*100/20} %`;
                document.querySelector('.progress-fill').style.width = (POSICION*100/20) + '%';
                estado = true;

            }
            enunciado.innerHTML = preguntas[POSICION-1].enunciado;
            btn1.innerHTML = preguntas[POSICION-1].opciones[0];
            btn2.innerHTML = preguntas[POSICION-1].opciones[1];
            btn3.innerHTML = preguntas[POSICION-1].opciones[2];
            
        }else{
            enunciado.innerHTML = "Has llegado al final, felicidades";
            btn1.innerHTML = "";
            btn2.innerHTML = "";
            btn3.innerHTML = "";
            ganar = true;
        }
    }
    
    estadoDado = false;
})
btn1.addEventListener("click", function(){
    if(estado){
        if(preguntas[POSICION-1].correcta == 0){
            
            if (POSICION >= 20){
                enunciado.innerHTML = "Has llegado al final, felicidades";
                btn1.innerHTML = "";
                btn2.innerHTML = "";
                btn3.innerHTML = "";
                ganar = true;
            }else{
                POSICION += 1;
                porcentaje.innerHTML = `${POSICION*100/20} %`;
                document.querySelector('.progress-fill').style.width = (POSICION*100/20) + '%';
                console.log("Has acertado");

            }
        }else{
            if(POSICION != 0){
                POSICION -= 1;
                porcentaje.innerHTML = `${POSICION*100/20} %` ;
                document.querySelector('.progress-fill').style.width = (POSICION*100/20) + '%';
                console.log("Has fallado");
            }
        }
    }
    spanPosicionPly1.innerHTML = POSICION;
    estado = false;
    estadoDado = true;
})
btn2.addEventListener("click", function(){
   if(estado){
        if(preguntas[POSICION-1].correcta == 1){
            
            if (POSICION >= 20){
                enunciado.innerHTML = "Has llegado al final, felicidades";
                btn1.innerHTML = "";
                btn2.innerHTML = "";
                btn3.innerHTML = "";
                
            ganar = true;
            }else{
                POSICION += 1;
                porcentaje.innerHTML = `${POSICION*100/20} %`;
                document.querySelector('.progress-fill').style.width = (POSICION*100/20) + '%';
                console.log("Has acertado");

            }
        }else{
            if(POSICION != 0){
                POSICION -= 1;
                porcentaje.innerHTML = `${POSICION*100/20} %`;
                document.querySelector('.progress-fill').style.width = (POSICION*100/20) + '%';
                console.log("Has fallado");
            }
        }
    }
    spanPosicionPly1.innerHTML = POSICION;
    estado = false;
    estadoDado = true;
})
btn3.addEventListener("click", function(){
    if(estado){
        if(preguntas[POSICION-1].correcta == 2){
            
            
            if (POSICION >= 20){
        
                enunciado.innerHTML = "Has llegado al final, felicidades";
                btn1.innerHTML = "";
                btn2.innerHTML = "";
                btn3.innerHTML = "";
                ganar = true;
            }else{
                POSICION += 1;
                porcentaje.innerHTML = `${POSICION*100/20} %`;
                document.querySelector('.progress-fill').style.width = (POSICION*100/20) + '%';
                console.log("Has acertado");

            }

        }else{
            if(POSICION != 0){
                POSICION -= 1;
                porcentaje.innerHTML = `${POSICION*100/20} %`;
                document.querySelector('.progress-fill').style.width = (POSICION*100/20) + '%';
                console.log("Has fallado");
            }
            
        }
    }
    spanPosicionPly1.innerHTML = POSICION;
    estado = false;
    estadoDado = true;
})





