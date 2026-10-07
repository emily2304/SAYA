import { Types } from 'mongoose';
import { UsuarioModel, IUsuario } from '../models/user.model';

export const getUsuarios = async (): Promise<IUsuario[]> => {
  return UsuarioModel.find().exec();
};

export const getUsuarioById = async (id: string): Promise<IUsuario | null> => {
  return UsuarioModel.findById(id).exec();
};

export const getUsuariosByGroup = async (grupoId: string): Promise<IUsuario[]> => {
  const objectId = new Types.ObjectId(grupoId);
  return UsuarioModel.find({ grupos: { $in: [objectId] } }).exec();
};

export const getUsuarioByIdAndGroup = async (id: string, grupoId: string): Promise<IUsuario | null> => {
  const objectId = new Types.ObjectId(grupoId);
  return UsuarioModel.findOne({ _id: id, grupos: { $in: [objectId] } }).exec();
};

export const getUsuarioByEmail = async (email: string): Promise<IUsuario | null> => {
  return UsuarioModel.findOne({ email: email}).exec();
};


export const getUsuarioLogin = async (email: string, password: string): Promise<IUsuario | null> => {
  // Busca directamente por email y contraseña
  return await UsuarioModel.findOne({ email, password }).exec();
};

export const createUsuario = async (data: Partial<IUsuario>): Promise<IUsuario> => {
  return UsuarioModel.create(data);
};

export const updateUsuario = async (id: string, data: Partial<IUsuario>): Promise<IUsuario | null> => {
  return UsuarioModel.findByIdAndUpdate(id, data, { new: true }).exec();
};

export const deleteUsuario = async (id: string): Promise<IUsuario | null> => {
  return UsuarioModel.findByIdAndDelete(id).exec();
};