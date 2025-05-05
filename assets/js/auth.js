$(document).ready(function () {
  // Manejar el evento de envío del formulario de inicio de sesión
  $('#loginForm').on('submit', function (e) {
    e.preventDefault(); // Prevenir el comportamiento por defecto del formulario

    // Obtener valores de los campos de correo y contraseña
    const correo = $('#correo').val().trim();
    const password = $('#password').val().trim();

    // Validar que los campos no estén vacíos
    if (correo === '' || password === '') {
      mostrarError("Todos los campos son obligatorios.");
      return;
    }

    // Llamar a la función de inicio de sesión
    login(correo, password)
      .done(function (token) {
        // Guardar el token en localStorage con una expiración de 3 horas
        const expirationTime = Date.now() + 3 * 60 * 60 * 1000;
        localStorage.setItem('token', JSON.stringify({ value: token, expires: expirationTime }));

        // Obtener los datos del usuario autenticado
        obtenerUsuarioAutenticado()
          .done(function (userData) {
            // Guardar los datos del usuario en localStorage
            localStorage.setItem('user', JSON.stringify({ value: userData, expires: expirationTime }));

            // Redirigir al indice
            window.location.href = '/index.html';
          })
          .fail(function () {
            mostrarError("Error al obtener los datos del usuario.");
          });
      })
      .fail(function (xhr) {
        // Manejar errores de autenticación
        if (xhr.status === 401) {
          mostrarError("Credenciales incorrectas.");
        } else {
          mostrarError("Error en el servidor. Inténtalo más tarde.");
        }
      });
  });

  // Función para mostrar mensajes de error
  function mostrarError(mensaje) {
    $('#errorMsg').text(mensaje).fadeIn();
  }
});