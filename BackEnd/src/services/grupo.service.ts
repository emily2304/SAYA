import Grupo from '../models/grupo.model';
import mongoose, { Types } from 'mongoose';
import { UsuarioModel, IUsuario } from '../models/user.model';
import  Foro  from '../models/foro.model';
import  Archivo  from '../models/archivos.model';
import  Afiche  from '../models/afiche.model';
import  Cuestionario from '../models/cuestionario.model';
import  Transcripcion from '../models/transcripcion.model';

export const getGrupos = () => Grupo.find();
export const getGrupoById = (id: string) => Grupo.findById(id);
export const createGrupo = (data: any) => Grupo.create(data);
export const updateGrupo = (id: string, data: any) => Grupo.findByIdAndUpdate(id, data, { new: true });
export const deleteGrupo = (id: string) => Grupo.findByIdAndDelete(id);


/**
 * Resuelve el usuario por _id o por nombre.
 */
async function resolveUsuario(identificador: string): Promise<IUsuario> {
  // Si es un ObjectId
  if (Types.ObjectId.isValid(identificador)) {
    const usuario = await UsuarioModel.findById(identificador);
    if (!usuario) throw new Error('Usuario no encontrado');
    return usuario;
  }
  // Sino, buscar por nombre
  const usuario = await UsuarioModel.findOne({ nombre: identificador });
  if (!usuario) throw new Error(`Usuario "${identificador}" no encontrado`);
  return usuario;
}

/**
 * Obtiene todos los grupos en los que el usuario participa,
 * ya sea porque está en su array `grupos` (miembro) o porque
 * el grupo lo lista en `administradores`.
 */
export const getGruposPorUsuario = async (usuarioId: string) => {
  const objectId = new Types.ObjectId(usuarioId);

  return Grupo.find({
    $or: [
      { administradores: objectId },
      { miembros: objectId }
    ]
  }).exec();
};

export async function agregarMiembro(grupoId: string, usuarioId: string) {
  const objetoIdUsuario = new Types.ObjectId(usuarioId);
  return Grupo.updateOne(
    { _id: new Types.ObjectId(grupoId) },
    { $addToSet: { miembros: objetoIdUsuario } }
  ).exec();
}

export async function agregarAdministrador(grupoId: string, usuarioId: string) {
  return Grupo.updateOne(
    { _id: new Types.ObjectId(grupoId) },
    { $addToSet: { administradores: new Types.ObjectId(usuarioId) } }
  ).exec();
}

export async function agregarGrupoAUsuario(usuarioId: string, grupoId: string) {
  const oidUsuario = new Types.ObjectId(usuarioId);
  const oidGrupo   = new Types.ObjectId(grupoId);

  // Añade el grupo al array "grupos" del Usuario
  await UsuarioModel.updateOne(
    { _id: oidUsuario },
    { $addToSet: { grupos: oidGrupo } }       // no duplica :contentReference[oaicite:1]{index=1}
  ).exec();
}

export const deleteGrupoCascade = async (grupoId: string) => {
  const session = await mongoose.startSession();
  const oid = new Types.ObjectId(grupoId);  // ✅ convertir a ObjectId

  try {
    session.startTransaction();

    // 1. Eliminar foros referenciando idGrupo
    await Foro.deleteMany({ idGrupo: oid }).session(session);

    // 2. Eliminar archivos por grupo
    await Archivo.deleteMany({ grupo: oid }).session(session);

    // 3. Eliminar afiches por grupo
    await Afiche.deleteMany({ grupo: { $in: [oid] } }).session(session);

    // 4. Eliminar cuestionarios por grupo
    await Cuestionario.deleteMany({ grupo: oid }).session(session);

    // 5. (Opcional) Transcripciones relacionadas
    await Transcripcion.deleteMany({
      idCreador: { $in: [] }  // ajusta si hace falta
    }).session(session);

    // 6. Eliminar el propio grupo
    await Grupo.findByIdAndDelete(oid).session(session);

    await session.commitTransaction();
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
};