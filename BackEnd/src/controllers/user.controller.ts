import { Request, Response } from 'express';
import * as UsuarioService from '../services/user.service';

export const getAll = async (req: Request, res: Response) => {
  const usuarios = await UsuarioService.getUsuarios();
  res.json(usuarios);
};

export const getOne = async (req: Request, res: Response) => {
  const usuario = await UsuarioService.getUsuarioById(req.params.id);
  usuario ? res.json(usuario) : res.status(404).json({ message: 'No encontrado' });
};

export const create = async (req: Request, res: Response) => {
  const nuevo = await UsuarioService.createUsuario(req.body);
  res.status(201).json(nuevo);
};

export const update = async (req: Request, res: Response) => {
  const actualizado = await UsuarioService.updateUsuario(req.params.id, req.body);
  actualizado ? res.json(actualizado) : res.status(404).json({ message: 'No encontrado' });
};

export const remove = async (req: Request, res: Response) => {
  const eliminado = await UsuarioService.deleteUsuario(req.params.id);
  eliminado ? res.json({ message: 'Eliminado' }) : res.status(404).json({ message: 'No encontrado' });
};

export const getOneByGroup = async (req: Request, res: Response) => {
  const usuario = await UsuarioService.getUsuarioByIdAndGroup(req.params.id, req.body.grupos);
  usuario ? res.json(usuario) : res.status(404).json({ message: 'No encontrado' });
};

export const getOneByEmail = async (req: Request, res: Response) => {
  const usuario = await UsuarioService.getUsuarioByEmail(req.body.email);
  usuario ? res.json(usuario) : res.status(404).json({ message: 'No encontrado' });
};

export const getAllByGroup = async (req: Request, res: Response) => {
  const usuario = await UsuarioService.getUsuariosByGroup( req.params.id);
  usuario ? res.json(usuario) : res.status(404).json({ message: 'No encontrado' });
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const usuario = await UsuarioService.getUsuarioLogin(email, password);
  usuario ? res.json(usuario) : res.status(404).json({ message: 'No encontrado' });
};