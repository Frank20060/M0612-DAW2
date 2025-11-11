import {menu} from "./components/menu.js"
import { about } from "./components/vistas/about.js";
import { home } from "./components/vistas/home.js";
console.log("cargando index.js de proyecto1SPA");

const main = document.querySelector('main')

const header = document.querySelector('header')
header.innerHTML += menu



document.querySelector('#home').addEventListener("click", ()=>{
    
    main.innerHTML = home()

})
document.querySelector('#about').addEventListener("click", ()=>{
    
    main.innerHTML = about()

})
document.querySelector('#poke').addEventListener("click", ()=>{
    
    console.log('Pokemons')

})





