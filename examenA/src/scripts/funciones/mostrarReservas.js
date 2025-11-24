import { divReservas } from "../datos/variables.js";
import { zonaHoraria } from "../datos/franjaHoraria.js";

let mensaje;
let mensaje2;

export function mostrarDivsReservas() {
  divReservas.innerHTML = "";

  for (let i = 0; i < zonaHoraria.length; i++) {
    let todasLasReservas = "";
    let totalPersonas = 0;

    let reservasConPersonas = zonaHoraria[i].reserva.filter(
      (r) => r.personas > 0
    );
    reservasConPersonas.sort((a, b) => (a.timestamp || 0) - (b.timestamp || 0));

    for (let j = 0; j < reservasConPersonas.length; j++) {
      totalPersonas += reservasConPersonas[j].personas;
      todasLasReservas += `${reservasConPersonas[j].actividad}: ${reservasConPersonas[j].personas} personas<br>`;
    }

    if (totalPersonas === 0) {
      mensaje = "Sin reservas";
      mensaje2 = "Vacio";
    } else {
      mensaje = totalPersonas.toString() + " personas han reservado";
      mensaje2 = todasLasReservas;
    }

    const divReserva = `
    <div id="${zonaHoraria[i].horario}">
        <p>${zonaHoraria[i].horario}</p>
        <p>${mensaje}</p>
        <hr>
        <p>Reservas: </p>
        <p>${mensaje2}</p>
    </div>
  `;
    divReservas.innerHTML += divReserva;
  }
}

export function modificarDivsReservas(
  valorActividad,
  valorNumPersonas,
  valorFranjaHoraria
) {
  const franja = zonaHoraria.find(
    (zona) => zona.horario === valorFranjaHoraria
  );

  if (!franja) return;

  const reservaActividad = franja.reserva.find(
    (res) => res.actividad.toLowerCase() === valorActividad.toLowerCase()
  );

  if (reservaActividad) {
    if (!reservaActividad.timestamp) {
      reservaActividad.timestamp = Date.now();
    }
    reservaActividad.personas += parseInt(valorNumPersonas);
  }

  mostrarDivsReservas();
}
