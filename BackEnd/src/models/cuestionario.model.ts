import mongoose, { Schema } from 'mongoose';

const cuestionarioSchema = new Schema({
  txt: String,
  idUsuarioSolicitante: { type: Schema.Types.ObjectId, ref: 'Usuario' },
  respuestas: String,
  resultado: Number,
  grupo: { type: Schema.Types.ObjectId, ref: 'Grupo' }
});

export default mongoose.model('Cuestionario', cuestionarioSchema,'Cuestionarios');