# Proyecto Dockerizado con Backend, Frontend, MySQL y Nginx

Este proyecto configura un entorno completo,incluyendo un **backend**, **frontend**, **base de datos MySQL** y un **proxy Nginx**. Todo ello gestionado mediante **Docker Compose** para facilitar la implementación y el desarrollo.

## Requisitos

Antes de comenzar, asegúrate de tener instalados los siguientes programas:

- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)

Además, necesitarás acceso a un entorno donde puedas ejecutar los contenedores.

## Instalación y Configuración

Sigue estos pasos para configurar el proyecto en tu máquina local:

1. **Clonar el repositorio**:

   ```bash
   git clone https://github.com/tu-usuario/tu-repositorio.git
   cd tu-repositorio
   ```

2. **Configurar las variables de entorno**:

   - Copia el archivo `.env.example` y renómbralo a `.env`.
   - Edita el archivo `.env` con los valores correspondientes a tu entorno, como las credenciales de la base de datos, la URL del backend, etc.

   ```bash
   cp .env.example .env
   # Edita .env según tus necesidades
   ```

3. **Levantar los servicios con Docker Compose**:

   Una vez configurado todo, puedes iniciar los contenedores con el siguiente comando:

   ```bash
   docker-compose up -d
   ```

   Este comando arrancará todos los servicios en segundo plano.

## Servicios

### Backend

- **Ubicación**: `backend/`
- Expone una API REST que proporciona los datos a la aplicación frontend.
- Se conecta a la base de datos MySQL para almacenar y recuperar información.
- El servicio backend para poder conectarse a la base de datos, tiene que esperar que el servicio mysql este corriendo. Por ello, el entrypoint en el Dockerfile del backend, es un script que espera a que este levantada la base de datos para luego conectarse (Script: wait-for-db.sh)

### Frontend

- **Ubicación**: `frontend/`
- Aplicación web que consume los endpoints proporcionados por el backend.
- Servido a través de un servidor **Nginx**.

### MySQL

- Base de datos que almacena la información de la aplicación.
- Las credenciales y configuración se definen en el archivo `.env`.

### Nginx

- Configurado como **reverse proxy** para redirigir el tráfico HTTP entre el frontend y el backend.
- La configuración de Nginx se encuentra en el archivo `nginx.conf`.

## Uso

Aquí te dejo algunos comandos útiles para interactuar con los contenedores:

- **Reconstruir los contenedores tras realizar cambios en los archivos**:

  ```bash
  docker-compose up --build -d
  ```

- **Ver los logs de los contenedores**:

  ```bash
  docker-compose logs -f
  ```

- **Detener los servicios** (sin eliminar los contenedores):

  ```bash
  docker-compose down
  ```
