$(document).ready(function () {
  const userData = JSON.parse(localStorage.getItem('user'));
  const rol = userData && userData.value.rol ? userData.value.rol : [];

  // Redirigir si no es ADMIN
  if (!userData || !rol.includes('ADMIN')) {
    window.location.href = "/login.html";
    return;
  }

  // Cargar lista de Tipos de Clase
  obtenerTiposClase()
    .done(function (tiposClase) {
      if (tiposClase.length === 0) {
        $('#tablaTiposClase').html('<tr><td colspan="3" class="text-center">No hay tipos de clase registrados.</td></tr>');
        return;
      }

      tiposClase.forEach(function (tipo) {
        const fila = `
                    <tr>
                        <td>${tipo.id}</td>
                        <td>${tipo.nombre}</td>
                        <td>
                            <button class="btn btn-danger btn-sm eliminar-tipo-clase" data-id="${tipo.id}">Eliminar</button>
                        </td>
                    </tr>
                `;
        $('#tablaTiposClase').append(fila);
      });

      // Manejar eliminación de Tipo de Clase
      $('.eliminar-tipo-clase').click(function () {
        const tipoClaseId = $(this).data('id');
        if (confirm('¿Estás seguro de que deseas eliminar este tipo de clase?')) {
          eliminarTipoClase(tipoClaseId)
            .done(() => {
              alert('Tipo de clase eliminado con éxito.');
              window.location.reload();
            })
            .fail(() => alert('No se pudo eliminar el tipo de clase.'));
        }
      });
    })
    .fail(() => alert('Error al cargar los tipos de clase.'));

  // Manejar creación de nuevo Tipo de Clase
  $('#formNuevoTipoClase').submit(function (e) {
    e.preventDefault();

    const nuevoTipoClase = {
      nombre: $('#nombreTipoClase').val()
    };

    crearTipoClase(nuevoTipoClase)
      .done(() => {
        $('#mensaje').html('<div class="alert alert-success">Tipo de clase agregado correctamente.</div>');
        $('#formNuevoTipoClase')[0].reset();
        window.location.reload();
      })
      .fail(() => {
        $('#mensaje').html('<div class="alert alert-danger">Error al agregar el tipo de clase. Intenta nuevamente.</div>');
      });
  });
});
