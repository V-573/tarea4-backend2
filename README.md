# TAREA1 - BACKEND2

## 📌 Temática Elegida
 API REST para la gestión y reserva de zonas comunes en unidad residencial.

---

## 🛠️ Tecnologías Utilizadas
* **Entorno de ejecución:** Node.js
* **Framework Web:** Express.js
* **Variables de entorno:** Dotenv
* **Arquitectura:** Arquitectura en capas(Controladores, Servicios, Repositorios, DAO)

---

## ⚙️ Requisitos Previos e Instalación

### 1. Clonar el repositorio
```bash
git clone <URL_DE_TU_REPOSITO>
cd <NOMBRE_DE_TU_CARPETA>

2. Instalar dependenciasBashnpm install
🔑 Configuración de Variables de Entorno
Crea un archivo .env en la raíz del proyecto basándote en el siguiente esquema:

PORT=8080
NODE_ENV=development

🚀 Cómo Ejecutar la Aplicación
Modo Producción
Bash
npm start

Modo Desarrollo (con recarga automática)
Bash
npm run dev
El servidor estará escuchando en la URL base: http://localhost:8080 (o el puerto configurado en el archivo .env).
```

---

**Rutas Disponibles (Endpoints)**

| Método | Endpoint | Descripción |
| :--- | :--- | :--- |
| GET | /api/events | Obtiene la lista global de eventos registados. (Pendiente de implementación).|
| POST | /api/sessions/register | Endpoint base para crear un usuario. |
| POST | /api/sessions/login | Endpoint base para inicio de sesión. |
| GET | /api/current | Es una ruta protegida, se debe iniciar sesión previamente para usar esta ruta. |
| POST | /api/sessions/logout | Endpoint base para cierre de sesión |

---


API de Autenticación - Módulo de Sesiones
Documentación técnica para los endpoints de registro e inicio de sesión de la API construida en Express, MongoDB (Mongoose) y arquitectura en capas.

Requisitos Generales
Base URL: http://localhost:8080/api/sessions

Headers requeridos:

HTTP
Content-Type: application/json
Endpoints
1. Registrar Usuario
Registra un nuevo usuario en el sistema. Realiza validaciones de entrada con Zod, encripta la contraseña usando bcryptjs y almacena los datos en MongoDB.

Método: POST

URL: http://localhost:8080/api/sessions/register

Cuerpo de la Petición (Request Body)
```JSON
{
  "first_name": "monik",
  "last_name": "gaviria",
  "email": "monik@email.com",
  "password": "123456"
}
```

Respuesta Exitosa (201 Created)
```JSON
{
  "status": "success",
  "message": "Usuario registrado correctamente",
  "payload": {
    "first_name": "monik",
    "last_name": "gaviria",
    "email": "monik@email.com",
    "role": "user"
  }
}
```
![captura desde MongoDB](./src/assets/capturaMongo.jpg)

Posibles Respuestas de Error
400 Bad Request: Datos faltantes o formato inválido (Zod Validation Error).

409 Conflict: El correo electrónico ya se encuentra registrado.

---

2. Iniciar Sesión
Autentica a un usuario existente comparando sus credenciales con el hash almacenado en la base de datos.

Método: POST

URL: http://localhost:8080/api/sessions/login

Cuerpo de la Petición (Request Body)
```JSON
{
  "email": "monik@email.com",
  "password": "123456"
}
```

Respuesta Exitosa (200 OK)
```JSON
{
  "status": "success",
  "message": "Inicio de sesión exitoso",
  "payload": {
    "id": "6a8e9c63f1148e9077e321ad",
    "first_name": "monik",
    "email": "monik@email.com",
    "role": "user"
  }
}
```

![captura desde Postman](./src/assets/capturaPostman.jpg)


3. ruta current
Despues de un inicio de sesión se puede ingresar a esta ruta. Se guarda en navegador una cookie. 
Método: GET
URL: http://localhost:8080/api/sessions/current


Respuesta Exitosa (200 OK)
```JSON
{
    "status": "success",
    "payload": {
        "id": "6a8e9a8d349d544569476326",
        "email": "andres@email.com",
        "role": "user"
    }
}
```
![captura desde Postman](./src/assets/cookie.png)



Si hay un logout o no se inicio sesion sale el error: 

Respuesta Error (401 Unauthorized)
```JSON
{
    "status": "error",
    "message": "No autorizado: Token no proporcionado"
}
```


Posibles Respuestas de Error
400 Bad Request: Formato de correo o contraseña inválido.

401 Unauthorized: El correo no existe o la contraseña no coincide.

Estructura del Proyecto (Arquitectura en Capas)

```
src/
├── config/          # Variables de entorno y conexión a DB
├── controllers/     # Manejo de req/res HTTP
├── daos/            # Consultas directas con Mongoose
├── middlewares/     # Validación de datos con Zod y errores
├── models/          # Schemas de Mongoose (MongoDB)
├── repositories/    # Abstracción de acceso a datos
├── routers/         # Definición de rutas de la API
├── schemas/         # Esquemas de validación con Zod
├── services/        # Lógica de negocio (bcrypt, reglas de dominio)
└── utils/           # Utilidades de encriptación

```