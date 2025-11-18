
// Array de mesas con pedidos de ejemplo
const mesas = [
  { id: 1, pedido: [], estado: null },
  { 
    id: 2, 
    pedido: [
      { producto: "Heineken", cantidad: 2 },
      { producto: "Mahou 5 Estrellas", cantidad: 1 }
    ], 
    estado: "ocupado" 
  },
  { id: 3, pedido: [], estado: null },
  { 
    id: 4, 
    pedido: [
      { producto: "Estrella Damm", cantidad: 1 }
    ], 
    estado: "ocupado" 
  },
  { id: 5, pedido: [], estado: null },
  { id: 6, pedido: [], estado: null },
];

// Referencias a elementos
const salon = document.querySelector(".salon");
const mesaSeleccionada = document.querySelector(".mesaSeleccionada");
const form = document.getElementById("pedidoForm");
const selectMesaForm = form.querySelector('select[name="Mesa"]');
const selectCerveza = form.querySelector('select[name="cerveza"]');
const cantidadInput = form.querySelector('input[name="cantidad"]');

let idMesaSeleccionada = null;

// Función para renderizar las mesas
function renderMesas() {
  mesas.forEach(mesa => {
    const mesaDiv = document.getElementById(mesa.id);
    if (!mesaDiv) return;

    // Estado
    const estadoP = mesaDiv.querySelector("p");
    if (mesa.estado === "ocupado") {
      estadoP.textContent = "Estado: Ocupado";
      estadoP.classList.remove("libre");
      estadoP.classList.add("ocupado");
    } else {
      estadoP.textContent = "Estado: Libre";
      estadoP.classList.remove("ocupado");
      estadoP.classList.add("libre");
    }

    // Lista de pedidos
    const ul = mesaDiv.querySelector("ul");
    ul.innerHTML = "";
    mesa.pedido.forEach(item => {
      const li = document.createElement("li");
      li.textContent = `${item.cantidad} - ${item.producto}`;
      ul.appendChild(li);
    });
  });
}

// Inicial render
renderMesas();

// Click en mesas para seleccionar
salon.addEventListener("click", e => {
  const mesaDiv = e.target.closest(".mesa");
  if (!mesaDiv) return;

  idMesaSeleccionada = mesaDiv.id;
  selectMesaForm.value = idMesaSeleccionada; // sincroniza el select

  const mesa = mesas[idMesaSeleccionada-1];
  const estadoMesa = (mesa.estado != null) ? "Ocupado" : "Libre";

  const listaPedido = mesa.pedido.map(item => `<li>${item.cantidad} - ${item.producto}</li>`).join("");

  mesaSeleccionada.innerHTML = `
    <h1>Mesa seleccionada: ${idMesaSeleccionada}</h1>
    <p class="${(estadoMesa != "Ocupado") ? "libre" : "ocupado"}">Estado: ${estadoMesa}</p>
    <div class="listaPedido">
      <h2>Pedido:</h2>
      <ul>
        ${listaPedido}
      </ul>
    </div>
    <button id="limpiarMesa">Limpiar Mesa</button>
  `;

  // Botón limpiar mesa
  const btnLimpiar = document.getElementById("limpiarMesa");
    btnLimpiar.addEventListener("click", () => {
      const mesa = mesas[idMesaSeleccionada-1];
      mesa.pedido = [];
      mesa.estado = null;

      renderMesas();

      // Mantener el panel de mesaSeleccionada pero actualizado
      mesaSeleccionada.innerHTML = `
        <h1>Mesa seleccionada: ${idMesaSeleccionada}</h1>
        <p class="libre">Estado: Libre</p>
        <div class="listaPedido">
          <h2>Pedido:</h2>
          <ul></ul>
        </div>
        <button id="limpiarMesa">Limpiar Mesa</button>
      `;

      // Vuelve a añadir el listener al nuevo botón
      const nuevoBtnLimpiar = document.getElementById("limpiarMesa");
      nuevoBtnLimpiar.addEventListener("click", arguments.callee);
    });

});

// Form para añadir pedidos
form.addEventListener("submit", e => {
  e.preventDefault();

  const mesaId = selectMesaForm.value;
  const producto = selectCerveza.value;
  const cantidad = parseInt(cantidadInput.value);

  if (!mesaId || !producto || cantidad <= 0) return;

  const mesa = mesas[mesaId-1];

  // Agregar pedido y actualizar estado
  mesa.pedido.push({ producto, cantidad });
  mesa.estado = "ocupado";

  renderMesas();

  // Actualizar vista de mesa seleccionada si corresponde
  if (idMesaSeleccionada == mesaId) {
    const listaPedido = mesa.pedido.map(item => `<li>${item.cantidad} - ${item.producto}</li>`).join('');
    mesaSeleccionada.innerHTML = `
      <h1>Mesa seleccionada: ${mesaId}</h1>
      <p class="ocupado">Estado: Ocupado</p>
      <div class="listaPedido">
        <h2>Pedido:</h2>
        <ul>
          ${listaPedido}
        </ul>
      </div>
      <button id="limpiarMesa">Limpiar Mesa</button>
    `;

    const btnLimpiar = document.getElementById("limpiarMesa");
    btnLimpiar.addEventListener("click", () => {
      mesa.pedido = [];
      mesa.estado = null;
      renderMesas();
      mesaSeleccionada.innerHTML = "";
    });
  }

  // Reset form
  selectCerveza.value = "";
  cantidadInput.value = 1;
});


