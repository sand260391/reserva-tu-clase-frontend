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

  // Obtener y mostrar el historial de reservas del cliente
  obtenerReservasCliente(clienteId)
    .then(function (reservas) {
      mostrarHistorial(reservas);
    })
    .catch(function () {
      // Mostrar mensaje de error si no se puede cargar el historial
      $("#historialReservas").html(
        `<div class="alert alert-danger">No se pudo cargar el historial.</div>`
      );
    });
});

// Mostrar el historial de reservas pasadas en una tabla
function mostrarHistorial(reservas) {
  const hoy = new Date();
  const pasadas = reservas.filter(reserva => {
    const fechaClase = new Date(reserva.claseHoraInicio);
    return fechaClase < hoy;
  });

  if (pasadas.length === 0) {
    $("#historialReservas").html(`<p>No hay reservas pasadas registradas.</p>`);
    return;
  }

  let html = `
    <table class="table table-striped">
      <thead>
        <tr>
          <th>Clase</th>
          <th>Tipo</th>
          <th>Monitor</th>
          <th>Fecha</th>
          <th>Hora</th>
        </tr>
      </thead>
      <tbody>
  `;
  pasadas.forEach(reserva => {
    const fechaClase = new Date(reserva.claseHoraInicio);
    const fechaFormateada = fechaClase.toLocaleDateString("es-ES");
    const horaFormateada = fechaClase.toLocaleTimeString("es-ES", { hour: '2-digit', minute: '2-digit' });
    html += `
      <tr>
        <td>${reserva.claseNombre}</td>
        <td>${reserva.tipoClaseNombre}</td>
        <td>${reserva.claseMonitor.nombre} ${reserva.claseMonitor.apellidos}</td>
        <td>${fechaFormateada}</td>
        <td>${horaFormateada}</td>
      </tr>
    `;
  });
  html += `
      </tbody>
    </table>
  `;

  $("#historialReservas").html(html);
}
