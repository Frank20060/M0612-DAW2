////Array
let listaIncidencias = [
  {
    id: 1,
    titulo: "Error de inicio de sesión",
    descripcion: "Los usuarios no pueden iniciar sesión en el sistema",
    estado: "abierto",
    prioridad: "alta",
    fechaCreacion: "2024-01-15",
    asignado: "Juan García",
  },
  {
    id: 2,
    titulo: "Problema con la impresora",
    descripcion: "La impresora de la oficina no imprime correctamente",
    estado: "en_proceso",
    prioridad: "media",
    fechaCreacion: "2024-01-14",
    asignado: "María López",
  },
  {
    id: 3,
    titulo: "Actualización de software",
    descripcion: "Actualizar el software de seguridad de los ordenadores",
    estado: "cerrado",
    prioridad: "baja",
    fechaCreacion: "2024-01-10",
    asignado: "Pedro Martínez",
  },
  {
    id: 4,
    titulo: "Fallo en la red",
    descripcion: "No hay conexión a Internet en la sala de reuniones",
    estado: "abierto",
    prioridad: "alta",
    fechaCreacion: "2024-01-18",
    asignado: "Laura Fernández",
  },
  {
    id: 5,
    titulo: "Error en la base de datos",
    descripcion: "La base de datos no responde a las consultas",
    estado: "en_proceso",
    prioridad: "alta",
    fechaCreacion: "2024-01-19",
    asignado: "Carlos Ruiz",
  },
  {
    id: 6,
    titulo: "Solicitud de nuevo equipo",
    descripcion: "Solicitar un nuevo ordenador portátil para el departamento",
    estado: "abierto",
    prioridad: "media",
    fechaCreacion: "2024-01-20",
    asignado: "Ana Torres",
  },
];

///Variables
console.log("hols")


const bodyTabla = document.querySelector("tbody")
const totInci= document.querySelector(".totalIncidencias")
const contAbiertas = document.querySelector(".abiertas")
const contProcesos = document.querySelector(".proceso")
const contCerradas = document.querySelector(".cerradas")
const form = document.getElementById("formIncidencia")
const body = document.querySelector("body")
const modalCrear = new bootstrap.Modal(document.querySelector(".modalFormCrear"))

const limpFiltros = document.querySelector("#limpiarfiltro")
const filtEstado = document.querySelector("#filtreEstat")
const filtPrioridad = document.querySelector("#filtrePrioritat")

////////


renderTabla(listaIncidencias);


function renderTabla(incidencias) {
  let html = "";
  if (incidencias.length === 0) {
    html = `<tr><td colspan="8" class="text-center">No hay datos para mostrar.</td></tr>`;
  } else {
    for (let i = 0; i < incidencias.length; i++) {
      let claseEstado = "";
      if (incidencias[i].estado === "abierto") {
        claseEstado = "bg-warning text-dark";
      } else if (incidencias[i].estado === "en_proceso") {
        claseEstado = "bg-info text-dark";
      } else if (incidencias[i].estado === "cerrado") {
        claseEstado = "bg-success text-dark";
      }

      let clasePrioridad = "";
      if (incidencias[i].prioridad === "alta") {
        clasePrioridad = "bg-danger text-dark";
      } else if (incidencias[i].prioridad === "media") {
        clasePrioridad = "bg-warning text-dark";
      } else if (incidencias[i].prioridad === "baja") {
        clasePrioridad = "bg-primary text-dark";
      }

      html += `
        <tr>
          <td>${incidencias[i].id}</td>
          <td>${incidencias[i].titulo}</td>
          <td>${incidencias[i].descripcion}</td>
          <td><span class="badge ${claseEstado}">${incidencias[i].estado.charAt(0).toUpperCase() + incidencias[i].estado.slice(1)}</span></td>
          <td><span class="badge ${clasePrioridad}">${incidencias[i].prioridad.charAt(0).toUpperCase() + incidencias[i].prioridad.slice(1)}</span></td>
          <td>${incidencias[i].asignado}</td>
          <td>${incidencias[i].fechaCreacion}</td>
          <td>
            <button class="btn btn-sm btn-success editar" data-bs-toggle="modal" data-bs-target="#modalEditar" data-id="${incidencias[i].id}">Editar</button>
            <button class="btn btn-sm btn-danger eliminar" data-id="${incidencias[i].id}">Eliminar</button>
          </td>
        </tr>
      `;
    }
  }
  ///modalEditar
  totInci.innerHTML = listaIncidencias.length;
  incidenciasAbiertas = listaIncidencias.filter((elemento)=> elemento.estado == 'abierto'); 
  contAbiertas.innerHTML = incidenciasAbiertas.length;
  incidenciasProceso = listaIncidencias.filter((elemento)=> elemento.estado == 'en_proceso');
  contProcesos.innerHTML = incidenciasProceso.length
  incidenciasCerradas = listaIncidencias.filter((elemento)=> elemento.estado == 'cerrado');
  contCerradas.innerHTML = incidenciasCerradas.length


  bodyTabla.innerHTML = html;
}



