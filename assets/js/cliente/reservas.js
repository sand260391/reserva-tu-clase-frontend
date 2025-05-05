$(document).ready(function () {
  // Obtener token y datos del usuario desde el almacenamiento local
  const tokenData = JSON.parse(localStorage.getItem('token'));
  const userData = JSON.parse(localStorage.getItem('user'));

  // Validar si el token y los datos del usuario son válidos
  const token = tokenData && Date.now() < tokenData.expires ? tokenData.value : null;
  const user = userData && Date.now() < userData.expires ? userData.value : null;

  if (!token || !user) {
    // Redirigir al login si no hay sesión válida
    window.location.href = "/login.html";
    return;
  }

  const clienteId = user.id;

  // Obtener y mostrar las reservas actuales del cliente
  obtenerReservasCliente(clienteId)
    .done(function (reservas) {
      mostrarReservasActuales(reservas);
    })
    .fail(function () {
      // Mostrar mensaje de error si no se pueden cargar las reservas
      $("#reservasActuales").html(
        `<div class="alert alert-danger">No se pudieron cargar las reservas actuales.</div>`
      );
    });

  // Obtener y mostrar las listas de espera del cliente
  obtenerListasEsperaCliente(clienteId)
    .done(function (listasEspera) {
      mostrarListasEspera(listasEspera);
    })
    .fail(function () {
      // Mostrar mensaje de error si no se pueden cargar las listas de espera
      $("#listasEsperaContenido").html(
        `<div class="alert alert-danger">No se pudieron cargar las listas de espera.</div>`
      );
    });
});

// Mostrar las reservas actuales en una tabla
function mostrarReservasActuales(reservas) {
  if (reservas.length === 0) {
    $("#reservasActuales").html(`<p>No tienes reservas actuales.</p>`);
    return;
  }

  let html = `
    <table class="table table-striped">
      <thead>
        <tr>
          <th>Clase</th>
          <th>Fecha</th>
          <th>Hora</th>
          <th>Plazas</th>
          <th>Lista de Espera</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
  `;
  reservas.forEach(reserva => {
    const fechaClase = new Date(reserva.claseHoraInicio);
    const fechaFormateada = fechaClase.toLocaleDateString("es-ES");
    const horaFormateada = fechaClase.toLocaleTimeString("es-ES", { hour: '2-digit', minute: '2-digit' });
    html += `
      <tr>
        <td>${reserva.claseNombre}</td>
        <td>${fechaFormateada}</td>
        <td>${horaFormateada}</td>
        <td>${reserva.plazasReservadas}/${reserva.plazasTotales}</td>
        <td>${reserva.longitudListaEspera}</td>
        <td><button class="btn btn-danger btn-sm" onclick="clickCancelarReserva(${reserva.id})">Cancelar</button></td>
      </tr>
    `;
  });
  html += `
      </tbody>
    </table>
  `;

  $("#reservasActuales").html(html);
}

// Mostrar las listas de espera en una tabla
function mostrarListasEspera(listasEspera) {
  if (listasEspera.length === 0) {
    $("#listasEsperaContenido").html(`<p>No estás en ninguna lista de espera.</p>`);
    return;
  }

  let html = `
    <table class="table table-striped">
      <thead>
        <tr>
          <th>Clase</th>
          <th>Fecha</th>
          <th>Hora</th>
          <th>Plazas</th>
          <th>Lista de Espera</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
  `;
  listasEspera.forEach(lista => {
    const fechaClase = new Date(lista.claseHoraInicio);
    const fechaFormateada = fechaClase.toLocaleDateString("es-ES");
    const horaFormateada = fechaClase.toLocaleTimeString("es-ES", { hour: '2-digit', minute: '2-digit' });
    html += `
      <tr>
        <td>${lista.claseNombre}</td>
        <td>${fechaFormateada}</td>
        <td>${horaFormateada}</td>
        <td>${lista.plazasReservadas}/${lista.plazasTotales}</td>
        <td>${lista.posicionEnListaEspera}/${lista.longitudListaEspera}</td>
        <td><button class="btn btn-warning btn-sm" onclick="quitarListaEspera(${lista.id})">Cancelar</button></td>
      </tr>
    `;
  });
  html += `
      </tbody>
    </table>
  `;

  $("#listasEsperaContenido").html(html);
}

// Cancelar una reserva específica
function clickCancelarReserva(reservaId) {
  cancelarReserva(reservaId)
    .done(function () {
      alert("Reserva cancelada correctamente.");
      location.reload();
    })
    .fail(function () {
      alert("No se pudo cancelar la reserva.");
    });
}

// Quitar al cliente de una lista de espera específica
function quitarListaEspera(listaId) {
  eliminarListaEspera(listaId)
    .done(function () {
      alert("Te has quitado de la lista de espera correctamente.");
      location.reload();
    })
    .fail(function () {
      alert("No se pudo quitar de la lista de espera.");
    });
}
