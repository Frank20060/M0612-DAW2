const divJuego = document.querySelector(".tablonDeJuegos");
const divMira = document.querySelector(".mirilla");
divJuego.addEventListener("mousemove", function(e){

    ////console.log("Se mueve", e.clientX, e.clientX)////Lo comento pa que no moleste
    divMira.style.top = e.clientY-50 + "px";
    divMira.style.left = e.clientX-50 + "px";

})
const btnJugar= document.querySelector("button")

btnJugar.addEventListener("click", function(){

    console.log("Vamos a Juagar");

})
let x = 1;
let y = 1;
let mult = 1;
let mult2 = 1;

const divPelota = document.querySelector(".balon")
const temporizador = setInterval(function(){

    console.log(x)
    
    if(x == (window.innerWidth-100) || x == 0){
        mult = -mult
    }
    if(y == (window.innerHeight-100) || y == 0){
        mult2 = -mult2
    }
    x += 1 * mult
    y += 1 * mult2
    divPelota.style.left=x+"px"
    divPelota.style.top=y+"px"

},1)
/*divPelota.addEventListener("click", function(){

    x = Math.floor(Math.random()*(window.innerWidth -120))
    y = Math.floor(Math.random()*(window.innerHeight -120))
    mult = Math.random() < 0.5 ? 1 : -1;
    mult2 = Math.random() < 0.5 ? 1 : -1;

})*/

onkeydown = function(e){
    
    if( e.code == "Space" && chocar()){
        x = Math.floor(Math.random()*(window.innerWidth -120))
        y = Math.floor(Math.random()*(window.innerHeight -120))
        mult = Math.random() < 0.5 ? 1 : -1;
        mult2 = Math.random() < 0.5 ? 1 : -1;
    }   

}

function chocar() {
    // Convertir estilos a números
    const miraTop = parseInt(divMira.style.top);
    const miraLeft = parseInt(divMira.style.left);

    // Comprobar colisión
    return (
        x < miraLeft + 120 &&
        x + 100 > miraLeft &&
        y < miraTop + 120 &&
        y + 100 > miraTop
    );
}