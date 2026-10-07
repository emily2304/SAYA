import { Types } from "mongoose";
import Archivo from "../models/archivos.model"

export const getArchivos = () => Archivo.find();
export const getArchivoById = async (id: string) => {
  try {
    return await Archivo.findById(id);
  } catch (error) {
    return null;
  }
};
export const createArchivo = (data: any) => Archivo.create(data);
export const updateArchivo = (id: string, data: any) => Archivo.findByIdAndUpdate(id, data, { new: true });
export const deleteArchivo = (id: string) => Archivo.findByIdAndDelete(id);
export const getArchivosByGrupo = (grupoId: string) =>
    Archivo.find({ grupo: grupoId });
export const getArchivosByGrupoAndCreador = (grupoId: string, usuarioId: string) =>
    Archivo.find({ grupo: grupoId, subido_por: usuarioId });
export const getArchivosbyCreador = (usuarioId: string) =>
    Archivo.find({ subido_por: usuarioId });


export interface SubidaArchivo {
    filename: string;
    contentType: string;
    data: Buffer;
    grupoId: string;
    usuarioId: string;
  }
  
  /**
   * Guarda un MP3 como documento en la colección "Archivo"
   */
  export const guardarArchivo = async (payload: SubidaArchivo) => {
    const { filename, contentType, data, grupoId, usuarioId } = payload;
    const nuevo = await Archivo.create({
      filename,
      subido_por: new Types.ObjectId(usuarioId),
      contentType,
      data,
      grupo: new Types.ObjectId(grupoId)
      
    });
    return nuevo;
  };