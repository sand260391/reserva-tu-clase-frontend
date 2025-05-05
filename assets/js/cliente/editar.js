$(document).ready(function () {
  let usuarioId;

  // Obtener los datos del usuario autenticado
  obtenerUsuarioAutenticado()
    .done(function (usuario) {
      usuarioId = usuario.id;

      // Rellenar el formulario con los datos actuales del usuario
      $('#nombre').val(usuario.nombre);
      $('#apellidos').val(usuario.apellidos);
      $('#email').val(usuario.email);
    })
    .fail(function () {
      // Mostrar mensaje de error si no se pueden cargar los datos
      $('#mensaje').html('<div class="alert alert-danger">No se pudieron cargar tus datos. Intenta más tarde.</div>');
    });

  // Manejar el envío del formulario para actualizar los datos del usuario
  $('#formEditarUsuario').submit(function (e) {
    e.preventDefault();

    // Recopilar los datos actualizados del formulario
    const datosActualizados = {
      nombre: $('#nombre').val(),
      apellidos: $('#apellidos').val(),
      email: $('#email').val(),
    };

    // Incluir la nueva contraseña si se proporciona
    const nuevaPassword = $('#password').val();
    if (nuevaPassword) {
      datosActualizados.password = nuevaPassword;
    }

    // Enviar los datos actualizados al servidor
    actualizarUsuario(usuarioId, datosActualizados)
      .done(function () {
        // Mostrar mensaje de éxito
        $('#mensaje').html('<div class="alert alert-success">Datos actualizados correctamente.</div>');
      })
      .fail(function () {
        // Mostrar mensaje de error
        $('#mensaje').html('<div class="alert alert-danger">Hubo un error al actualizar los datos.</div>');
      });
  });
});