////Eventos botones editar y eliminar
bodyTabla.addEventListener("click", function(e){

  if(e.target.classList.contains("editar")){
    
    editar(e.target.getAttribute("data-id"));

  }else{

    eliminar(e.target.getAttribute("data-id"));

  }

})

//Funcion eliminar

function eliminar(x){

  console.log(x)
  //Con un filto pongo unicamente en el array los elementos que no tengan el id de el boton eliminar que se ha presionado
  listaIncidencias = listaIncidencias.filter((elemento)=> elemento.id != x);
  // Pongo los ids bien
  listaIncidencias.forEach((elemento, idx = 0) => {
    elemento.id = idx + 1;
  });
  renderTabla(listaIncidencias);
  
}

//Funcion editar

function editar(eventID){
  console.log(eventID)
  ///Busco el id de la incidencia que quiero editar
  const incidenciaEditar = listaIncidencias.find((elemento)=> elemento.id == eventID);
  console.log(incidenciaEditar)
  
  //Relleno el formulario con los datos de la incidencia
  const idEditar = eventID; 
  document.getElementById("tituloEditar").value = incidenciaEditar.titulo, 
  document.getElementById("descripcionEditar").value = incidenciaEditar.descripcion,
  document.getElementById("estadoEditar").value = incidenciaEditar.estado,
  document.getElementById("prioridadEditar").value = incidenciaEditar.prioridad,
  document.getElementById("asignadoEditar").value = incidenciaEditar.asignado,
  document.getElementById("fechaCreacionEditar").value = incidenciaEditar.fechaCreacion
  ///Editr el arrat
  body.addEventListener("click", function(event){
    if(event.target.classList.contains("enviarFormularioEditar")){
      event.preventDefault();
      console.log("Efitar Array")
      // Recoger los valores del formulario
      const IncidenciaEditada = {
        id: idEditar,
        titulo: document.getElementById("tituloEditar").value,
        descripcion: document.getElementById("descripcionEditar").value,
        estado: document.getElementById("estadoEditar").value,
        prioridad: document.getElementById("prioridadEditar").value,
        asignado: document.getElementById("asignadoEditar").value,
        fechaCreacion: document.getElementById("fechaCreacionEditar").value
      };
      
    listaIncidencias[idEditar-1] = "";
    listaIncidencias[idEditar-1] = IncidenciaEditada;
    renderTabla(listaIncidencias);
    // Limpia el formulario
    form.reset()
    modalCrear.hide()
    }
});
}




////Enviar formulario

body.addEventListener("click", function(event){
  if(event.target.classList.contains("enviarFormulario")){
    event.preventDefault();
    console.log("Enviar formulario")
    // Recoger los valores del formulario
    const nuevaIncidencia = {
      id: listaIncidencias.length + 1,
      titulo: document.getElementById("titulo").value,
      descripcion: document.getElementById("descripcion").value,
      estado: document.getElementById("estado").value,
      prioridad: document.getElementById("prioridad").value,
      asignado: document.getElementById("asignado").value,
      fechaCreacion: document.getElementById("fechaCreacion").value
    };
    
  listaIncidencias.push(nuevaIncidencia);
  renderTabla(listaIncidencias);
  // Limpia el formulario
  form.reset()
  modalCrear.hide()
  }
});


/////Limpiar filtros
limpFiltros.addEventListener("click", function(){
    filtEstado.value = "";
    filtPrioridad.value = "";
    renderTabla(listaIncidencias);
})

/////Filtros
filtEstado.addEventListener("change", aplicarFiltros)
filtPrioridad.addEventListener("change", aplicarFiltros)

function aplicarFiltros(){

    incidenciasFiltradas = listaIncidencias;
    
    if(filtEstado.value){
        incidenciasFiltradas = incidenciasFiltradas.filter((elemento)=> elemento.estado == filtEstado.value);
    }
    if(filtPrioridad.value){
        incidenciasFiltradas = incidenciasFiltradas.filter((elemento)=> elemento.prioridad == filtPrioridad.value);
    }
    renderTabla(incidenciasFiltradas);
}
