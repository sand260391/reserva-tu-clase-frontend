const API_URL = "http://reservatuclase.site:8080"; // URL base de la API, se puede reemplazar por "http://localhost:8080" para pruebas locales

// ------------------------
// Autenticación
// ------------------------

// Función para iniciar sesión
function login(correo, password) {
  return $.ajax({
    url: `${API_URL}/auth/login`, // Endpoint de login
    method: "POST",
    contentType: "application/json",
    data: JSON.stringify({ email: correo, password: password }) // Datos de inicio de sesión
  });
}

// ------------------------
// Usuarios
// ------------------------

// Función para obtener todos los usuarios
function obtenerUsuarios() {
  return $.ajax({
    url: `${API_URL}/usuarios`,
    method: "GET",
    headers: authHeader() // Agregar token de autenticación
  });
}

// Función para obtener el usuario autenticado
function obtenerUsuarioAutenticado() {
  return $.ajax({
    url: `${API_URL}/usuarios/me`,
    method: "GET",
    headers: authHeader()
  });
}

// Función para eliminar un usuario
function eliminarUsuario(id) {
  return $.ajax({
    url: `${API_URL}/usuarios/${id}`,
    method: "DELETE",
    headers: authHeader()
  });
}

// Función para actualizar un usuario
function actualizarUsuario(id, datos) {
  return $.ajax({
    url: `${API_URL}/usuarios/${id}`,
    method: "PUT",
    contentType: "application/json",
    headers: authHeader(),
    data: JSON.stringify(datos)
  });
}

// Función para obtener todos los monitores
function obtenerMonitores() {
  return $.ajax({
    url: `${API_URL}/usuarios/monitores`,
    method: "GET",
    headers: authHeader()
  });
}

// Función para obtener todos los clientes
function obtenerClientes() {
  return $.ajax({
    url: `${API_URL}/usuarios/clientes`,
    method: "GET",
    headers: authHeader()
  });
}

// Función para obtener un usuario por ID
function obtenerUsuario(id) {
  return $.ajax({
    url: `${API_URL}/usuarios/${id}`,
    method: "GET",
    headers: authHeader()
  });
}

// Función para registrar un nuevo usuario
function registroUsuario(usuario) {
  return $.ajax({
    url: `${API_URL}/usuarios/registro`,
    method: "POST",
    contentType: "application/json",
    data: JSON.stringify(usuario)
  });
}

// ------------------------
// Clases
// ------------------------

// Función para obtener todas las clases disponibles
function obtenerClasesDisponibles() {
  return $.ajax({
    url: `${API_URL}/clases/disponibles`,
    method: "GET",
    headers: authHeader()
  });
}

// Función para obtener una clase por ID
function obtenerClase(id) {
  return $.ajax({
    url: `${API_URL}/clases/${id}`,
    method: "GET",
    headers: authHeader()
  });
}

// Función para crear una nueva clase
function crearClase(clase) {
  return $.ajax({
    url: `${API_URL}/clases`,
    method: "POST",
    contentType: "application/json",
    headers: authHeader(),
    data: JSON.stringify(clase)
  });
}

// Función para actualizar una clase
function actualizarClase(id, clase) {
  return $.ajax({
    url: `${API_URL}/clases/${id}`,
    method: "PUT",
    contentType: "application/json",
    headers: authHeader(),
    data: JSON.stringify(clase)
  });
}

// Función para eliminar una clase
function eliminarClase(id) {
  return $.ajax({
    url: `${API_URL}/clases/${id}`,
    method: "DELETE",
    headers: authHeader()
  });
}

// ------------------------
// Tipos de Clase
// ------------------------

// Función para obtener todos los tipos de clase
function obtenerTiposClase() {
  return $.ajax({
    url: `${API_URL}/tipos-clase`,
    method: "GET",
    headers: authHeader()
  });
}

// Función para crear un nuevo tipo de clase
function crearTipoClase(tipoClase) {
  return $.ajax({
    url: `${API_URL}/tipos-clase`,
    method: "POST",
    contentType: "application/json",
    headers: authHeader(),
    data: JSON.stringify(tipoClase)
  });
}

// Función para eliminar un tipo de clase
function eliminarTipoClase(id) {
  return $.ajax({
    url: `${API_URL}/tipos-clase/${id}`,
    method: "DELETE",
    headers: authHeader()
  });
}

// ------------------------
// Reservas
// ------------------------

// Función para reservar una clase
function reservarClase(reserva) {
  return $.ajax({
    url: `${API_URL}/reservas`,
    method: "POST",
    contentType: "application/json",
    headers: authHeader(),
    data: JSON.stringify(reserva)
  });
}

