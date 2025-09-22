const btnSeleccion = document.querySelector("button")

btnSeleccion.addEventListener("click", function(){

    btnSeleccion.innerHTML = "✔"

    btnSeleccion.classList.add("shadow")

})
btnSeleccion.addEventListener("dblclick", function(){

    btnSeleccion.classList.remove("shadow")

})

const jugadoresBeti = [
    { 
        nombre: "Isco", 
        apellido: "Alarcón", 
        direccion: { calle: "Triana", numero: 12 },
        skill: [
            { tipo: "técnica", valor: 9 },
            { tipo: "visión", valor: 8 }
        ]
    },
    { 
        nombre: "Nabil", 
        apellido: "Fekir", 
        direccion: { calle: "La Palmera", numero: 8 },
        skill: [
            { tipo: "dribbling", valor: 9 },
            { tipo: "velocidad", valor: 7 }
        ]
    },
    { 
        nombre: "Aitor", 
        apellido: "Ruibal", 
        direccion: { calle: "Heliopolis", numero: 22 },
        skill: [
            { tipo: "resistencia", valor: 8 },
            { tipo: "velocidad", valor: 8 }
        ]
    },
    { 
        nombre: "Claudio", 
        apellido: "Bravo", 
        direccion: { calle: "Macarena", numero: 5 },
        skill: [
            { tipo: "reflejos", valor: 9 },
            { tipo: "liderazgo", valor: 8 }
        ]
    },
    { 
        nombre: "Germán", 
        apellido: "Pezzella", 
        direccion: { calle: "Los Remedios", numero: 17 },
        skill: [
            { tipo: "defensa", valor: 9 },
            { tipo: "juego aéreo", valor: 8 }
        ]
    }
];
console.log(jugadoresBeti[1].apellido)
console.log(jugadoresBeti[1].direccion.calle)
console.log(jugadoresBeti[1].skill[1].valor)

const tabla = document.querySelector("tbody");

const btnGenerar = document.querySelector(".btnGenerar")
btnGenerar.addEventListener("click", function (){
    tabla.innerHTML = ""
    for(let i=0; i<5; i++){
        tabla.innerHTML += `
        <tr>
            <td>${i}</td>
            <td>${jugadoresBeti[i].nombre}</td>
            <td>${jugadoresBeti[i].apellido}</td>
            <td><button class="borrar" id="${i}">Borrar</button></td>
            <td><button class="editar" id="${i}">Editar</button></td>
        </tr>
        `
    }        
})

const tbodyTablaJugadores = document.querySelector("tbody")

tbodyTablaJugadores.addEventListener("click", function(event){   ///Se pone event y al hacer clik te da info del evento


    console.log("Has hacho click sobre el objeto con clases:", event.target.classList.value )///Aqui nos dice donde hacemos click con event.target

    if(event.target.classList.contains("borrar")){

        console.log("BORRAR")


    }
    if(event.target.classList.contains("editar")){

        console.log("EDITAR")

    }



})


