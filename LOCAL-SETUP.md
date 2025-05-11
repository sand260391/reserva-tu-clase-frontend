# Configuración Local de ReservaTuClase

Sigue estos pasos para ejecutar la aplicación de forma local:

## Requisitos Previos

1. **Servidor Local**: Instala [XAMPP](https://www.apachefriends.org/) o cualquier servidor local que soporte Apache.
2. **Navegador Web**: Asegúrate de tener un navegador moderno instalado.
3. **Editor de Código**: Opcional, pero recomendado (por ejemplo, Visual Studio Code).

## Pasos de Configuración

1. **Clonar o Descargar el Proyecto**
   - Clona este repositorio o descarga los archivos y colócalos en el directorio `htdocs` de XAMPP:
     ```
     c:\xampp\htdocs\
     ```

2. **Iniciar el Servidor**
   - Abre el Panel de Control de XAMPP.
   - Inicia el servicio de **Apache**.

3. **Configurar la URL del Backend**
   - Abre el archivo `api.js` ubicado en el directorio `assets/js/`.
   - Configura la variable que contiene la URL del backend para que apunte a la dirección donde se encuentra la aplicación `reservatuclase-backend` corriendo. Por ejemplo:
     ```javascript
     const API_URL = "http://localhost:8080";
     ```
   - Si el backend está en un servidor remoto, reemplaza `http://localhost:8080` con la URL correspondiente.

4. **Acceder a la Aplicación**
   - Abre tu navegador y navega a:
     ```
     http://localhost/index.html
     ```

## Notas Adicionales

- Asegúrate de que los permisos de los archivos sean correctos si estás utilizando un sistema operativo basado en Unix.
- Si encuentras problemas, revisa los logs de Apache en el Panel de Control de XAMPP.
