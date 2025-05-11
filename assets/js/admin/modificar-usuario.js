$(document).ready(function () {
  // Obtener parámetros de la URL
  const urlParams = new URLSearchParams(window.location.search);
  const usuarioId = urlParams.get('id');

  // Obtener datos del usuario desde el almacenamiento local
  const userData = JSON.parse(localStorage.getItem('user'));

  // Redirigir al usuario si no tiene el rol de ADMIN
  if (!userData || !userData.value.rol.includes('ADMIN')) {
    window.location.href = "/index.html";
    return;
  }

  // Validar que el ID del usuario sea válido
  if (!usuarioId) {
    $('#mensaje').html('<div class="alert alert-danger">ID de usuario no válido.</div>');
    return;
  }

  // Obtener datos del usuario a modificar
  obtenerUsuario(usuarioId)
    .done(function (usuario) {
      // Rellenar los campos del formulario con los datos del usuario
      $('#nombre').val(usuario.nombre);
      $('#apellidos').val(usuario.apellidos);
      $('#email').val(usuario.email);
      $('#rol').val(usuario.rol);
    })
    .fail(function () {
      $('#mensaje').html('<div class="alert alert-danger">Error al cargar los datos del usuario.</div>');
    });

  // Manejar el envío del formulario para actualizar el usuario
  $('#formModificarUsuario').submit(function (e) {
    e.preventDefault();

    // Crear un objeto con los datos actualizados
    const datosActualizados = {
      nombre: $('#nombre').val(),
      apellidos: $('#apellidos').val(),
      email: $('#email').val(),
      rol: $('#rol').val(),
    };

    // Incluir la nueva contraseña si se proporciona
    const nuevaPassword = $('#password').val();
    if (nuevaPassword) {
      datosActualizados.password = nuevaPassword;
    }

    // Enviar los datos al servidor para actualizar el usuario
    actualizarUsuario(usuarioId, datosActualizados)
      .done(function () {
        $('#mensaje').html('<div class="alert alert-success">Usuario actualizado correctamente.</div>');
      })
      .fail(function () {
        $('#mensaje').html('<div class="alert alert-danger">Error al actualizar el usuario.</div>');
      });
  });

  // Manejar el clic en el botón "Eliminar Usuario"
  $('#btnEliminarUsuario').click(function () {
    if (confirm('¿Estás seguro de que deseas eliminar este usuario?')) {
      eliminarUsuario(usuarioId)
        .done(function () {
          alert('Usuario eliminado correctamente.');
          window.location.href = "lista-usuarios.html"; // Redirigir a la lista de usuarios
        })
        .fail(function () {
          $('#mensaje').html('<div class="alert alert-danger">Error al eliminar el usuario.</div>');
        });
    }
  });
});
