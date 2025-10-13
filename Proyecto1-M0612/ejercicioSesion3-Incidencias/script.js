
// ------------------------------------------------------
// ARRAY INICIAL DE INCIDENCIAS (DATOS DE EJEMPLO)
// ------------------------------------------------------

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

/*
  Guardar y recuperar incidencias en localStorage.
  Esto permite persistir los datos aunque se recargue la página.
  No está implementado en la lógica principal, pero sirve como referencia para futuras mejoras.
*/

// Recuperar del localStorage al cargar la página
const incidenciasGuardadas = JSON.parse(localStorage.getItem("incidencias"));
if (Array.isArray(incidenciasGuardadas) && incidenciasGuardadas.length > 0) {
  listaIncidencias = incidenciasGuardadas; // Si hay datos guardados, usarlos
}

// Funcion que guarda en localStorage cada vez que se modifica el array
function guardarIncidenciasEnLocalStorage() {
  localStorage.setItem("incidencias", JSON.stringify(listaIncidencias));
}




// ------------------------------------------------------
// VARIABLES GLOBALES Y REFERENCIAS A ELEMENTOS DEL DOM
// ------------------------------------------------------

const bodyTabla = document.querySelector("tbody"); // Cuerpo de la tabla donde se insertan las filas
const totInci = document.querySelector(".totalIncidencias"); // Contador de incidencias totales
const contAbiertas = document.querySelector(".abiertas"); // Contador de incidencias abiertas
const contProcesos = document.querySelector(".proceso"); // Contador de incidencias en proceso
const contCerradas = document.querySelector(".cerradas"); // Contador de incidencias cerradas
const form = document.getElementById("formIncidencia"); // Formulario de creación de incidencias
const body = document.querySelector("body"); // Etiqueta body (usada para delegar eventos globales)
const modalCrear = new bootstrap.Modal(document.querySelector(".modalFormCrear")); // Modal de creación
const modalEditar = new bootstrap.Modal(document.querySelector(".modalFormEditar")); // Modal de edición
const limpFiltros = document.querySelector("#limpiarfiltro"); // Botón para limpiar filtros
const filtEstado = document.querySelector("#filtreEstat"); // Selector de filtro por estado
const filtPrioridad = document.querySelector("#filtrePrioritat"); // Selector de filtro por prioridad



// Renderizar la tabla inicialmente con todas las incidencias al cargar la página
renderTabla(listaIncidencias);



// ------------------------------------------------------
// FUNCIÓN QUE GENERA EL HTML DE LA TABLA DE INCIDENCIAS
// ------------------------------------------------------
// Esta función recibe un array de incidencias y genera el HTML para mostrarlo en la tabla.
// También actualiza los contadores de estadísticas.


