$(document).ready(function () {
  // Obtener datos del usuario desde el almacenamiento local
  const userData = JSON.parse(localStorage.getItem('user'));

  // Redirigir al usuario si no tiene el rol de ADMIN o MONITOR
  if (!userData || (!userData.value.rol.includes('ADMIN') && !userData.value.rol.includes('MONITOR'))) {
    window.location.href = "/index.html";
    return;
  }

  // Obtener la lista de usuarios
  obtenerUsuarios()
    .done(function (usuarios) {
      // Mostrar un mensaje si no hay usuarios registrados
      if (usuarios.length === 0) {
        $('#usuariosList').html('<tr><td colspan="5" class="text-center">No hay usuarios registrados.</td></tr>');
        return;
      }

      // Agregar cada usuario a la tabla
      usuarios.forEach(function (usuario) {
        const esMonitor = userData.value.rol.includes('MONITOR');
        const botonModificar = esMonitor ? '' : `<a href="modificar-usuario.html?id=${usuario.id}" class="btn btn-sm btn-primary">Modificar</a>`;
        const fila = `
          <tr>
            <td>${usuario.id}</td>
            <td>${usuario.nombre} ${usuario.apellidos}</td>
            <td>${usuario.email}</td>
            <td>${usuario.rol}</td>
            <td>${botonModificar}</td>
          </tr>
        `;
        $('#usuariosList').append(fila);
      });
    })
    .fail(function () {
      $('#usuariosList').html('<tr><td colspan="5" class="text-center text-danger">Error al cargar los usuarios.</td></tr>');
    });
});
