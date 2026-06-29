/* ============================================================
   main.js — JavaScript MÍNIMO indispensable
   Solo se usa para lo que no se puede resolver con HTML/CSS.
   Cada bloque comprueba que los elementos existan antes de
   actuar, así el mismo archivo sirve para todas las pantallas
   sin romperse si algún elemento no está.
   ============================================================ */

/* ------------------------------------------------------------
   1) CONTADOR DE PASAJEROS (pantalla de búsqueda)
   Suma o resta pasajeros (mínimo 1, máximo 6) y actualiza el
   texto. No se puede hacer solo con HTML/CSS porque hay que
   calcular y mostrar un número que cambia.
   ------------------------------------------------------------ */
const valorPasajeros = document.querySelector('[data-contador-valor]');
const btnMas = document.querySelector('[data-contador-mas]');
const btnMenos = document.querySelector('[data-contador-menos]');

if (valorPasajeros && btnMas && btnMenos) {
  let pasajeros = 1;

  // Muestra "1 Pasajero" o "N Pasajeros" según corresponda.
  function mostrarPasajeros() {
    const etiqueta = pasajeros === 1 ? 'Pasajero' : 'Pasajeros';
    valorPasajeros.textContent = pasajeros + ' ' + etiqueta;
  }

  btnMas.addEventListener('click', function () {
    if (pasajeros < 6) {
      pasajeros++;
      mostrarPasajeros();
    }
  });

  btnMenos.addEventListener('click', function () {
    if (pasajeros > 1) {
      pasajeros--;
      mostrarPasajeros();
    }
  });
}

/* ------------------------------------------------------------
   2) INTERCAMBIO ORIGEN / DESTINO (swap)
   Cambia el valor seleccionado entre los dos <select>.
   ------------------------------------------------------------ */
const btnSwap = document.querySelector('[data-swap]');
const selectOrigen = document.querySelector('[data-origen]');
const selectDestino = document.querySelector('[data-destino]');

if (btnSwap && selectOrigen && selectDestino) {
  btnSwap.addEventListener('click', function () {
    const temporal = selectOrigen.value;
    selectOrigen.value = selectDestino.value;
    selectDestino.value = temporal;
  });
}

/* ------------------------------------------------------------
   3) NAVEGACIÓN SIMULADA DEL FORMULARIO DE BÚSQUEDA
   Al "Buscar viajes" no enviamos datos a ningún servidor
   (es un mockup académico): solo avanzamos al siguiente paso
   del flujo de compra.
   ------------------------------------------------------------ */
const formBusqueda = document.getElementById('form-busqueda');

if (formBusqueda) {
  formBusqueda.addEventListener('submit', function (evento) {
    evento.preventDefault(); // evita recargar la página
    window.location.href = 'seleccion-servicio.html';
  });
}

/* ------------------------------------------------------------
   4) SELECCIÓN DE SERVICIO — resumen dinámico
   Al elegir una clase, recalculamos el resumen (tarifa,
   impuestos 7% y total). El resaltado visual de la fila lo
   hace SOLO el CSS (radio :checked); acá solo hacemos la cuenta.
   ------------------------------------------------------------ */
const opcionesServicio = document.querySelectorAll('input[name="servicio"]');
const resumenClase = document.querySelector('[data-resumen-clase]');
const resumenTarifa = document.querySelector('[data-resumen-tarifa]');
const resumenImpuestos = document.querySelector('[data-resumen-impuestos]');
const resumenTotal = document.querySelector('[data-resumen-total]');

if (
  opcionesServicio.length &&
  resumenClase &&
  resumenTarifa &&
  resumenImpuestos &&
  resumenTotal
) {
  const TASA_IMPUESTOS = 0.07; // 7%

  // Da formato de miles en español: 35000 -> "35.000"
  function formatearPesos(numero) {
    return numero.toLocaleString('es-AR');
  }

  // Actualiza el panel de resumen según la clase elegida.
  function actualizarResumen(radio) {
    const clase = radio.dataset.clase;
    const precio = parseInt(radio.dataset.precio, 10);
    const impuestos = Math.round(precio * TASA_IMPUESTOS);
    const total = precio + impuestos;

    resumenClase.textContent = clase;
    resumenTarifa.textContent = 'ARS ' + formatearPesos(precio);
    resumenImpuestos.textContent = 'ARS ' + formatearPesos(impuestos);
    resumenTotal.textContent = 'ARS ' + formatearPesos(total);
  }

  // Cada vez que cambia la selección, recalcula.
  opcionesServicio.forEach(function (radio) {
    radio.addEventListener('change', function () {
      actualizarResumen(radio);
    });
  });

  // Inicializa el resumen con la opción que viene marcada.
  const seleccionInicial = document.querySelector('input[name="servicio"]:checked');
  if (seleccionInicial) {
    actualizarResumen(seleccionInicial);
  }
}

/* Botón "Seleccionar" → siguiente paso del flujo de compra. */
const btnSeleccionar = document.querySelector('[data-seleccionar]');

if (btnSeleccionar) {
  btnSeleccionar.addEventListener('click', function () {
    window.location.href = 'detalles-servicio.html';
  });
}
