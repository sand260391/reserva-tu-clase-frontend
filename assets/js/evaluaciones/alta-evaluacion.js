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

  // Cargar opciones para Monitores y Tipos de Clase
  obtenerMonitores().done(function (monitores) {
    monitores.forEach(function (monitor) {
      $('#monitor').append(`<option value="${monitor.id}">${monitor.nombre} ${monitor.apellidos}</option>`);
    });
  });

  obtenerTiposClase().done(function (tiposClase) {
    tiposClase.forEach(function (tipo) {
      $('#tipoClase').append(`<option value="${tipo.id}">${tipo.nombre}</option>`);
    });
  });

  // Mostrar/ocultar campos según la selección
  $('#evaluacionTipo').change(function () {
    const tipo = $(this).val();
    if (tipo === 'monitor') {
      $('#monitorField').removeClass('d-none');
      $('#tipoClaseField').addClass('d-none');
      $('#monitor_id').val('');
      $('#tipo_clase_id').val('');
    } else if (tipo === 'tipoClase') {
      $('#tipoClaseField').removeClass('d-none');
      $('#monitorField').addClass('d-none');
      $('#monitor_id').val('');
      $('#tipo_clase_id').val('');
    } else {
      $('#monitorField, #tipoClaseField').addClass('d-none');
    }
  });

  // Manejar el envío del formulario
  $('#formAltaEvaluacion').submit(function (e) {
    e.preventDefault();

    const evaluacion = {
      cliente: { id: userData.value.id },
      calificacion: parseInt($('#calificacion').val()),
      comentario: $('#comentario').val(),
      tipoClase: { id: parseInt($('#tipoClase').val()) || -1 },
    };

    if ($('#evaluacionTipo').val() === 'monitor') {
      evaluacion.monitor = { id: parseInt($('#monitor').val()) };
    }

    crearEvaluacion(evaluacion)
      .done(function () {
        $('#mensaje').html('<div class="alert alert-success">Evaluación creada correctamente.</div>');
        $('#formAltaEvaluacion')[0].reset();
        $('#monitorField, #tipoClaseField').addClass('d-none');
      })
      .fail(function () {
        $('#mensaje').html('<div class="alert alert-danger">Error al crear la evaluación. Intenta nuevamente.</div>');
      });
  });
});
