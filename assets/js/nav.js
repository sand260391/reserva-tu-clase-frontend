$(document).ready(function () {
  // Obtener datos del token y usuario almacenados en localStorage
  const tokenData = JSON.parse(localStorage.getItem('token'));
  const userData = JSON.parse(localStorage.getItem('user'));

  // Validar si el token y usuario son válidos y no han caducado
  const token = tokenData && Date.now() < tokenData.expires ? tokenData.value : null;
  const user = userData && Date.now() < userData.expires ? userData.value : null;

  if (!token || !user) {
    // Limpiar almacenamiento si el token o usuario han caducado
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = "/login.html"; // Redirigir al login
    return;
  }

  if (token && user) {
    // Mostrar el enlace de "Cerrar sesión" y ocultar el de "Iniciar sesión"
    $('.login-link').addClass('d-none');
    $('.logout-link').removeClass('d-none');

    // Obtener roles del usuario
    const roles = user.rol || [];

    if (roles.includes('ADMIN')) {
      // Mostrar el enlace al panel de administrador si el usuario es ADMIN
      $('.panel-admin-link').removeClass('d-none');
      $('.panel-usuario-link').addClass('d-none'); // Ocultar el panel de usuario
    } else {
      // Ocultar el enlace al panel de administrador si no es ADMIN
      $('.panel-admin-link').addClass('d-none');
    }
  } else {
    // Ocultar el enlace al panel de administrador si no hay token o usuario
    $('.panel-admin-link').addClass('d-none');
  }

  // Manejar el evento de clic en el botón de "Cerrar sesión"
  $('#logoutBtn').click(function () {
    localStorage.removeItem('token'); // Eliminar token del almacenamiento
    localStorage.removeItem('user'); // Eliminar usuario del almacenamiento
    window.location.href = "/login.html"; // Redirigir al login
  });
});
