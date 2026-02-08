# Prueba Técnica: Sistema de Gestión de Colaboradores 
## Descripción
 Prueba técnica de NIU implementando REST con Node.js/Express y el Frontend en React

# La estructura es
- /backend: API REST y la lógica de la base de datos
- /frontend: Interfaz de usuario Node.js v18 

## Requisitos Previos
El repositorio está organizado en dos directorios principales:

* **DATOSEMPLEADO.BE (Backend):** API RESTful construida con Node.js, Express y MySQL2.
* **Node.js & Express:** Elegido por su eficiencia en I/O y facilidad para crear APIs REST escalables.
* **MySQL2 (Promise wrapper):** Utilizado para gestionar consultas asíncronas de manera limpia usando `async/await`.
* **JSON Web Tokens (JWT):** Implementado para asegurar los endpoints y garantizar que solo usuarios autenticados gestionen la información sensible (Cumplimiento de requisito "Extra").
* **BcryptJS:** Para el hasheo seguro de contraseñas, siguiendo estándares de seguridad OWASP.

* **DATOSEMPLEADO.FE (Frontend):** 
* **React + Vite:** Seleccionado por su velocidad de compilación y modularidad basada en componentes.
* **TailwindCSS:** Utilizado para agilizar el diseño de interfaces modernas y garantizar la **responsividad** (vista de Tabla en Desktop vs. Tarjetas en Móvil).
* **Fetch API (Service Pattern):** Se implementó una capa de servicios (`src/services`) para desacoplar la lógica de conexión de la vista, facilitando el mantenimiento.

## Requisitos Previos
* Node.js (v18 o superior recomendado)
* MySQL Server en ejecución

## Intrucciones para poder correr el proyecto (instalar sus dependencias):

1. Configuración de Base de Datos

### Crear tabla en MySQL:

CREATE DATABASE TEST;

USE TEST;

CREATE TABLE COLABORADOR (

    IDCOLABORADOR INT(11) AUTO_INCREMENT PRIMARY KEY,

    NOMBRE VARCHAR(45) NOT NULL,

    APELLIDO VARCHAR(45) NOT NULL,

    DIRECCION VARCHAR(45),

    EDAD INT(3) NOT NULL,

    PROFESION VARCHAR(45),

    ESTADOCIVIL VARCHAR(45)

)

-- Tabla adicional para manejar el Login (JWT)

CREATE TABLE IF NOT EXISTS USUARIO (

    IDUSUARIO INT AUTO_INCREMENT PRIMARY KEY,

    EMAIL VARCHAR(100) NOT NULL UNIQUE,

    PASSWORD VARCHAR(255) NOT NULL
    
);

## 2. Backend (API)
El servidor escuchará peticiones en el puerto 3000.

Navegar al directorio del backend:

cd DATOSEMPLEADO.BE

- Instalar dependencias:

npm install

# Configurar Variables de Entorno:

PORT=3000

DB_HOST=localhost

DB_USER=tu_usuario_mysql

DB_PASSWORD=tu_password_mysql

DB_NAME=TEST

JWT_SECRET=clave_secreta_para_prueba_tecnica

- Iniciar el servidor en modo desarrollo utilizando nodemon:

npm run dev

## 3. Fronted 
La aplicación web se ejecutará en el puerto 5173 (puerto por defecto de Vite).

Nota Técnica sobre Estilos: Este proyecto utiliza necesariamente TailwindCSS v3.4.17 para su compatibilidad con la configuración actual de PostCSS y evitar conflictos conocidos con versiones más recientes como la v4.

Navegar al directorio del frontend:
Desde la raíz del proyecto

cd DATOSEMPLEADO.FE

# Instalar dependencias:
npm install

- Si encuentras errores relacionados con estilos o versiones, fuerza la instalación de la versión compatible ejecutando:

npm install -D tailwindcss@3.4.17 postcss autoprefixer

Iniciar la aplicación:

npm run dev

Acceso:
Abre tu navegador y visita: http://localhost:5173

# Guía de Uso
1. Autenticación (Login)
Al ingresar por primera vez, el sistema solicitará credenciales. Como la base de datos de usuarios está vacía, debe registrarse primero vía Postman o insertar un usuario manualmente, O usar el flujo implementado:

Nota para el evaluador: Puede registrar un usuario haciendo un POST a http://localhost:3000/auth/register con JSON: { "email": "admin@test.com", "password": "123" }.

2. Gestión de Colaboradores
Agregar: Complete el formulario superior. Si falta el nombre o la edad es inválida, el sistema bloqueará el envío.

Visualizar: Los datos aparecen en la tabla inferior.

Paginación: Si hay más de 5 registros, use los botones "Anterior" y "Siguiente".

Riesgo: Haga clic en el botón "Riesgo" de cada fila para ver la alerta según la edad (Lógica: 18-25, 26-50, 51+).

3. Vista Móvil
Reduzca el ancho del navegador o abra las herramientas de desarrollador (F12) en modo móvil. La tabla se transformará automáticamente en Tarjetas (Cards) para mejor experiencia de usuario.