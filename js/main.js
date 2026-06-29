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

/* Botón "Seleccionar" → siguiente paso del flujo de compra
   (selección de asientos). */
const btnSeleccionar = document.querySelector('[data-seleccionar]');

if (btnSeleccionar) {
  btnSeleccionar.addEventListener('click', function () {
    window.location.href = 'seleccion-asientos.html';
  });
}

/* ------------------------------------------------------------
   5) SELECCIÓN DE ASIENTOS — mapa interactivo + resumen
   El estado visual de cada asiento (disponible/seleccionado) lo
   hace SOLO el CSS (checkbox :checked). Acá usamos JS para lo
   que CSS no puede: armar la lista de asientos elegidos, contar
   y calcular el total.
   ------------------------------------------------------------ */
const mapaAsientos = document.querySelector('[data-mapa-asientos]');

if (mapaAsientos) {
  const PRECIO_ASIENTO = 35000;   // ARS por asiento
  const CARGO_SERVICIO = 1500;    // cargo fijo de servicio

  // Solo los asientos disponibles son checkboxes (los ocupados no).
  const asientos = mapaAsientos.querySelectorAll('input[type="checkbox"]');

  const contenedorChips = document.querySelector('[data-asientos-chips]');
  const baseLabel = document.querySelector('[data-base-label]');
  const baseFare = document.querySelector('[data-base-fare]');
  const totalEl = document.querySelector('[data-total]');
  const btnContinuar = document.querySelector('[data-continuar]');

  function formatearPesos(numero) {
    return numero.toLocaleString('es-AR');
  }

  // Crea un chip para un asiento, con botón "x" para quitarlo.
  function crearChip(asientoInput) {
    const chip = document.createElement('span');
    chip.className = 'asiento-chip';
    chip.textContent = asientoInput.value + ' ';

    const quitar = document.createElement('button');
    quitar.type = 'button';
    quitar.className = 'asiento-chip__quitar';
    quitar.setAttribute('aria-label', 'Quitar asiento ' + asientoInput.value);
    quitar.innerHTML = '<span class="material-symbols-outlined">close</span>';

    // Al hacer click en la "x", desmarca el asiento y recalcula.
    quitar.addEventListener('click', function () {
      asientoInput.checked = false;
      actualizar();
    });

    chip.appendChild(quitar);
    return chip;
  }

  // Recalcula chips, contador y precios según lo seleccionado.
  function actualizar() {
    const elegidos = [];
    asientos.forEach(function (asiento) {
      if (asiento.checked) {
        elegidos.push(asiento);
      }
    });

    // Reconstruye la lista de chips.
    contenedorChips.innerHTML = '';
    if (elegidos.length === 0) {
      const vacio = document.createElement('span');
      vacio.className = 'asientos-chips__vacio';
      vacio.textContent = 'Todavía no elegiste asientos.';
      contenedorChips.appendChild(vacio);
    } else {
      elegidos.forEach(function (asiento) {
        contenedorChips.appendChild(crearChip(asiento));
      });
    }

    // Precios.
    const cantidad = elegidos.length;
    const base = cantidad * PRECIO_ASIENTO;
    const total = cantidad > 0 ? base + CARGO_SERVICIO : 0;

    baseLabel.textContent = 'Tarifa base (' + cantidad + 'x)';
    baseFare.textContent = 'ARS ' + formatearPesos(base);
    totalEl.textContent = 'ARS ' + formatearPesos(total);

    // No se puede continuar sin asientos.
    btnContinuar.disabled = cantidad === 0;
  }

  asientos.forEach(function (asiento) {
    asiento.addEventListener('change', actualizar);
  });

  // Botón Continuar → siguiente paso (datos del pasajero).
  btnContinuar.addEventListener('click', function () {
    if (!btnContinuar.disabled) {
      window.location.href = 'datos-pasajero.html';
    }
  });

  // Estado inicial (toma los asientos que vienen marcados).
  actualizar();
}

/* ------------------------------------------------------------
   6) DATOS DEL PASAJERO — envío simulado
   La validación de los campos obligatorios la hace el navegador
   con el atributo "required" (HTML5), sin JavaScript. El evento
   "submit" solo se dispara si todos los campos son válidos; ahí
   evitamos el envío real (es un mockup) y avanzamos al siguiente
   paso (confirmación de reserva).
   ------------------------------------------------------------ */
const formDatos = document.getElementById('form-datos');

if (formDatos) {
  formDatos.addEventListener('submit', function (evento) {
    evento.preventDefault();
    window.location.href = 'confirmacion-reserva.html';
  });
}

/* ------------------------------------------------------------
   7) CONFIRMACIÓN — descarga de boleto simulada
   No generamos un PDF real (es un mockup): al hacer click damos
   una respuesta visual ("Boleto descargado") y volvemos al
   estado original a los 2 segundos.
   ------------------------------------------------------------ */
const btnDescargar = document.querySelector('[data-descargar-boleto]');

if (btnDescargar) {
  btnDescargar.addEventListener('click', function () {
    const contenidoOriginal = btnDescargar.innerHTML;
    btnDescargar.innerHTML =
      '<span class="material-symbols-outlined">check</span> Boleto descargado';
    btnDescargar.disabled = true;

    setTimeout(function () {
      btnDescargar.innerHTML = contenidoOriginal;
      btnDescargar.disabled = false;
    }, 2000);
  });
}
