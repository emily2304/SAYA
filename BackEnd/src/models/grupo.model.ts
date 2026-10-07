import mongoose, { Schema } from 'mongoose';

const grupoSchema = new Schema({
  nombre: String,
  descripcion: String,
  urlImagen: String,
  miembros: [{ type: Schema.Types.ObjectId, ref: 'Usuario' }],
  administradores: [{ type: Schema.Types.ObjectId, ref: 'Usuario' }],
  afiches: [{ type: Schema.Types.ObjectId, ref: 'Afiche' }],
  foros: [{ type: Schema.Types.ObjectId, ref: 'Foro' }],
  archivos: [{ type: Schema.Types.ObjectId, ref: 'Archivo' }],
  transcripciones: [{ type: Schema.Types.ObjectId, ref: 'Transcripcion' }]
});

export default mongoose.model('Grupo', grupoSchema,'Grupos');