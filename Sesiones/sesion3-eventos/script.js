////    Eventos js

//Eventos de boton

const btn = document.querySelector("button");
btn.addEventListener("click", function(){
    console.log("Has hecho click")
})
btn.addEventListener("dblclick", function(){
    console.log("Has hecho doble click")
})
btn.addEventListener("mouseover", function(){
    console.log("Tienes el raton encima del botón")
})
btn.addEventListener("mouseout", function(){
    console.log("Has quitado el ratoon encima del botón")
})

//Eventos de fomulario

const inp = document.querySelector("input")
inp.addEventListener("change", function(){
    console.log("Has cambiado el valor del input")
})
inp.addEventListener("input", function(){
    console.log("Has escrito algo en el input")
})
inp.addEventListener("focus", function(){
    console.log("Estas foco en el input")
})
inp.addEventListener("blur", function(){
    console.log("Has quitado el foco del input")
})
const form = document.querySelector("form")
form.addEventListener("submit", function(event){

    event.preventDefault(); ///Para prevenir el evento que va predefinido
    console.log("Formulario enviado, pero no se envia")

})

//// cosas que nos da event
// ✅ Accés a informació de l'esdeveniment
document.addEventListener("click", function (event) {
    console.log("Tipus d'esdeveniment:", event.type);
    console.log("Element objectiu:", event.target);
    console.log("Element actual:", event.currentTarget);
    console.log("Coordenades:", event.clientX, event.clientY);
    console.log("Tecla premuda:", event.key);
    console.log("Botó del ratolí:", event.button);
});

// Exemple amb esdeveniment de teclat
document.addEventListener("keydown", function (event) {
    console.log("Tecla premuda:", event.key);
    console.log("Codi de tecla:", event.code);
    console.log("Ctrl premut:", event.ctrlKey);
    console.log("Shift premut:", event.shiftKey);
});