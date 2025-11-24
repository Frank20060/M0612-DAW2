import {
  botonMostrarOcultar,
  listaActividades,
  numPersonas,
  franjaHoraria,
  botonRegistrarReserva,
  divReservas,
} from "./datos/variables.js";
import { mostrarLista } from "./funciones/mostrarListaActividades.js";
import {
  mostrarOpcionesActividades,
  mostrarOpcionesFranjaHoraria,
} from "./funciones/mostrarOpciones.js";
import {
  mostrarDivsReservas,
  modificarDivsReservas,
} from "./funciones/mostrarReservas.js";
import { functionMostrarModal } from "./funciones/mostrarModal.js";

let valorActividad;
let valorNumPersonas;
let valorFranjaHoraria;

botonMostrarOcultar.addEventListener("click", async () => {
  listaActividades.classList.toggle("oculto");
});

mostrarLista();
mostrarOpcionesActividades();
mostrarOpcionesFranjaHoraria();

valorActividad = actividad.value;
valorNumPersonas = numPersonas.value;
valorFranjaHoraria = franjaHoraria.value;

actividad.addEventListener("change", async () => {
  valorActividad = actividad.value;
  mostrarDivsReservas(valorActividad);
});

numPersonas.addEventListener("change", async () => {
  valorNumPersonas = numPersonas.value;
});

franjaHoraria.addEventListener("change", async () => {
  valorFranjaHoraria = franjaHoraria.value;
});

mostrarDivsReservas();

botonRegistrarReserva.addEventListener("click", async () => {
  console.log("click en reserva");
  modificarDivsReservas(valorActividad, valorNumPersonas, valorFranjaHoraria);
});

divReservas.addEventListener("click", (event) => {
  const divClickeado = event.target.closest("div[id]");

  if (divClickeado) {
    const franjaSeleccionada = divClickeado.id;
    valorFranjaHoraria = franjaSeleccionada;
    functionMostrarModal(valorActividad, valorFranjaHoraria);
  }
});
