// ------------------------------------------------------
// ARRAY INICIAL DE INCIDENCIAS (DATOS DE EJEMPLO)
// ------------------------------------------------------


export let listaIncidencias = [
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


// ------------------------------------------------------
// VARIABLES
// ------------------------------------------------------


export const bodyTabla = document.querySelector("tbody"); // Cuerpo de la tabla donde se insertan las filas
export const totInci = document.querySelector(".totalIncidencias"); // Contador de incidencias totales
export const contAbiertas = document.querySelector(".abiertas"); // Contador de incidencias abiertas
export const contProcesos = document.querySelector(".proceso"); // Contador de incidencias en proceso
export const contCerradas = document.querySelector(".cerradas"); // Contador de incidencias cerradas
export const form = document.getElementById("formIncidencia"); // Formulario de creación de incidencias
export const body = document.querySelector("body"); // Etiqueta body (usada para delegar eventos globales)
export const modalCrear = new bootstrap.Modal(document.querySelector(".modalFormCrear")); // Modal de creación
export const modalEditar = new bootstrap.Modal(document.querySelector(".modalFormEditar")); // Modal de edición
export const limpFiltros = document.querySelector("#limpiarfiltro"); // Botón para limpiar filtros
export const filtEstado = document.querySelector("#filtreEstat"); // Selector de filtro por estado
export const filtPrioridad = document.querySelector("#filtrePrioritat"); // Selector de filtro por prioridad


//Renderizar la tabla inicialmente con todas las incidencias
renderTabla(listaIncidencias);


// ------------------------------------------------------
// FUNCIÓN QUE GENERA EL HTML DE LA TABLA
// ------------------------------------------------------


export function renderTabla(incidencias) {
  let html = "";

  // Si no hay incidencias, mostrar mensaje vacío
  if (incidencias.length === 0) {
    html = `<tr><td colspan="8" class="text-center">No hay datos para mostrar</td></tr>`;
  } else {
    // Recorrer las incidencias y generar una fila por cada una
    for (let i = 0; i < incidencias.length; i++) {
      let claseEstado = "";
      let clasePrioridad = "";

      // Asignar color según el estado
      if (incidencias[i].estado === "abierto") {
        claseEstado = "bg-warning text-dark";
      } else if (incidencias[i].estado === "en_proceso") {
        claseEstado = "bg-info text-dark";
      } else if (incidencias[i].estado === "cerrado") {
        claseEstado = "bg-success text-dark";
      }

      // Asignar color según la prioridad
      if (incidencias[i].prioridad === "alta") {
        clasePrioridad = "bg-danger text-dark";
      } else if (incidencias[i].prioridad === "media") {
        clasePrioridad = "bg-warning text-dark";
      } else if (incidencias[i].prioridad === "baja") {
        clasePrioridad = "bg-primary text-dark";
      }

      // Generar HTML de cada fila de la tabla
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

  // Actualizar contadores
  totInci.innerHTML = listaIncidencias.length;
  let incidenciasAbiertas = listaIncidencias.filter((elemento) => elemento.estado == "abierto");
  contAbiertas.innerHTML = incidenciasAbiertas.length;
  let incidenciasProceso = listaIncidencias.filter((elemento) => elemento.estado == "en_proceso");
  contProcesos.innerHTML = incidenciasProceso.length;
  let incidenciasCerradas = listaIncidencias.filter((elemento) => elemento.estado == "cerrado");
  contCerradas.innerHTML = incidenciasCerradas.length;

  // Insertar las filas en la tabla
  bodyTabla.innerHTML = html;
}


// ------------------------------------------------------
// EVENTOS DE LOS BOTONES EDITAR Y ELIMINAR EN LA TABLA
// ------------------------------------------------------


bodyTabla.addEventListener("click", function (e) {
  if (e.target.classList.contains("editar")) {
    // Si se pulsa "Editar", obtener el id y llamar a la función editar()
    editar(e.target.getAttribute("data-id"));
  } else if (e.target.classList.contains("eliminar")) {
    // Si se pulsa "Eliminar", obtener el id y llamar a la función eliminar()
    eliminar(e.target.getAttribute("data-id"));
  }
});


// ------------------------------------------------------
// FUNCIÓN PARA ELIMINAR UNA INCIDENCIA
// ------------------------------------------------------


function eliminar(x) {
  // Filtrar el array para eliminar la incidencia seleccionada
  listaIncidencias = listaIncidencias.filter((elemento) => elemento.id != x);

  // Reasignar los IDs para mantener la secuencia
  listaIncidencias.forEach((elemento, idx = 0) => {
    elemento.id = idx + 1;
  });

  // Volver a renderizar la tabla actualizada
  if(filtEstado.value == "" && filtPrioridad.value == ""){
    renderTabla(listaIncidencias);
  }else{
    aplicarFiltros() 
  }
}


// ------------------------------------------------------
// FUNCIÓN PARA CARGAR DATOS EN EL FORMULARIO DE EDICIÓN
// ------------------------------------------------------


let editareventoID = "";


function editar(eventID) {
  editareventoID = eventID;

  // Buscar la incidencia a editar
  const incidenciaEditar = listaIncidencias.find((e) => e.id == eventID);

  // Rellenar los campos del formulario del modal con los datos actuales
  document.getElementById("tituloEditar").value = incidenciaEditar.titulo.trim();
  document.getElementById("descripcionEditar").value = incidenciaEditar.descripcion.trim();
  document.getElementById("estadoEditar").value = incidenciaEditar.estado.trim();
  document.getElementById("prioridadEditar").value = incidenciaEditar.prioridad.trim();
  document.getElementById("asignadoEditar").value = incidenciaEditar.asignado.trim();
  document.getElementById("fechaCreacionEditar").value = incidenciaEditar.fechaCreacion.trim();
}


// ------------------------------------------------------
// EVENTOS DE LOS BOTONES DE LOS MODALES (CREAR Y EDITAR)
// ------------------------------------------------------


body.addEventListener("click", function (event) {
  // Botón para enviar formulario de creación
  if (event.target.classList.contains("enviarFormulario")) {
    event.preventDefault();
    
    // Crear nueva incidencia con los valores del formulario -- Con alerta
    const respuesta = confirm("¿Estás seguro de que quieres editar este archivo?");
      if (respuesta) {
          alert("El archivo se ha añadido.");
          crearRegistro()
          form.reset();
          modalCrear.hide();
      } else {
          alert("El archivo no se ha añadido.");
          modalCrear.hide();
      }
  }

  // Botón para enviar formulario de edición -- Con alerta
  if (event.target.classList.contains("enviarFormularioEditar")) {
    event.preventDefault();
    const respuesta = confirm("¿Estás seguro de que quieres editar este archivo?");
      if (respuesta) {
          alert("El archivo se ha editado.");
          editarAnadirTabla()
          modalEditar.hide();
      } else {
          alert("El archivo no se ha editado.");
          modalEditar.hide();
      }

    // Crear objeto con los valores editados
    
  }
});
function crearRegistro(){

  const nuevaIncidencia = {
      id: listaIncidencias.length + 1,
      titulo: document.getElementById("titulo").value.trim(),
      descripcion: document.getElementById("descripcion").value.trim(),
      estado: document.getElementById("estado").value.trim(),
      prioridad: document.getElementById("prioridad").value.trim(),
      asignado: document.getElementById("asignado").value.trim(),
      fechaCreacion: document.getElementById("fechaCreacion").value.trim(),
    };

    // Agregar la nueva incidencia al array
    listaIncidencias.push(nuevaIncidencia);

    // Volver a renderizar la tabla y limpiar el formulario
    if(filtEstado.value == "" && filtPrioridad.value == ""){
      renderTabla(listaIncidencias);
    }else{
      aplicarFiltros() 
    }
    form.reset();
}
function editarAnadirTabla(){
  const incidenciaEditada = {
      id: editareventoID,
      titulo: document.getElementById("tituloEditar").value.trim(),
      descripcion: document.getElementById("descripcionEditar").value.trim(),
      estado: document.getElementById("estadoEditar").value.trim(),
      prioridad: document.getElementById("prioridadEditar").value.trim(),
      asignado: document.getElementById("asignadoEditar").value.trim(),
      fechaCreacion: document.getElementById("fechaCreacionEditar").value.trim(),
    };

    // Reemplazar la incidencia modificada en el array
    if (editareventoID !== -1) {
      listaIncidencias[editareventoID - 1] = incidenciaEditada;
    }

    // Actualizar la tabla y cerrar el modal

    if(filtEstado.value == "" && filtPrioridad.value == ""){
      renderTabla(listaIncidencias);
    }else{
      aplicarFiltros() 
    }
}


// ------------------------------------------------------
// LIMPIAR FILTROS
// ------------------------------------------------------


limpFiltros.addEventListener("click", function () {
  filtEstado.value = "";
  filtPrioridad.value = "";
  renderTabla(listaIncidencias);
});


// ------------------------------------------------------
// FILTRADO DE INCIDENCIAS
// ------------------------------------------------------


filtEstado.addEventListener("change", aplicarFiltros);
filtPrioridad.addEventListener("change", aplicarFiltros);
let incidenciasFiltradas = listaIncidencias;
function aplicarFiltros() {
  incidenciasFiltradas = listaIncidencias;

  // Filtrar por estado si se selecciona
  if (filtEstado.value) {
    incidenciasFiltradas = incidenciasFiltradas.filter((elemento) => elemento.estado == filtEstado.value);
  }

  // Filtrar por prioridad si se selecciona
  if (filtPrioridad.value) {
    incidenciasFiltradas = incidenciasFiltradas.filter((elemento) => elemento.prioridad == filtPrioridad.value);
  }

  // Mostrar el resultado filtrado en la tabla
  renderTabla(incidenciasFiltradas);
}
