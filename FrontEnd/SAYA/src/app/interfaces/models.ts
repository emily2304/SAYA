export interface User {
    _id: string;
    nombre: string;
    email: string;
    rol: 'alumno' | 'profe';
    grupos: string[];           // IDs de Grupo
    afiches: string[];         // IDs de Afiche
    transcripciones: string[]; // IDs de Transcripcion
    cuestionarios: string[];    // IDs de Cuestionario
}

export interface Grupo {
  _id: string;
  nombre: string;
  descripcion: string;
  urlImagen?: string;
  miembros: string[];        // IDs de Usuario
  administradores: string[]; // IDs de Usuario
  afiches: string[];         // IDs de Afiche
  foros: string[];           // IDs de Foro
  archivos: string[];        // IDs de Archivo
  transcripciones: string[]; // IDs de Transcripcion
}

export interface Cuestionario {
  _id: string;
  txt: string;
  idUsuarioSolicitante: string; // ID de Usuario
  respuestas: string;           // JSON/string
  resultado: number;
  grupo: string;                // ID de Grupo
}

export interface Mensaje {
  autor: string;  // ID de Usuario
  texto: string;
  fecha: Date;
}

export interface Foro {
  _id: string;
  idGrupo: string;    // ID de Grupo
  mensajes: Mensaje[];
}

export interface Afiche {
  _id: string;
  titulo: string;
  resumen: string;
  conceptos_clave: string[];
  id_creador: string;       // ID de Usuario
  id_archivo_fuente: string; // ID de Archivo
  grupo: string;            // ID de Grupo
}

export interface Transcripcion {
  _id: string;
  titulo: string;
  contenido: string;
  idArchivoFuente: string; // ID de Archivo
  idCreador: string;       // ID de Usuario
}
export interface Transcription {
  _id: string;
  nombreArchivo: string;
  transcripcion: string;
  subido_por: string;
  grupo: string;
  fecha: Date;
}

export interface Archivo {
  _id: string;
  filename: string;
  contentType: string;
  data: string;        // Base64 o URL remota
  grupo: string;       // ID de Grupo
  usuarioId: string;  // ID de Usuario
}
