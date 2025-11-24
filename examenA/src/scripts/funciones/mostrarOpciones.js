import { actividad, franjaHoraria } from "../datos/variables.js";
import { actividades } from "../datos/actividades.js";
import { zonaHoraria } from "../datos/franjaHoraria.js";

export function mostrarOpcionesActividades() {
  let opciones = "";

  for (let i = 0; i < actividades.length; i++) {
    opciones += `<option value="${actividades[i].actividad}">${actividades[i].actividad}</option>`;
  }

  actividad.innerHTML = opciones;
}

export function mostrarOpcionesFranjaHoraria() {
  let opciones = "";

  for (let i = 0; i < zonaHoraria.length; i++) {
    opciones += `<option value="${zonaHoraria[i].horario}">${zonaHoraria[i].horario}</option>`;
  }

  franjaHoraria.innerHTML = opciones;
}
