import { Request, RequestHandler, Response } from 'express';
import * as cuestionarioService from '../services/cuestionario.service';

export const getAll = async (req: Request, res: Response) => {
  const usuarios = await cuestionarioService.getCuestionarios();
  res.json(usuarios);
};

export const getOne = async (req: Request, res: Response) => {
  const usuario = await cuestionarioService.getCuestionarioById(req.params.id);
  usuario ? res.json(usuario) : res.status(404).json({ message: 'No encontrado' });
};

export const create = async (req: Request, res: Response) => {
  const nuevo = await cuestionarioService.createCuestionario(req.body);
  res.status(201).json(nuevo);
};

export const update: RequestHandler = async (req, res, next) => {
  try {
    const actualizado = await cuestionarioService.updateCuestionario(req.params.id, req.body);
    if (!actualizado) {
      res.status(404).json({ message: 'No encontrado' });
      return;
    }
    res.json(actualizado);
    return;
  } catch (err: any) {
    next(err);
  }
};

export const remove = async (req: Request, res: Response) => {
  const eliminado = await cuestionarioService.deleteCuestionario(req.params.id);
  eliminado ? res.json({ message: 'Eliminado' }) : res.status(404).json({ message: 'No encontrado' });
};

//falta getAllByEstudianteYGrupo
export const getByGrupo = async (req: Request, res: Response) => {
  const cuestionarios = await cuestionarioService.getCuestionariosByGrupo(req.params.grupoId);
  res.json(cuestionarios);
};

export const getByCreador = async (req: Request, res: Response) => {
  const cuestionarios = await cuestionarioService.getCuestionariosByCreador(req.params.usuarioId);
  res.json(cuestionarios);
};

export const getByGrupoAndCreador = async (req: Request, res: Response) => {
  const { grupoId, usuarioId } = req.params;
  const cuestionarios = await cuestionarioService.getCuestionariosByGrupoAndCreador(grupoId, usuarioId);
  res.json(cuestionarios);
};