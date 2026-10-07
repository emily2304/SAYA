import mongoose, { Schema } from 'mongoose';

const aficheSchema = new Schema({
  titulo: String,
  resumen: String,
  conceptos_clave: [String],
  id_creador: { type: Schema.Types.ObjectId, ref: 'Usuario' },
  id_archivo_fuente: { type: Schema.Types.ObjectId, ref: 'Archivo' },
  grupo: [{ type: Schema.Types.ObjectId, ref: 'Grupo' }]
});

export default mongoose.model('Afiche', aficheSchema,'Afiches');