function renderTabla(incidencias) {
  let html = "";

  // Si no hay incidencias, mostrar mensaje vacío en la tabla
  if (incidencias.length === 0) {
    html = `<tr><td colspan="8" class="text-center">No hay datos para mostrar</td></tr>`;
  } else {
    // Recorrer las incidencias y generar una fila por cada una
    for (let i = 0; i < incidencias.length; i++) {
      let claseEstado = "";
      let clasePrioridad = "";

  // Asignar color según el estado (badge de Bootstrap)
      if (incidencias[i].estado === "abierto") {
        claseEstado = "bg-warning text-dark";
      } else if (incidencias[i].estado === "en_proceso") {
        claseEstado = "bg-info text-dark";
      } else if (incidencias[i].estado === "cerrado") {
        claseEstado = "bg-success text-dark";
      }

  // Asignar color según la prioridad (badge de Bootstrap)
      if (incidencias[i].prioridad === "alta") {
        clasePrioridad = "bg-danger text-dark";
      } else if (incidencias[i].prioridad === "media") {
        clasePrioridad = "bg-warning text-dark";
      } else if (incidencias[i].prioridad === "baja") {
        clasePrioridad = "bg-primary text-dark";
      }

  // Generar HTML de cada fila de la tabla con los datos de la incidencia
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

  // Actualizar contadores de estadísticas (total, abiertas, en proceso, cerradas)
  totInci.innerHTML = listaIncidencias.length;
  let incidenciasAbiertas = listaIncidencias.filter((elemento) => elemento.estado == "abierto");
  contAbiertas.innerHTML = incidenciasAbiertas.length;
  let incidenciasProceso = listaIncidencias.filter((elemento) => elemento.estado == "en_proceso");
  contProcesos.innerHTML = incidenciasProceso.length;
  let incidenciasCerradas = listaIncidencias.filter((elemento) => elemento.estado == "cerrado");
  contCerradas.innerHTML = incidenciasCerradas.length;

  // Insertar las filas generadas en el cuerpo de la tabla
  bodyTabla.innerHTML = html;
}



// ------------------------------------------------------
// EVENTOS DE LOS BOTONES EDITAR Y ELIMINAR EN LA TABLA
// ------------------------------------------------------
// Se usa delegación de eventos para detectar clicks en los botones de cada fila.
// Al pulsar "Editar" se abre el modal de edición con los datos de la incidencia.
// Al pulsar "Eliminar" se pide confirmación y se elimina la incidencia del array.


bodyTabla.addEventListener("click", function (e) {
  if (e.target.classList.contains("editar")) {
    // Si se pulsa "Editar", obtener el id y llamar a la función editar()
    editar(e.target.getAttribute("data-id"));
  } else if (e.target.classList.contains("eliminar")) {
    // Si se pulsa "Eliminar", obtener el id y llamar a la función eliminar()
    const respuesta = confirm("¿Estás seguro de que quieres eliminar esta incidencia?");
    if (respuesta) {
        alert("Incidencia Eliminada.");
        eliminar(e.target.getAttribute("data-id"));
    } else {
        alert("No se ha eliminado la incidencia.");
    }
    
  }
});



// ------------------------------------------------------
// FUNCIÓN PARA ELIMINAR UNA INCIDENCIA
// ------------------------------------------------------
// Elimina la incidencia seleccionada del array y actualiza la tabla y los contadores.


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
  guardarIncidenciasEnLocalStorage()
}


// Variable global para guardar el id de la incidencia que se está editando
let editareventoID = "";


// ------------------------------------------------------
// FUNCIÓN PARA CARGAR DATOS EN EL FORMULARIO DE EDICIÓN
// ------------------------------------------------------
// Busca la incidencia por id y rellena el formulario del modal de edición con sus datos.
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
// Listener global en el body para detectar clicks en los botones de los formularios.
// - Al crear: valida los datos, pide confirmación y añade la incidencia.
// - Al editar: valida los datos, pide confirmación y actualiza la incidencia.


body.addEventListener("click", function (event) {
  // Botón para enviar formulario de creación
  if (event.target.classList.contains("enviarFormulario")) {
    event.preventDefault();
    if (!validarFormulario('crear')) {
      alert("Por favor, rellena todos los campos correctamente.");
      return;
    }
    const respuesta = confirm("¿Estás seguro de que quieres añadir esta incidencia?");
    if (respuesta) {
      alert("La incidencia se ha añadido.");
      crearRegistro();
      form.reset();
      modalCrear.hide();
    } else {
      alert("La incidencia no se ha añadido.");
      modalCrear.hide();
    }
  }

  // Botón para enviar formulario de edición -- Con alerta
  if (event.target.classList.contains("enviarFormularioEditar")) {
    event.preventDefault();
    if (!validarFormulario('editar')) {
      alert("Por favor, rellena todos los campos correctamente.");
      return;
    }
    const respuesta = confirm("¿Estás seguro de que quieres editar esta incidencia?");
    if (respuesta) {
      alert("La incidencia se ha editado.");
      editarAnadirTabla();
      modalEditar.hide();
    } else {
      alert("La incidencia no se ha editado.");
      modalEditar.hide();
    }
  }

});
// ------------------------------------------------------
// FUNCIÓN DE VALIDACIÓN DE FORMULARIO
// ------------------------------------------------------
// Valida que todos los campos estén completos.
function validarFormulario(tipo) {
  let titulo, descripcion, estado, prioridad, asignado, fecha;
  if (tipo === 'crear') {
    titulo = document.getElementById("titulo").value.trim();
    descripcion = document.getElementById("descripcion").value.trim();
    estado = document.getElementById("estado").value;
    prioridad = document.getElementById("prioridad").value;
    asignado = document.getElementById("asignado").value.trim();
    fecha = document.getElementById("fechaCreacion").value;
  }else {
    titulo = document.getElementById("tituloEditar").value.trim();
    descripcion = document.getElementById("descripcionEditar").value.trim();
    estado = document.getElementById("estadoEditar").value;
    prioridad = document.getElementById("prioridadEditar").value;
    asignado = document.getElementById("asignadoEditar").value.trim();
    fecha = document.getElementById("fechaCreacionEditar").value;
  }
  // Validación todos los campos obligatorios 
  if (!titulo || !descripcion || !estado || !prioridad || !asignado || !fecha) {
    return false;
  }else {
    return true;
  }
}
// ------------------------------------------------------
// FUNCIÓN PARA CREAR UNA NUEVA INCIDENCIA
// ------------------------------------------------------
// Recoge los datos del formulario.
// crea el objeto de incidencia y lo añade al array principal.
function crearRegistro(){

  const nuevaIncidencia = {
    id: listaIncidencias.length + 1,
    titulo: document.getElementById("titulo").value.trim(),
    descripcion: document.getElementById("descripcion").value.trim(),
    estado: document.getElementById("estado").value.trim(),
    prioridad: document.getElementById("prioridad").value.trim(),
    asignado: document.getElementById("asignado").value.trim(),
    fechaCreacion: document.getElementById("fechaCreacion").value,
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
    guardarIncidenciasEnLocalStorage()
}
// ------------------------------------------------------
// FUNCIÓN PARA EDITAR UNA INCIDENCIA EXISTENTE
// ------------------------------------------------------
// Recoge los datos del formulario de edición.
// y actualiza el objeto correspondiente en el array principal.
function editarAnadirTabla(){
  // Convertir fecha de yyyy-mm-dd a dd-mm-yyyy
  const incidenciaEditada = {
    id: editareventoID,
    titulo: document.getElementById("tituloEditar").value.trim(),
    descripcion: document.getElementById("descripcionEditar").value.trim(),
    estado: document.getElementById("estadoEditar").value.trim(),
    prioridad: document.getElementById("prioridadEditar").value.trim(),
    asignado: document.getElementById("asignadoEditar").value.trim(),
    fechaCreacion: document.getElementById("fechaCreacionEditar").value,
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
  guardarIncidenciasEnLocalStorage()
}


// ------------------------------------------------------
// LIMPIAR FILTROS
// ------------------------------------------------------
// Al pulsar el botón de limpiar filtros, se restablecen los selectores y se muestra toda la tabla.


limpFiltros.addEventListener("click", function () {
  filtEstado.value = "";
  filtPrioridad.value = "";
  renderTabla(listaIncidencias);
});


// ------------------------------------------------------
// FILTRADO DE INCIDENCIAS
// ------------------------------------------------------
// Permite filtrar la tabla por estado y prioridad usando los selectores.
// Al cambiar el valor de los filtros, se actualiza la tabla mostrando solo las incidencias que cumplen los criterios.


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




