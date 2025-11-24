import { tbody } from "../datos/variables.js";
import { actividades } from "../datos/actividades.js";


export function mostrarLista() {
    for (let i=0; i < actividades.length; i++) {
        tbody.innerHTML += `
            <tr>
                <td>${actividades[i].actividad}</td>
                <td>${actividades[i].duracion}</td>
                <td>${actividades[i].intensidad}</td>
                <td><img src="${actividades[i].foto}" alt="Imagen de la actividad"/></td>
            <tr>
        `;
    }
}