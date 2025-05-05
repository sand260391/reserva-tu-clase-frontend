$(document).ready(function () {
  // Obtener datos del token y usuario desde el almacenamiento local
  const tokenData = JSON.parse(localStorage.getItem('token'));
  const userData = JSON.parse(localStorage.getItem('user'));

  // Validar si el token y el usuario son válidos
  const token = tokenData && Date.now() < tokenData.expires ? tokenData.value : null;
  const user = userData && Date.now() < userData.expires ? userData.value : null;

  // Redirigir al login si no hay token o usuario válido
  if (!token || !user) {
    window.location.href = "/login.html";
    return;
  }

  // Cargar la lista de clases disponibles
  cargarClases();

  function cargarClases() {
    // Llamar al servicio para obtener las clases disponibles
    obtenerClasesDisponibles()
      .done(function (clases) {
        // Mostrar mensaje si no hay clases disponibles
        if (clases.length === 0) {
          $('#clasesList').html('<tr><td colspan="7" class="text-center">No hay clases disponibles en este momento.</td></tr>');
          return;
        }

        // Limpiar contenido previo de la tabla
        $('#clasesList').empty();

        // Iterar sobre las clases y generar filas para la tabla
        clases.forEach(function (clase) {
          const fechaClase = new Date(clase.horaInicio);
          const fechaFormateada = fechaClase.toLocaleDateString("es-ES");
          const horaFormateada = fechaClase.toLocaleTimeString("es-ES", { hour: '2-digit', minute: '2-digit' });

          // Crear una fila con los detalles de la clase
          const fila = `
            <tr>
              <td>${clase.nombre}</td>
              <td>${clase.tipoClase.nombre}</td>
              <td>${clase.monitor.nombre} ${clase.monitor.apellidos}</td>
              <td>${fechaFormateada} - ${horaFormateada}</td>
              <td>${clase.sala}</td>
              <td>${clase.plazasReservadas} / ${clase.capacidadMaxima}</td>
              <td>
                <a href="detalle.html?id=${clase.id}" class="btn btn-sm btn-primary">Ver detalle</a>
              </td>
            </tr>
          `;
          $('#clasesList').append(fila);
        });
      })
      .fail(function () {
        // Mostrar mensaje de error si no se pueden cargar las clases
        $('#clasesList').html('<tr><td colspan="7" class="text-center text-danger">Error al cargar las clases. Inténtalo más tarde.</td></tr>');
      });
  }
});
