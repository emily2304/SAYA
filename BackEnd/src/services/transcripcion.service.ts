import { Types } from 'mongoose';
import Transcripcion from '../models/transcripcion.model';

export const getTranscripciones = () => Transcripcion.find();
export const getTranscripcionById = (id: string) => Transcripcion.findById(id);
export const createTranscripcion = (data: any) => Transcripcion.create(data);
export const updateTranscripcion = async (id: string, data: any) => {
  return await Transcripcion.findByIdAndUpdate(id, data, { new: true }).exec();
};
export const deleteTranscripcion = (id: string) => Transcripcion.findByIdAndDelete(id);
export const getTranscripcionesByGrupo = (grupoId: string) =>
    Transcripcion.find({ grupo: new Types.ObjectId(grupoId) }); 
export const getTranscripcionesByGrupoAndCreador = (grupoId: string, usuarioId: string) =>
    Transcripcion.find({ grupo: new Types.ObjectId(grupoId), subido_por: usuarioId });
export const getTranscripcionesByCreador = (usuarioId: string) =>
    Transcripcion.find({ subido_por: usuarioId });