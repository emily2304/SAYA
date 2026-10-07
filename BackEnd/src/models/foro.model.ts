import mongoose, { Schema } from 'mongoose';

const foroSchema = new Schema({
  idGrupo: { type: Schema.Types.ObjectId, ref: 'Grupo' },
  mensajes: [
    {
      id_emisor: { type: Schema.Types.ObjectId, ref: 'Usuario' },
      contenido: String,
      fecha: Date
    }
  ]
});

export default mongoose.model('Foro', foroSchema,'Foro');