// Función para cancelar una reserva
function cancelarReserva(id) {
  return $.ajax({
    url: `${API_URL}/reservas/${id}`,
    method: "DELETE",
    headers: authHeader()
  });
}

// Función para obtener todas las reservas de un cliente
function obtenerReservasCliente(clienteId) {
  return $.ajax({
    url: `${API_URL}/reservas/cliente/${clienteId}`,
    method: "GET",
    headers: authHeader()
  });
}

// Función para obtener las reservas de una clase específica
function obtenerReservasClase(claseId) {
  return $.ajax({
    url: `${API_URL}/reservas/clase/${claseId}`,
    method: "GET",
    headers: authHeader()
  });
}

// Función para verificar una reserva
function verificarReserva(clienteId, claseId) {
  return $.ajax({
    url: `${API_URL}/reservas/verificar`,
    method: "GET",
    data: { clienteId, claseId },
    headers: authHeader()
  });
}

// ------------------------
// Lista de Espera
// ------------------------

// Función para unirse a la lista de espera
function unirseListaEspera(clienteId, claseId) {
  return $.ajax({
    url: `${API_URL}/lista-espera/agregar?clienteId=${clienteId}&claseId=${claseId}`, // Enviar clienteId y claseId como parámetros en la URL
    method: "POST",
    contentType: "application/json",
    headers: authHeader()
  });
}

// Función para eliminar de la lista de espera
function eliminarListaEspera(id) {
  return $.ajax({
    url: `${API_URL}/lista-espera/eliminar/${id}`,
    method: "DELETE",
    headers: authHeader()
  });
}

// Función para obtener todas las listas de espera de un cliente
function obtenerListasEsperaCliente(clienteId) {
  return $.ajax({
    url: `${API_URL}/lista-espera/cliente/${clienteId}`,
    method: "GET",
    headers: authHeader()
  });
}

// Función para verificar si un cliente está en la lista de espera de una clase
function verificarListaEspera(clienteId, claseId) {
  return $.ajax({
    url: `${API_URL}/lista-espera/verificar`,
    method: "GET",
    data: { clienteId, claseId },
    headers: authHeader()
  });
}

// ------------------------
// Notificaciones
// ------------------------

// Función para obtener todas las notificaciones de un cliente
function obtenerNotificaciones(clienteId) {
  return $.ajax({
    url: `${API_URL}/notificaciones/cliente/${clienteId}`,
    method: "GET",
    headers: authHeader()
  });
}

// Función para marcar una notificación como leída
function marcarNotificacionLeida(id) {
  return $.ajax({
    url: `${API_URL}/notificaciones/marcar-como-leida/${id}`,
    method: "PUT",
    headers: authHeader()
  });
}

// Función para enviar una notificación a un cliente
function enviarNotificacion(notificacion) {
  return $.ajax({
    url: `${API_URL}/notificaciones`,
    method: "POST",
    contentType: "application/json",
    headers: authHeader(),
    data: JSON.stringify(notificacion)
  });
}

// ------------------------
// Evaluaciones
// ------------------------

// Función para crear una nueva evaluación
function crearEvaluacion(evaluacion) {
  return $.ajax({
    url: `${API_URL}/evaluaciones`,
    method: "POST",
    contentType: "application/json",
    headers: authHeader(),
    data: JSON.stringify(evaluacion)
  });
}

// Función para obtener todas las evaluaciones de un tipo de clase
function obtenerEvaluacionesTipoClase(tipoClaseId) {
  return $.ajax({
    url: `${API_URL}/evaluaciones/tipo-clase/${tipoClaseId}`,
    method: "GET",
    headers: authHeader()
  });
}

// Función para obtener todas las evaluaciones de un monitor
function obtenerEvaluacionesMonitor(monitorId) {
  return $.ajax({
    url: `${API_URL}/evaluaciones/monitor/${monitorId}`,
    method: "GET",
    headers: authHeader()
  });
}

// Función para obtener todas las evaluaciones
function obtenerTodasEvaluaciones() {
  return $.ajax({
    url: `${API_URL}/evaluaciones`,
    method: "GET",
    headers: authHeader()
  });
}

// Función para eliminar una evaluación
function eliminarEvaluacion(id) {
  return $.ajax({
    url: `${API_URL}/evaluaciones/${id}`,
    method: "DELETE",
    headers: authHeader()
  });
}

// ------------------------
// Helper para agregar el token en cada petición protegida
// ------------------------

// Función para generar el encabezado de autenticación
function authHeader() {
  const tokenData = JSON.parse(localStorage.getItem('token')); // Obtener token del almacenamiento
  if (tokenData) {
    return { "Authorization": `Bearer ${tokenData.value}` }; // Retornar encabezado con token
  } else {
    return {}; // Retornar encabezado vacío si no hay token
  }
}
