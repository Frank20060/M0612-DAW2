////Todas las variables


import "../script.js"; // Importar variables 

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