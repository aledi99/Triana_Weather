# Proyecto Triana Weather
API Rest meteorologíca de las asignuaturas:
* Programación de Servicios y Procesos
* Acceso a Datos

Proyecto sobre la gestión de datos meteorologicos.

***


#### Ejercicio realizado por grupos cooperativos en clase
##### Realizado por:
* [Alejandro Díaz Santos](https://github.com/aledi99 "Alejandro Díaz Santos perfil de GitHub")
* [Jesus Ceacero Jimeno](https://github.com/cads918 "Jesus Ceacero Jimeno perfil de GitHub")
* [Daniel Santano Fernández](https://github.com/DanielSantanoF "Daniel Santano Fernández perfil de GitHub")

***


#### Tecnologías usadas:
* JavaScript 6
* [NodeJs](https://nodejs.org/en/)
* [Mongoose](https://mongoosejs.com/)
* [npm](https://www.npmjs.com/)
* IDE: [Visual Studio Code](https://code.visualstudio.com/) necesario para arrancar la api rest (se debe arrancar desde el IDE)

***


### Distribución del trabajo
La distribución del trabajo de este proyecto se ha plasmado en este documento:

* [Ver documento](https://docs.google.com/spreadsheets/d/1j3si2t2xRK7bHqjTtvCvvOnNkA03Dm6Ygwtb4CW-mvQ/edit?usp=sharing "Documento de la distribución del trabajo")

***


#### Variables de entorno necesarias en un archivo .env para el Api Rest:
* `MONGODB_URI` url de acceso a mongodb
* `JWT_SECRET` string que es el secreto del JWT
* `BCRYPT_ROUNDS` 12 por ejemplo
* `JWT_LIFETIME` duración del JWT indicada en segundos
* `JWT_ALGORITHM` HS256 por ejemplo

***


#### Usar la Api Rest:
* Tener mongo disponible en local e indicar las variables de entorno del proyecto en un archivo `.env`
* Importar el proyecto en VSC abrir un nuevo terminal y ejecutar `npm start`
* Se arranca en el puerto `localhost:3000`

***


## Endpoints

### Registrarse en el Api Rest

| Tipo/URL    | POST => `/api/register`            |
| ----------- |:----------------------------------:|
| Comentarios | Petición para registrar un usuario |
| Cabeceras   | `Content-Type: application/json`   |
| Cuerpo      | Datos de un nuevo usuario          |
| Respuesta/s | 201 Created => Devuelve los datos del usuario |


#### Cuerpo y respuesta del Endpoint
* Cuerpo:
```json
{
    "username": "usuario",
    "email": "usuario@email.com",
    "fullname": "usernameFullname",
    "password": "1234"
}
```
* Respuesta:
```json
{
    "id": "5dfb254d3f50834e9c920213",
    "fullname": "usernameFullname",
    "username": "usuario",
    "email": "usuario@email.com"
}
```

***

### Login en el Api Rest

| Tipo/URL    | POST => `/api/login` |
| ----------- |:----------------------------------:|
| Comentarios | Petición para loguear un usuario |
| Cabeceras   | `Content-Type: application/json` |
| Cuerpo      | Username y contraseña |
| Respuesta/s | 200 Ok => Devuelve username, role y JWT |


#### Cuerpo y respuesta del Endpoint
* Cuerpo:
```json
{
	"username": "usuario",
	"password": "1234"
}
```
* Respuesta:
```json
{
    "username": "usuario",
    "role": "ADMIN",
    "token": "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI1ZGZiMjU0ZDNmNTA4MzRlOWM5MjAyMTMiLCJleHAiOjE1NzY3NDIyNzQ2NjMsInVzZXJuYW1lIjoidXN1YXJpbyJ9.9YoGvqaFMMGe0HTc1g2kFRT5eOpWQvUyEhD4IJGuEpU"
}
```

***

### Obetener todos los usuarios

| Tipo/URL    | GET => `/api/users` |
| ----------- |:----------------------------------:|
| Comentarios | Petición obtener todos los usuarios |
| Cabeceras   | `Content-Type: application/json con Token JWT y rol de ADMIN` |
| Respuesta/s | 200 Ok => Lista con todos los usuarios registrados |


#### Respuesta del Endpoint
* Respuesta:
```json
[
    {
        "_id": "5df9d15caf355116a87f276b",
        "username": "usuarioUser",
        "roles": "USER"
    },
    {
        "_id": "5df9d169af355116a87f276c",
        "username": "usuarioManager",
        "roles": "MANAGER"
    },
    {
        "_id": "5dfb254d3f50834e9c920213",
        "username": "usuarioAdmin",
        "roles": "ADMIN"
    }
]
```

***

### Obtener todas las Estaciones Metereologicas

| Tipo/URL    | GET => `/api/stations` |
| ----------- |:----------------------------------:|
| Comentarios | Petición obtener todas las estaciones |
| Cabeceras   | `Content-Type: application/json con Token JWT y rol de MANAGER` |
| Respuesta/s | 200 Ok => Devuelve lista con todas las estaciones registradas |


#### Respuesta del Endpoint
* Respuesta:
```json
[
    {
        "_id": "5dfb25debb0f2e47fcaf8db4",
        "latitude": -40.6894,
        "longitude": -118.8367,
        "name": "station1",
        "registed_by": {
            "_id": "5dfb254d3f50834e9c920213",
            "email": "usuario@email.com",
            "fullname": "usernameFullname"
        },
        "maitenanced_by": {
            "_id": "5dfb254d3f50834e9c920213",
            "email": "usuario@email.com",
            "fullname": "usernameFullname"
        },
        "registed_at": "2019-12-19T07:25:18.399Z",
        "__v": 0
    },
    {
        "_id": "5dfb260189983a0688b239dc",
        "latitude": 75.0762,
        "longitude": -149.0278,
        "name": "station2",
        "registed_by": {
            "_id": "5dfb254d3f50834e9c920213",
            "email": "usuario@email.com",
            "fullname": "usernameFullname"
        },
        "maitenanced_by": {
            "_id": "5dfb254d3f50834e9c920213",
            "email": "usuario@email.com",
            "fullname": "usernameFullname"
        },
        "registed_at": "2019-12-19T07:25:53.238Z",
        "__v": 0
    },
    {
        "_id": "5dfb2d3935ba8a3340a4bfa3",
        "latitude": 86.1271,
        "longitude": -20.3819,
        "name": "station3",
        "registed_by": {
            "_id": "5dfb254d3f50834e9c920213",
            "email": "usuario@email.com",
            "fullname": "usernameFullname"
        },
        "maitenanced_by": {
            "_id": "5dfb254d3f50834e9c920213",
            "email": "usuario@email.com",
            "fullname": "usernameFullname"
        },
        "registed_at": "2019-12-19T07:56:41.102Z",
        "__v": 0
    }
]
```

***

### Obtener datos de una estación

| Tipo/URL    | GET => `/api/stations/:id` |
| ----------- |:----------------------------------:|
| Comentarios | Petición para obtener los datos de una estación |
| Cabeceras   | `Content-Type: application/json con Token JWT y rol de MANAGER` |
| Parametros  | ID de la estación |
| Respuesta/s | 200 Ok => Devuelve datos de la estación, si existe |


#### Respuesta del Endpoint
* Respuesta:
```json
{
    "_id": "5dfb260189983a0688b239dc",
    "latitude": 75.0762,
    "longitude": -149.0278,
    "name": "station2",
    "registed_by": {
        "_id": "5dfb254d3f50834e9c920213",
        "email": "usuario@email.com",
        "fullname": "usernameFullname"
    },
    "maitenanced_by": {
        "_id": "5dfb254d3f50834e9c920213",
        "email": "usuario@email.com",
        "fullname": "usernameFullname"
    },
    "registed_at": "2019-12-19T07:25:53.238Z",
    "__v": 0
}
```

***

### Crear una estación

| Tipo/URL    | POST => `/api/stations` |
| ----------- |:----------------------------------:|
| Comentarios | Crear una nueva estación |
| Cabeceras   | `Content-Type: application/json con Token JWT y rol de MANAGER` |
| Cuerpo      | Datos de una estación |
| Respuesta/s | 201 Created => Devuelve los datos de la estación creada |


#### Cuerpo y respuesta del Endpoint
* Cuerpo:
```json
{
	"latitude": 75.0762,
    "longitude": -149.0278,
    "name": "stationName"
}
```
* Respuesta:
```json
{
    "_id": "5dfb2d4035ba8a3340a4bfa4",
    "latitude": 75.0762,
    "longitude": -149.0278,
    "name": "stationName",
    "registed_by": {
        "_id": "5dfb254d3f50834e9c920213",
        "email": "usuario@email.com",
        "fullname": "usernameFullname"
    },
    "maitenanced_by": {
        "_id": "5dfb254d3f50834e9c920213",
        "email": "usuario@email.com",
        "fullname": "usernameFullname"
    },
    "registed_at": "2019-12-19T07:56:48.672Z",
    "__v": 0
}
```

***

### Editar una estación

| Tipo/URL    | PUT => `api/stations/:id` |
| ----------- |:----------------------------------:|
| Comentarios | Petición para modificar los datos de una estación |
| Cabeceras   | `Content-Type: application/json con Token JWT y rol de MANAGER` |
| Cuerpo      | Nuevos datos de la estación |
| Parámetros  | ID de la estación |
| Respuesta/s | 200 Ok => Devuelve los datos de la estación modificada |


#### Cuerpo y respuesta del Endpoint
* Cuerpo:
```json
{
	"latitude": -25.2258,
    "longitude": 92.2458,
    "name": "stationNameUpdated"
}
```
* Respuesta:
```json
{
    "_id": "5dfb2d4035ba8a3340a4bfa4",
    "latitude": -25.2258,
    "longitude": 92.2458,
    "name": "stationNameUpdated",
    "registed_by": {
        "_id": "5dfb254d3f50834e9c920213",
        "email": "usuario@email.com",
        "fullname": "usernameFullname"
    },
    "maitenanced_by": {
        "_id": "5dfb254d3f50834e9c920213",
        "email": "usuario@email.com",
        "fullname": "usernameFullname"
    },
    "registed_at": "2019-12-19T07:56:48.672Z",
    "__v": 0
}
```

***

### Eliminar una estación

| Tipo/URL    | DELETE  => `api/stations/:id` |
| ----------- |:----------------------------------:|
| Comentarios | Petición eliminar los datos de una estación |
| Cabeceras   | `Content-Type: application/json con Token JWT y rol de MANAGER` |
| Parámetros  | ID de la estación |
| Respuesta/s | 204 No Content |


#### Respuesta del Endpoint
* Respuesta:
```json

```

***

### Registra nuevos Datos Metereologicos de una estación

| Tipo/URL    | POST  => `/api/weather` |
| ----------- |:----------------------------------:|
| Comentarios | Registra una nueva entrada de datos meteorológicos de una estación |
| Cabeceras   | `Content-Type: application/json con Token JWT y rol de MANAGER` |
| Cuerpo      | Cata de datos meteorológicos (todos) y Estación meteorológica |
| Respuesta/s | 201 Created => Devuelve todos los datos de la nueva toma registrada, incluyendo todos los datos de la estación |


#### Cuerpo y respuesta del Endpoint
* Cuerpo:
```json
{
	"rain": 15.4,
    "wind_speed": 29,
    "wind_direction": 194,
    "temperature_ambient": 15.9,
    "temperature_graund": 14.1,
    "humidity":92,
    "air_quality": 57,
    "pressure": 1013.79,
    "station": "5dfb2d4035ba8a3340a4bfa4"
}
```
* Respuesta:
```json
{
    "_id": "5dfb3812799251568c8eeb70",
    "rain": 15.4,
    "wind_speed": 29,
    "wind_direction": 194,
    "temperature_ambient": 15.9,
    "temperature_graund": 14.1,
    "humidity": 92,
    "air_quality": 57,
    "pressure": 1013.79,
    "station": {
        "_id": "5dfb2d4035ba8a3340a4bfa4",
        "latitude": 123,
        "longitude": 123,
        "name": "asgrtkjyjlg",
        "registed_by": {
            "_id": "5dfb254d3f50834e9c920213",
            "email": "usuario@email.com",
            "fullname": "usernameFullname"
        },
        "maitenanced_by": {
            "_id": "5dfb254d3f50834e9c920213",
            "email": "usuario@email.com",
            "fullname": "usernameFullname"
        },
        "registed_at": "2019-12-19T07:56:48.672Z",
        "__v": 0
    },
    "registed_at": "2019-12-19T08:42:58.578Z",
    "__v": 0
}
```

***

### Obtener Datos Metereologicos específicos

| Tipo/URL    | GET  => `/api/weather/:id` |
| ----------- |:----------------------------------:|
| Comentarios | Petición para obtener los datos meteorológicos en base a su ID |
| Cabeceras   | `Content-Type: application/json con Token JWT y rol de USER` |
| Parámetros  | ID de la cata de datos meteorológicos |
| Respuesta/s | 200 Ok => Devuelve datos meteorológicos, fecha, la estación |


#### Respuesta del Endpoint
* Respuesta:
```json
{
    "_id": "5dfb3812799251568c8eeb70",
    "rain": 15.4,
    "wind_speed": 29,
    "wind_direction": 194,
    "temperature_ambient": 15.9,
    "temperature_graund": 14.1,
    "humidity": 92,
    "air_quality": 57,
    "pressure": 1013.79,
    "station": {
        "_id": "5dfb2d4035ba8a3340a4bfa4",
        "latitude": 123,
        "longitude": 123,
        "name": "asgrtkjyjlg",
        "registed_by": {
            "_id": "5dfb254d3f50834e9c920213",
            "email": "usuario@email.com",
            "fullname": "usernameFullname"
        },
        "maitenanced_by": {
            "_id": "5dfb254d3f50834e9c920213",
            "email": "usuario@email.com",
            "fullname": "usernameFullname"
        },
        "registed_at": "2019-12-19T07:56:48.672Z",
        "__v": 0
    },
    "registed_at": "2019-12-19T08:42:58.578Z",
    "__v": 0
}
```

***

### Obtener todos los Datos Metereologicos de una estación

| Tipo/URL    | GET  => `/api/stations/:id/weather/` |
| ----------- |:----------------------------------:|
| Comentarios | Petición para obtener los datos meteorológicos de una estación |
| Cabeceras   | `Content-Type: application/json con Token JWT y rol de USER` |
| Parámetros  | ID de la estación |
| Respuesta/s | 200 Ok => Devuelve lista de datos meteorológicos  y fecha, así como la estación |


#### Respuesta del Endpoint
* Respuesta:
```json
[
    {
        "_id": "5dfb3812799251568c8eeb70",
        "rain": 15.4,
        "wind_speed": 29,
        "wind_direction": 194,
        "temperature_ambient": 15.9,
        "temperature_graund": 14.1,
        "humidity": 92,
        "air_quality": 57,
        "pressure": 1013.79,
        "station": {
            "_id": "5dfb2d4035ba8a3340a4bfa4",
            "latitude": 123,
            "longitude": 123,
            "name": "asgrtkjyjlg",
            "registed_by": "5dfb254d3f50834e9c920213",
            "maitenanced_by": "5dfb254d3f50834e9c920213",
            "registed_at": "2019-12-19T07:56:48.672Z",
            "__v": 0
        },
        "registed_at": "2019-12-19T08:42:58.578Z",
        "__v": 0
    },
    {
        "_id": "5dfb3812799251568c8eeb71",
        "rain": 13,
        "wind_speed": 32,
        "wind_direction": 164,
        "temperature_ambient": 13,
        "temperature_graund": 12.3,
        "humidity": 70,
        "air_quality": 60,
        "pressure": 1015.94,
        "station": {
            "_id": "5dfb2d4035ba8a3340a4bfa4",
            "latitude": 123,
            "longitude": 123,
            "name": "asgrtkjyjlg",
            "registed_by": "5dfb254d3f50834e9c920213",
            "maitenanced_by": "5dfb254d3f50834e9c920213",
            "registed_at": "2019-12-19T07:56:48.672Z",
            "__v": 0
        },
        "registed_at": "2019-12-19T08:42:58.578Z",
        "__v": 0
    }
]
```

***

### Obtener todos los Datos Metereologicos de hoy

| Tipo/URL    | GET  => `/api/weather/today` |
| ----------- |:----------------------------------:|
| Comentarios | Petición para obtener todos los datos meteorológicos de todas las estaciones para el día de hoy |
| Cabeceras   | `Content-Type: application/json con Token JWT y rol de USER` |
| Respuesta/s | 200 Ok => Devuelve lista de datos meteorológicos y fecha, así como la estación |


#### Respuesta del Endpoint
* Respuesta:
```json
[
    {
        "_id": "5dfb3812799251568c8eeb70",
        "rain": 15.4,
        "wind_speed": 29,
        "wind_direction": 194,
        "temperature_ambient": 15.9,
        "temperature_graund": 14.1,
        "humidity": 92,
        "air_quality": 57,
        "pressure": 1013.79,
        "station": {
            "_id": "5dfb2d4035ba8a3340a4bfa4",
            "latitude": 123,
            "longitude": 123,
            "name": "asgrtkjyjlg",
            "registed_by": "5dfb254d3f50834e9c920213",
            "maitenanced_by": "5dfb254d3f50834e9c920213",
            "registed_at": "2019-12-19T07:56:48.672Z",
            "__v": 0
        },
        "registed_at": "2019-12-19T08:42:58.578Z",
        "__v": 0
    },
    {
        "_id": "5dfb3812799251568c8eeb71",
        "rain": 13,
        "wind_speed": 32,
        "wind_direction": 164,
        "temperature_ambient": 13,
        "temperature_graund": 12.3,
        "humidity": 70,
        "air_quality": 60,
        "pressure": 1015.94,
        "station": {
            "_id": "5dfb2d4035ba8a3340a4bfa4",
            "latitude": 123,
            "longitude": 123,
            "name": "asgrtkjyjlg",
            "registed_by": "5dfb254d3f50834e9c920213",
            "maitenanced_by": "5dfb254d3f50834e9c920213",
            "registed_at": "2019-12-19T07:56:48.672Z",
            "__v": 0
        },
        "registed_at": "2019-12-19T08:42:58.578Z",
        "__v": 0
    }
]
```

***

### Obtener todos los Datos Metereologicos de una estación en un intervalo de tiempo

| Tipo/URL    | GET  => `/api/stations/:id/weather/from/:from/to/:to` |
| ----------- |:----------------------------------:|
| Comentarios | Petición para obtener los datos meteorológicos de una estación para un rango de fechas |
| Cabeceras   | `Content-Type: application/json con Token JWT y rol de USER` |
| Parámetros  | ID de la estación, FROM fecha desde, TO fecha hasta. |
| Respuesta/s | 200 Ok => Devuelve lista de datos meteorológicos y fecha, así como la estación |


#### Respuesta del Endpoint
* Respuesta:
```json
[
    {
        "_id": "5dfb3812799251568c8eeb70",
        "rain": 15.4,
        "wind_speed": 29,
        "wind_direction": 194,
        "temperature_ambient": 15.9,
        "temperature_graund": 14.1,
        "humidity": 92,
        "air_quality": 57,
        "pressure": 1013.79,
        "station": {
            "_id": "5dfb2d4035ba8a3340a4bfa4",
            "latitude": 123,
            "longitude": 123,
            "name": "asgrtkjyjlg",
            "registed_by": "5dfb254d3f50834e9c920213",
            "maitenanced_by": "5dfb254d3f50834e9c920213",
            "registed_at": "2019-12-19T07:56:48.672Z",
            "__v": 0
        },
        "registed_at": "2019-12-19T08:42:58.578Z",
        "__v": 0
    },
    {
        "_id": "5dfb3812799251568c8eeb71",
        "rain": 13,
        "wind_speed": 32,
        "wind_direction": 164,
        "temperature_ambient": 13,
        "temperature_graund": 12.3,
        "humidity": 70,
        "air_quality": 60,
        "pressure": 1015.94,
        "station": {
            "_id": "5dfb2d4035ba8a3340a4bfa4",
            "latitude": 123,
            "longitude": 123,
            "name": "asgrtkjyjlg",
            "registed_by": "5dfb254d3f50834e9c920213",
            "maitenanced_by": "5dfb254d3f50834e9c920213",
            "registed_at": "2019-12-19T07:56:48.672Z",
            "__v": 0
        },
        "registed_at": "2019-12-19T08:42:58.578Z",
        "__v": 0
    }
]
```

***

### Obtener todos los Datos Metereologicos en un intervalo de tiempo

| Tipo/URL    | GET  => `api/weather/from/:from/to/:to` |
| ----------- |:----------------------------------:|
| Comentarios | Petición para obtener los datos meteorológicos de una estación para un rango de fechas |
| Cabeceras   | `Content-Type: application/json con Token JWT y rol de USER` |
| Parámetros  | FROM fecha desde, TO fecha hasta. |
| Respuesta/s | 200 Ok => Devuelve lista de datos meteorológicos y fecha, así como la estación |


#### Respuesta del Endpoint
* Respuesta:
```json
[
    {
        "_id": "5dfb3812799251568c8eeb70",
        "rain": 15.4,
        "wind_speed": 29,
        "wind_direction": 194,
        "temperature_ambient": 15.9,
        "temperature_graund": 14.1,
        "humidity": 92,
        "air_quality": 57,
        "pressure": 1013.79,
        "station": {
            "_id": "5dfb2d4035ba8a3340a4bfa4",
            "latitude": 123,
            "longitude": 123,
            "name": "asgrtkjyjlg",
            "registed_by": "5dfb254d3f50834e9c920213",
            "maitenanced_by": "5dfb254d3f50834e9c920213",
            "registed_at": "2019-12-19T07:56:48.672Z",
            "__v": 0
        },
        "registed_at": "2019-12-19T08:42:58.578Z",
        "__v": 0
    },
    {
        "_id": "5dfb3812799251568c8eeb71",
        "rain": 13,
        "wind_speed": 32,
        "wind_direction": 164,
        "temperature_ambient": 13,
        "temperature_graund": 12.3,
        "humidity": 70,
        "air_quality": 60,
        "pressure": 1015.94,
        "station": {
            "_id": "5dfb2d4035ba8a3340a4bfa4",
            "latitude": 123,
            "longitude": 123,
            "name": "asgrtkjyjlg",
            "registed_by": "5dfb254d3f50834e9c920213",
            "maitenanced_by": "5dfb254d3f50834e9c920213",
            "registed_at": "2019-12-19T07:56:48.672Z",
            "__v": 0
        },
        "registed_at": "2019-12-19T08:42:58.578Z",
        "__v": 0
    }
]
```