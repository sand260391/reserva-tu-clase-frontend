$(document).ready(function () {
  // Obtener datos del usuario desde el almacenamiento local
  const userData = JSON.parse(localStorage.getItem('user'));

  // Redirigir al usuario si no tiene el rol de ADMIN o MONITOR
  if (!userData || (!userData.value.rol.includes('ADMIN') && !userData.value.rol.includes('MONITOR'))) {
    window.location.href = "/index.html";
    return;
  }
  // Cargar los clientes en el select
  obtenerClientes()
    .done(function (usuarios) {
      usuarios.forEach(function (usuario) {
        $('#cliente').append(`<option value="${usuario.id}">${usuario.nombre} ${usuario.apellidos}</option>`);
      });
    })
    .fail(function () {
      $('#mensajeResultado').html('<div class="alert alert-danger">Error al cargar los clientes.</div>');
    });

  // Manejar el envío del formulario para enviar la notificación
  $('#formEnviarNotificacion').submit(function (e) {
    e.preventDefault();

    const notificacion = {
      cliente: { id: parseInt($('#cliente').val()) },
      mensaje: $('#mensaje').val()
    };

    enviarNotificacion(notificacion)
      .done(function () {
        $('#mensajeResultado').html('<div class="alert alert-success">Notificación enviada correctamente.</div>');
        $('#formEnviarNotificacion')[0].reset();
      })
      .fail(function () {
        $('#mensajeResultado').html('<div class="alert alert-danger">Error al enviar la notificación.</div>');
      });
  });
});
