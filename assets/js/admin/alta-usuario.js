$(document).ready(function () {
  // Obtener datos del usuario desde el almacenamiento local
  const userData = JSON.parse(localStorage.getItem('user'));

  // Redirigir al usuario si no tiene el rol de ADMIN
  if (!userData || !userData.value.rol.includes('ADMIN')) {
    window.location.href = "/index.html";
    return;
  }

  // Manejar el envío del formulario para registrar un nuevo usuario
  $('#formAltaUsuario').submit(function (e) {
    e.preventDefault();

    // Crear un objeto con los datos del nuevo usuario
    const nuevoUsuario = {
      nombre: $('#nombre').val(),
      apellidos: $('#apellidos').val(),
      email: $('#email').val(),
      rol: $('#rol').val(),
      password: $('#password').val(),
    };

    // Enviar los datos al servidor para registrar el usuario
    registroUsuario(nuevoUsuario)
      .done(function () {
        $('#mensaje').html('<div class="alert alert-success">Usuario creado correctamente.</div>');
        $('#formAltaUsuario')[0].reset(); // Reiniciar el formulario
      })
      .fail(function () {
        $('#mensaje').html('<div class="alert alert-danger">Error al crear el usuario. Intenta nuevamente.</div>');
      });
  });
});
