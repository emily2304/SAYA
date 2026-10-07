import { Types } from 'mongoose';
import Foro from '../models/foro.model';

export const getForos = () => Foro.find();
export const getForoById = (id: string) => Foro.findById(id);
export const createForo = (data: any) => Foro.create(data);
export const updateForo = (id: string, data: any) => Foro.findByIdAndUpdate(id, data, { new: true });
export const deleteForo = (id: string) => Foro.findByIdAndDelete(id);
export const getForosByGrupo = (grupoId: string) =>
    Foro.find({ idGrupo: grupoId });
  
export const getMensajesDeUnForo = (foroId: string) =>
  Foro.findOne({ _id: foroId })
       .select('mensajes')
       .lean()       // opcional: devuelve un JS object en vez de documento Mongoose
       .exec();

export async function agregarMensaje(
  foroId: string,
  emisorId: string,
  contenido: string
) {
  const mensaje = {
    id_emisor: new Types.ObjectId(emisorId),
    contenido,
    fecha: new Date()
  };

  // Inserta el nuevo mensaje al final del array
  return Foro.updateOne(
    { _id: new Types.ObjectId(foroId) },
    { $push: { mensajes: mensaje } }
  ).exec();
}