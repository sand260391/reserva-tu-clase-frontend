$(document).ready(function () {
  // Obtener datos del usuario desde el almacenamiento local
  const userData = JSON.parse(localStorage.getItem('user'));
  const rol = userData && userData.value.rol ? userData.value.rol : [];

  // Redirigir al usuario si no tiene el rol de ADMIN o MONITOR
  if (!userData || (!rol.includes('ADMIN') && !rol.includes('MONITOR'))) {
    window.location.href = "/login.html";
    return;
  }

  // Si el usuario es MONITOR (y no ADMIN), ocultar opciones específicas
  if (rol.includes('MONITOR')) {
    $('#altaUsuarioCard').addClass('d-none'); // Ocultar opción "Alta de Usuario"
    $('#listaTiposClaseCard').addClass('d-none'); // Ocultar opción "Lista de Tipos de Clase"
  }
});
