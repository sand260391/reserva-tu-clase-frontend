$(document).ready(function () {
  // Obtener datos del usuario desde el almacenamiento local
  const userData = JSON.parse(localStorage.getItem('user'));

  // Redirigir al usuario si no tiene el rol de ADMIN
  if (!userData || !userData.value.rol.includes('ADMIN')) {
    window.location.href = "../index.html";
    return;
  }

  // Cargar opciones para el campo "Tipo de Clase"
  obtenerTiposClase()
    .done(function (tiposClase) {
      tiposClase.forEach(function (tipo) {
        $('#tipoClase').append(`<option value="${tipo.id}">${tipo.nombre}</option>`);
      });
    })
    .fail(function () {
      $('#mensaje').html('<div class="alert alert-danger">Error al cargar los tipos de clase.</div>');
    });

  // Cargar opciones para el campo "Monitor"
  obtenerMonitores()
    .done(function (monitores) {
      monitores.forEach(function (monitor) {
        $('#monitor').append(`<option value="${monitor.id}">${monitor.nombre} ${monitor.apellidos}</option>`);
      });
    })
    .fail(function () {
      $('#mensaje').html('<div class="alert alert-danger">Error al cargar los monitores.</div>');
    });

  // Manejar el envío del formulario para crear una nueva clase
  $('#formAltaClase').submit(function (e) {
    e.preventDefault();

    // Crear un objeto con los datos de la nueva clase
    const nuevaClase = {
      nombre: $('#nombre').val(),
      tipoClase: { id: parseInt($('#tipoClase').val()) },
      monitor: { id: parseInt($('#monitor').val()) },
      horaInicio: new Date(new Date($('#horaInicio').val()).getTime() + 2 * 60 * 60 * 1000), // Añadir offset de 2 horas
      horaFin: new Date(new Date($('#horaFin').val()).getTime() + 2 * 60 * 60 * 1000), // Añadir offset de 2 horas
      sala: $('#sala').val(),
      capacidadMaxima: parseInt($('#capacidadMaxima').val())
    };

    // Enviar los datos al servidor para crear la clase
    crearClase(nuevaClase)
      .done(function () {
        $('#mensaje').html('<div class="alert alert-success">Clase creada correctamente.</div>');
        $('#formAltaClase')[0].reset(); // Reiniciar el formulario
      })
      .fail(function () {
        $('#mensaje').html('<div class="alert alert-danger">Error al crear la clase. Intenta nuevamente.</div>');
      });
  });
});
