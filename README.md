# Prueba Técnica: Sistema de Gestión de Colaboradores 
## Descripción
 Prueba técnica de NIU implementando REST con Node.js/Express y el Frontend en React

# La estructura es
- /backend: API REST y la lógica de la base de datos
- /frontend: Interfaz de usuario Node.js v18 

## Requisitos Previos
El repositorio está organizado en dos directorios principales:

* **DATOSEMPLEADO.BE (Backend):** API RESTful construida con Node.js, Express y MySQL2.
    * `src/config`: Configuración de la conexión a la base de datos.
    * `src/controllers`: Lógica de negocio, controladores de ruta y validaciones de datos.
    * `src/routes`: Definición de endpoints y métodos HTTP.

* **DATOSEMPLEADO.FE (Frontend):** SPA construida con React, Vite y TailwindCSS.

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

## 2. Backend (API)
El servidor escuchará peticiones en el puerto 3000.

Navegar al directorio del backend:

cd DATOSEMPLEADO.BE

 Instalar dependencias:

npm install

# Configurar Variables de Entorno:

PORT=3000

DB_HOST=localhost

DB_USER=tu_usuario_mysql

DB_PASSWORD=tu_password_mysql

DB_NAME=TEST

Iniciar el servidor en modo desarrollo utilizando nodemon:

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
