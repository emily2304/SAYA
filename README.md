# SayA · Transcriptor y asistente de estudio con IA

Plataforma web educativa que convierte clases y audios en material de estudio. Los estudiantes y profesores suben un audio, SayA lo transcribe y, con IA, genera **resúmenes, afiches, glosarios y cuestionarios**. También incluye grupos de clase, foro de anuncios, sala de estudio y un asistente conversacional.

![Angular](https://img.shields.io/badge/Angular-19-DD0031?logo=angular&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-Express_5-339933?logo=node.js&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-47A248?logo=mongodb&logoColor=white)
![OpenAI](https://img.shields.io/badge/OpenAI-API-412991?logo=openai&logoColor=white)
![Bootstrap](https://img.shields.io/badge/Bootstrap-5-7952B3?logo=bootstrap&logoColor=white)

<!-- Agrega aquí una captura o GIF de la app, por ejemplo:
![Vista principal de SayA](docs/screenshot-landing.png)
-->

## Tabla de contenidos

- [Funcionalidades](#funcionalidades)
- [Tecnologías](#tecnologías)
- [Arquitectura](#arquitectura)
- [Estructura del proyecto](#estructura-del-proyecto)
- [Instalación y ejecución](#instalación-y-ejecución)
- [Lo que aprendí](#lo-que-aprendí)
- [Desarrollado por](#desarrollado-por)

## Funcionalidades

### Transcripción y contenido generado con IA
- **Subida de audios MP3** y transcripción automática de voz a texto en español.
- **Consulta de transcripciones** en tres modos:
  - **Resumen**: síntesis concisa del contenido.
  - **Afiche**: título, resumen y conceptos clave, descargable en **PDF**.
  - **Glosario**: términos importantes con su definición.
- **Cuestionarios automáticos**: genera preguntas de opción múltiple a partir de una transcripción, permite resolverlas, calcula la calificación y muestra las respuestas correctas. Se pueden descargar o eliminar.
- **Asistente de IA**: chat con SayA para resolver dudas.

### Roles: estudiante y profesor
| Profesor | Estudiante |
|---|---|
| Crear, editar y administrar grupos (con imagen y descripción) | Unirse a grupos y ver su contenido |
| Ver los miembros de cada grupo | Publicar preguntas en la sala de estudio |
| Publicar anuncios en el foro del grupo | Consultar los anuncios del profesor |
| Transcripciones, afiches y cuestionarios del grupo | Transcripciones, afiches y cuestionarios propios y del grupo |
| Asistente de IA | Asistente de IA |

### Otros
- Registro e inicio de sesión con contraseñas cifradas (bcrypt).
- Landing page, barra lateral por rol y diálogos de confirmación para acciones destructivas.

## Tecnologías

**Frontend**
- Angular 19 (componentes standalone, SSR con `@angular/ssr`)
- TypeScript, SCSS
- Bootstrap 5, ng-bootstrap, Bootstrap Icons, Font Awesome
- jsPDF y file-saver para exportar afiches y resultados

**Backend**
- Node.js + Express 5 con TypeScript
- MongoDB con Mongoose
- API de OpenAI para transcripción y generación de contenido
- Multer para la carga de archivos de audio
- bcrypt, CORS, dotenv, uuid, fs-extra

## Arquitectura

```text
┌──────────────────────┐   HTTP/JSON    ┌──────────────────────┐
│  Angular 19 (SPA)    │ ─────────────▶ │  API Express (Node)  │
│  Estudiante/Profesor │ ◀───────────── │  Multer · bcrypt     │
└──────────────────────┘                └──────────┬───────────┘
                                                   │
                                  ┌────────────────┼────────────────┐
                                  ▼                                 ▼
                          ┌──────────────┐                 ┌────────────────┐
                          │   MongoDB    │                 │   OpenAI API   │
                          │  (Mongoose)  │                 │ transcripción  │
                          │ usuarios,    │                 │ resúmenes,     │
                          │ grupos, etc. │                 │ cuestionarios  │
                          └──────────────┘                 └────────────────┘
```

1. El usuario sube un audio MP3 desde el frontend.
2. El backend lo recibe con Multer y lo envía a la API de OpenAI para transcribirlo.
3. La transcripción se guarda en MongoDB, asociada al usuario o al grupo.
4. A partir de esa transcripción, el backend pide a la IA resúmenes, afiches, glosarios o cuestionarios en formato estructurado, y el frontend los muestra y permite exportarlos.

## Estructura del proyecto

```text
SAYA/
├── BackEnd/                    # API REST (Express + TypeScript)
│   ├── src/                    # Código fuente (punto de entrada: src/index.ts)
│   ├── nodemon.json            # Recarga en caliente con ts-node-dev
│   └── package.json
└── FrontEnd/
    └── SAYA/                   # Aplicación Angular 19
        └── src/app/
            ├── pages/          # Vistas: login, registro, transcripción, grupos,
            │                   # afiches, cuestionarios, foro, sala de estudio, IA…
            └── shared/         # Sidebars por rol, modales y diálogos de confirmación
```

## Instalación y ejecución

### Requisitos
- Node.js 18 o superior
- MongoDB (local o Atlas)
- Una API key de OpenAI

### 1. Clonar el repositorio
```bash
git clone https://github.com/emily2304/SAYA.git
cd SAYA
```

### 2. Backend
```bash
cd BackEnd
npm install
```

Crea un archivo `.env` en `BackEnd/` (ajusta los nombres a los que usa `src/index.ts`):
```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/saya
OPENAI_API_KEY=tu_api_key
```

Inicia el servidor en modo desarrollo:
```bash
npm run dev
```

### 3. Frontend
```bash
cd FrontEnd/SAYA
npm install
npm start
```

Abre `http://localhost:4200` en el navegador.

## Lo que aprendí

- Integrar servicios de IA (OpenAI) en un flujo real: audio → texto → contenido estructurado.
- Diseñar prompts que devuelvan JSON utilizable (cuestionarios con opciones y respuesta correcta, afiches con conceptos clave).
- Manejar carga de archivos en el backend con Multer.
- Modelar datos con roles, grupos y contenido compartido en MongoDB.
- Construir una SPA en Angular con vistas diferenciadas por rol y exportación de documentos a PDF.

## Desarrollado por

[GitHub @emily2304](https://github.com/emily2304)
<!-- Agrega tu LinkedIn o portafolio: [LinkedIn](https://www.linkedin.com/in/tu-usuario) -->
