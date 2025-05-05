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

  // Obtener el parámetro 'id' de la URL para identificar la clase
  const params = new URLSearchParams(window.location.search);
  const claseId = params.get('id');

  // Mostrar mensaje de error si no se encuentra el ID de la clase
  if (!claseId) {
    $('#detalleClase').html('<p class="text-center text-danger">No se ha encontrado la clase.</p>');
    return;
  }

  // Obtener los detalles de la clase y renderizar el formulario
  obtenerClase(claseId)
    .done(function (clase) {
      const usuario = JSON.parse(localStorage.getItem('user'));
      const esEditable = usuario && (usuario.value.rol === 'ADMIN' || usuario.value.rol === 'MONITOR');

      // Generar el HTML del formulario con los detalles de la clase
      const detalleHtml = `
        <form id="detalleClaseForm">
          <!-- Campo para el nombre de la clase -->
          <div class="mb-3">
            <label for="nombreClase" class="form-label">Nombre</label>
            <input type="text" class="form-control" id="nombreClase" value="${clase.nombre}" ${esEditable ? '' : 'disabled'}>
          </div>
          <!-- Campo para el tipo de clase -->
          <div class="mb-3">
            <label for="tipoClase" class="form-label">Tipo</label>
            <select class="form-control" id="tipoClase" ${esEditable ? '' : 'disabled'}>
              <option value="${clase.tipoClase.id}" selected>${clase.tipoClase.nombre}</option>
            </select>
          </div>
          <!-- Campo para el monitor de la clase -->
          <div class="mb-3">
            <label for="monitorClase" class="form-label">Monitor</label>
            <select class="form-control" id="monitorClase" ${esEditable ? '' : 'disabled'}>
              <option value="${clase.monitor.id}" selected>${clase.monitor.nombre} ${clase.monitor.apellidos}</option>
            </select>
          </div>
          <!-- Campo para la fecha y hora de inicio -->
          <div class="mb-3">
            <label for="fechaInicioClase" class="form-label">Fecha y Hora de Inicio</label>
            <input type="datetime-local" class="form-control" id="fechaInicioClase" value="${new Date(clase.horaInicio).toISOString().slice(0, 16)}" ${esEditable ? '' : 'disabled'}>
          </div>
          <!-- Campo para la fecha y hora de fin -->
          <div class="mb-3">
            <label for="fechaFinClase" class="form-label">Fecha y Hora de Fin</label>
            <input type="datetime-local" class="form-control" id="fechaFinClase" value="${new Date(clase.horaFin).toISOString().slice(0, 16)}" ${esEditable ? '' : 'disabled'}>
          </div>
          <!-- Campo para la sala -->
          <div class="mb-3">
            <label for="salaClase" class="form-label">Aula</label>
            <input type="text" class="form-control" id="salaClase" value="${clase.sala}" ${esEditable ? '' : 'disabled'}>
          </div>
          <!-- Campo para la capacidad máxima -->
          <div class="mb-3">
            <label for="capacidadMaxima" class="form-label">Capacidad máxima</label>
            <input type="number" class="form-control" id="capacidadMaxima" value="${clase.capacidadMaxima}" ${esEditable ? '' : 'disabled'}>
          </div>
          <!-- Campo para las plazas reservadas -->
          <div class="mb-3">
            <label for="plazasReservadas" class="form-label">Plazas reservadas</label>
            <input type="number" class="form-control" id="plazasReservadas" value="${clase.plazasReservadas}" disabled>
          </div>
          <!-- Campo para la longitud de lista de espera -->
          <div class="mb-3">
            <label for="longitudListaEspera" class="form-label">Lista de espera</label>
            <input type="number" class="form-control" id="longitudListaEspera" value="${clase.longitudListaEspera}" disabled>
          </div>
          <!-- Botones de acción si el usuario tiene permisos -->
          ${esEditable ? `
            <button type="button" id="actualizarClaseBtn" class="btn btn-primary me-2">Actualizar</button>
            <button type="button" id="eliminarClaseBtn" class="btn btn-danger">Eliminar</button>
          ` : ''}
        </form>
      `;
      $('#detalleClase').html(detalleHtml);

      if (usuario && usuario.value.rol === 'ADMIN') {
        // Cargar todos los tipos de clase
        obtenerTiposClase().done(function (tiposClase) {
          const tipoClaseOptions = tiposClase.map(tipo => `
                        <option value="${tipo.id}" ${tipo.id === clase.tipoClase.id ? 'selected' : ''}>${tipo.nombre}</option>
                    `).join('');
          $('#tipoClase').html(tipoClaseOptions);
        });

        // Cargar todos los monitores
        obtenerMonitores().done(function (monitores) {
          const monitorOptions = monitores.map(monitor => `
                        <option value="${monitor.id}" ${monitor.id === clase.monitor.id ? 'selected' : ''}>${monitor.nombre} ${monitor.apellidos}</option>
                    `).join('');
          $('#monitorClase').html(monitorOptions);
        });
      }

      if (esEditable) {
        $('#actualizarClaseBtn').click(function () {
          const claseActualizada = {
            nombre: $('#nombreClase').val(),
            tipoClase: { id: parseInt($('#tipoClase').val()) },
            monitor: { id: parseInt($('#monitorClase').val()) },
            horaInicio: new Date($('#fechaInicioClase').val()).toISOString(),
            horaFin: new Date($('#fechaFinClase').val()).toISOString(),
            sala: $('#salaClase').val(),
            capacidadMaxima: parseInt($('#capacidadMaxima').val())
          };

          actualizarClase(claseId, claseActualizada)
            .done(function () {
              alert('Clase actualizada con éxito.');
              window.location.reload();
            })
            .fail(function () {
              alert('No se pudo actualizar la clase.');
            });
        });

        $('#eliminarClaseBtn').click(function () {
          if (confirm('¿Estás seguro de que deseas eliminar esta clase?')) {
            eliminarClase(claseId)
              .done(function () {
                alert('Clase eliminada con éxito.');
                window.location.href = 'listado.html';
              })
              .fail(function () {
                alert('No se pudo eliminar la clase.');
              });
          }
        });
      }

      mostrarAccionesCliente(claseId, clase.capacidadMaxima, clase.plazasReservadas);
    })
    .fail(function () {
      // Mostrar mensaje de error si no se pueden cargar los detalles de la clase
      $('#detalleClase').html('<p class="text-center text-danger">Error al cargar los detalles de la clase.</p>');
    });

  // Función para mostrar las acciones disponibles para el cliente
  function mostrarAccionesCliente(claseId, capacidadMaxima, plazasReservadas) {
    const usuario = JSON.parse(localStorage.getItem('user'));
    if (!usuario || usuario.value.rol !== 'CLIENTE') return;

    verificarReserva(usuario.value.id, claseId)
      .done(function (reservaExistente) {
        if (reservaExistente) {
          const accionesHtml = `
                <button id="cancelarReservaBtn" class="btn btn-danger">Cancelar Reserva</button>
              `;
          $('#accionesCliente').html(accionesHtml);

          $('#cancelarReservaBtn').click(function () {
            cancelarReserva(reservaExistente.id)
              .done(function () {
                alert('Reserva cancelada con éxito.');
                window.location.reload();
              })
              .fail(function () {
                alert('No se pudo cancelar la reserva.');
              });
          });
          return;
        }

        verificarListaEspera(usuario.value.id, claseId)
          .done(function (enListaEspera) {
            if (enListaEspera) {
              const accionesHtml = `
                    <button id="salirListaEsperaBtn" class="btn btn-danger">Salir de la Lista de Espera</button>
                  `;
              $('#accionesCliente').html(accionesHtml);

              $('#salirListaEsperaBtn').click(function () {
                eliminarListaEspera(enListaEspera.id)
                  .done(function () {
                    alert('Has salido de la lista de espera con éxito.');
                    window.location.reload();
                  })
                  .fail(function () {
                    alert('No se pudo salir de la lista de espera.');
                  });
              });
            } else if (plazasReservadas >= capacidadMaxima) {
              const accionesHtml = `
                    <button id="unirseListaEsperaBtn" class="btn btn-warning">Unirse a la Lista de Espera</button>
                  `;
              $('#accionesCliente').html(accionesHtml);

              $('#unirseListaEsperaBtn').click(function () {
                unirseListaEspera(parseInt(usuario.value.id), parseInt(claseId))
                  .done(function () {
                    alert('Te has unido a la lista de espera con éxito.');
                    window.location.reload();
                  })
                  .fail(function () {
                    alert('No se pudo unir a la lista de espera.');
                  });
              });
            } else {
              const accionesHtml = `
                  <button id="reservarBtn" class="btn btn-success me-2">Reservar Clase</button>
                `;
              $('#accionesCliente').html(accionesHtml);

              $('#reservarBtn').click(function () {
                reservarClase({
                  cliente: { id: usuario.value.id },
                  clase: { id: parseInt(claseId) }
                })
                  .done(function () {
                    alert('Reserva realizada con éxito.');
                    window.location.href = '../cliente/reservas.html';
                  })
                  .fail(function () {
                    alert('No se pudo realizar la reserva.');
                  });
              });
            }
          })
          .fail(function () {
            $('#accionesCliente').html('<p class="text-danger">Error al verificar la lista de espera.</p>');
          });
      })
      .fail(function () {
        $('#accionesCliente').html('<p class="text-danger">Error al verificar la reserva.</p>');
      });
  }
});
