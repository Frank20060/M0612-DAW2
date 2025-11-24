import { modal } from "../datos/variables.js";
import { actividades } from "../datos/actividades.js";
import { zonaHoraria } from "../datos/franjaHoraria.js";

export function functionMostrarModal(valorActividad, valorFranjaHoraria) {
  const franja = zonaHoraria.find(
    (zona) => zona.horario === valorFranjaHoraria
  );

  if (!franja) return;

  const reservaActividad = franja.reserva.find(
    (res) => res.actividad.toLowerCase() === valorActividad.toLowerCase()
  );

  if (!reservaActividad) return;

  const actividad = actividades.find(
    (act) => act.actividad.toLowerCase() === valorActividad.toLowerCase()
  );

  if (!actividad) return;

  let totalAcumulado = 0;
  for (let reserva of franja.reserva) {
    if (reserva.personas > 0) {
      let act = actividades.find(
        (a) => a.actividad.toLowerCase() === reserva.actividad.toLowerCase()
      );
      if (act) {
        totalAcumulado += parseInt(act.duracion) * reserva.personas;
      }
    }
  }

  modal.innerHTML = `
        <h2>Detalles de reservas para las ${valorFranjaHoraria}</h2>
        <table>
            <thead>
                <tr>
                    <th>Nombre de la actividad: </th>
                    <th>Numero de personas: </th>
                    <th>Duracion de la actividad: </th>
                    <th>Carga total de minutos: </th>
                </tr>
            </thead>
            <tbody>
                ${franja.reserva
                  .filter((reserva) => reserva.personas > 0)
                  .map((reserva) => {
                    const actividadInfo = actividades.find(
                      (act) =>
                        act.actividad.toLowerCase() ===
                        reserva.actividad.toLowerCase()
                    );
                    const duracion = actividadInfo
                      ? parseInt(actividadInfo.duracion)
                      : 0;
                    const cargaTotalMinutos = duracion * reserva.personas;

                    return `
                      <tr>
                          <td>${reserva.actividad}</td>
                          <td>${reserva.personas} personas</td>
                          <td>${duracion} minutos</td>
                          <td>${cargaTotalMinutos} de duración</td>
                      </tr>
                    `;
                  })
                  .join("")}
            </tbody>
        </table>
        <p class="total-acumulado">Total acumulado de carga de minutos para esta franja: <strong>${totalAcumulado} minutos</strong></p>
        <button id="cerrarModal">Cerrar</button>
    `;
  modal.showModal();
  const botonCerrar = modal.querySelector("#cerrarModal");
  botonCerrar.addEventListener("click", () => {
    modal.close();
  });
}
