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
