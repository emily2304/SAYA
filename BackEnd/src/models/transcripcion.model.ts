import mongoose, { Schema } from 'mongoose';

const transcripcionSchema = new Schema({
  nombreArchivo: { type: String, required: true },
  transcripcion: { type: String, required: true },
  subido_por: { type: Schema.Types.ObjectId, ref: 'Usuario', required: true },
  grupo: { type: Schema.Types.ObjectId, ref: 'Grupo', required: true },
  fecha: { type: Date, default: Date.now },
});

export default mongoose.model('Transcripcion', transcripcionSchema,'Transcripcion');