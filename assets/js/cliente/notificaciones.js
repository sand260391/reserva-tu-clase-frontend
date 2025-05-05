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

  // Obtener y mostrar las notificaciones del usuario
  obtenerNotificaciones(user.id)
    .then(notificaciones => mostrarNotificaciones(notificaciones))
    .catch(() => {
      // Mostrar mensaje de error si no se pueden cargar las notificaciones
      $("#notificacionesContainer").html(
        `<div class="alert alert-danger">Error al cargar las notificaciones.</div>`
      );
    });
});

// Mostrar las notificaciones pendientes y leídas
function mostrarNotificaciones(notificaciones) {
  const pendientes = notificaciones.filter(n => !n.leida);
  const leidas = notificaciones.filter(n => n.leida);

  let htmlPendientes = '<h3>Pendientes</h3>';
  htmlPendientes += pendientes.length === 0
    ? "<p>No tienes notificaciones pendientes.</p>"
    : '<ul class="list-group">';
  pendientes.forEach(n => {
    htmlPendientes += `
      <li class="list-group-item list-group-item-warning d-flex justify-content-between align-items-center">
        <div>${n.mensaje}</div>
        <button class="btn btn-sm btn-success" onclick="marcarComoLeida(${n.id})">Marcar como leída</button>
      </li>
    `;
  });
  if (pendientes.length > 0) htmlPendientes += '</ul>';

  let htmlLeidas = '<h3>Leídas</h3>';
  htmlLeidas += leidas.length === 0
    ? "<p>No tienes notificaciones leídas.</p>"
    : '<ul class="list-group">';
  leidas.forEach(n => {
    htmlLeidas += `
      <li class="list-group-item list-group-item-secondary d-flex justify-content-between align-items-center">
        <div>${n.mensaje}</div>
      </li>
    `;
  });
  if (leidas.length > 0) htmlLeidas += '</ul>';

  $("#notificacionesContainer").html(htmlPendientes + htmlLeidas);
}

// Marcar una notificación como leída
function marcarComoLeida(id) {
  marcarNotificacionLeida(id)
    .then(() => location.reload())
    .catch(() => alert("Error al marcar como leída."));
}
