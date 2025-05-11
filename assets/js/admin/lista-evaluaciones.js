$(document).ready(function () {
  // Obtener datos del usuario desde el almacenamiento local
  const userData = JSON.parse(localStorage.getItem('user'));

  // Redirigir al usuario si no tiene el rol de ADMIN o MONITOR
  if (!userData || (!userData.value.rol.includes('ADMIN') && !userData.value.rol.includes('MONITOR'))) {
    window.location.href = "/index.html";
    return;
  }
  const rol = userData && userData.value.rol ? userData.value.rol : null;
  const userId = userData.value.id;

  if (rol === 'ADMIN') {
    obtenerTodasEvaluaciones()
      .done(renderEvaluaciones)
      .fail(() => alert('Error al cargar las evaluaciones.'));
  } else if (rol === 'MONITOR') {
    obtenerTodasEvaluaciones()
      .done(function (evaluaciones) {
        const evaluacionesFiltradas = evaluaciones.filter(evaluacion => {
          return (
            (!evaluacion.monitor_id || evaluacion.monitor_id === userId)
          );
        });
        renderEvaluaciones(evaluacionesFiltradas);
      })
      .fail(() => alert('Error al cargar las evaluaciones.'));
  }

  function renderEvaluaciones(evaluaciones) {
    const rows = evaluaciones.map(evaluacion => `
            <tr>
                <td>${evaluacion.cliente.nombre}</td>
                <td>${evaluacion.monitor != null ? 'Monitor' : 'Tipo de Clase'}</td>
                <td>${evaluacion.monitor != null ? evaluacion.monitor.nombre : evaluacion.tipoClase.nombre}</td>
                <td>${evaluacion.calificacion}</td>
                <td>${evaluacion.comentario}</td>
                ${rol === 'ADMIN' ? `<td><button class="btn btn-danger btn-sm eliminar-evaluacion" data-id="${evaluacion.id}">Eliminar</button></td>` : ''}
            </tr>
        `).join('');
    $('#tablaEvaluaciones').html(rows || '<tr><td colspan="6" class="text-center">No hay evaluaciones disponibles.</td></tr>');

    if (rol === 'ADMIN') {
      $('.eliminar-evaluacion').click(function () {
        const evaluacionId = $(this).data('id');
        if (confirm('¿Estás seguro de que deseas eliminar esta evaluación?')) {
          eliminarEvaluacion(evaluacionId)
            .done(() => {
              alert('Evaluación eliminada con éxito.');
              window.location.reload();
            })
            .fail(() => alert('No se pudo eliminar la evaluación.'));
        }
      });
    }
  }
});
