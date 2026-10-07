import { Request, Response } from 'express';
import * as aficheService from '../services/afiche.service';

export const getAll = async (req: Request, res: Response) => {
  const usuarios = await aficheService.getAfiches();
  res.json(usuarios);
};

export const getOne = async (req: Request, res: Response) => {
  const usuario = await aficheService.getAficheById(req.params.id);
  usuario ? res.json(usuario) : res.status(404).json({ message: 'No encontrado' });
};

export const create = async (req: Request, res: Response) => {
  const nuevo = await aficheService.createAfiche(req.body);
  res.status(201).json(nuevo);
};

export const update = async (req: Request, res: Response) => {
  const actualizado = await aficheService.updateAfiche(req.params.id, req.body);
  actualizado ? res.json(actualizado) : res.status(404).json({ message: 'No encontrado' });
};

export const remove = async (req: Request, res: Response) => {
  const eliminado = await aficheService.deleteAfiche(req.params.id);
  eliminado ? res.json({ message: 'Eliminado' }) : res.status(404).json({ message: 'No encontrado' });
};

//getByProfesorYCurso y getByEstudianteYGrupo
export const getByGrupo = async (req: Request, res: Response) => {
  console.log('Grupo ID recibido:', req.params.grupoId); // 🔍 debug
  const afiches = await aficheService.getAfichesByGrupo(req.params.grupoId);
  res.json(afiches);
};

export const getByCreador = async (req: Request, res: Response) => {
  console.log('Usuario ID recibido:', req.params.usuarioId); // 🔍 debug
  const afiches = await aficheService.getAfichesByCreador(req.params.usuarioId);
  res.json(afiches);
};

export const getByGrupoAndCreador = async (req: Request, res: Response) => {
  const { grupoId, usuarioId } = req.params;
  const afiches = await aficheService.getAfichesByGrupoAndCreador(grupoId, usuarioId);
  res.json(afiches);
};