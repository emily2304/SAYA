import { Types } from 'mongoose';
import Afiche from '../models/afiche.model';

export const getAfiches = () => Afiche.find();
export const getAficheById = (id: string) => Afiche.findById(id);
export const createAfiche = (data: any) => Afiche.create(data);
export const updateAfiche = (id: string, data: any) => Afiche.findByIdAndUpdate(id, data, { new: true });
export const deleteAfiche = (id: string) => Afiche.findByIdAndDelete(id);
export const getAfichesByGrupo = (grupoId: string) =>
    Afiche.find({ grupo: new Types.ObjectId(grupoId) });
export const getAfichesByCreador = (usuarioId: string) =>
    Afiche.find({ id_creador: new Types.ObjectId(usuarioId) });
export const getAfichesByGrupoAndCreador = (grupoId: string, usuarioId: string) =>
    Afiche.find({ grupo: new Types.ObjectId(grupoId), id_creador: usuarioId });