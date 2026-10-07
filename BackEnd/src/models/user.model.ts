import { Schema, model, Document } from 'mongoose';

export interface IUsuario extends Document {
  nombre: string;
  email: string;
  password: string;
  rol: 'alumno' | 'profe';
  grupos: string[];
  afiches: string[];
  transcripciones: string[];
  cuestionarios: string[];
}

const usuarioSchema = new Schema<IUsuario>({
  nombre: { type: String, required: true },
  email: { type: String, required: true },
  password: {type: String, required:true},
  rol: { type: String, enum: ['alumno', 'profe'], required: true },
  grupos: [{ type: Schema.Types.ObjectId, ref: 'Grupo' }],
  afiches: [{ type: Schema.Types.ObjectId, ref: 'Afiche' }],
  transcripciones: [{ type: Schema.Types.ObjectId, ref: 'Transcripcion' }],
  cuestionarios: [{ type: Schema.Types.ObjectId, ref: 'Cuestionario' }],
});

export const UsuarioModel = model<IUsuario>('Usuario', usuarioSchema, 'Usuarios');