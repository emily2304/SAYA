import mongoose, { Schema } from 'mongoose';

const archivoSchema = new Schema({
  filename: String,
  contentType: String,
  data: Buffer,
  grupo: { type: Schema.Types.ObjectId, ref: 'Grupo' },
  subido_por: { type: Schema.Types.ObjectId, ref: 'Usuario' }
});

export default mongoose.model('Archivo', archivoSchema,'Archivo');