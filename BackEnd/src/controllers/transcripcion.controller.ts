import { Request, Response } from 'express';
import * as transcripcionService from '../services/transcripcion.service';

export const getAll = async (req: Request, res: Response) => {
  const usuarios = await transcripcionService.getTranscripciones();
  res.json(usuarios);
};

export const getOne = async (req: Request, res: Response) => {
  const usuario = await transcripcionService.getTranscripcionById(req.params.id);
  usuario ? res.json(usuario) : res.status(404).json({ message: 'No encontrado' });
};

export const create = async (req: Request, res: Response) => {
  const nuevo = await transcripcionService.createTranscripcion(req.body);
  res.status(201).json(nuevo);
};

export const update = async (req: Request, res: Response) => {
  const actualizado = await transcripcionService.updateTranscripcion(req.params.id, req.body);
  actualizado ? res.json(actualizado) : res.status(404).json({ message: 'No encontrado' });
};

export const remove = async (req: Request, res: Response) => {
  const eliminado = await transcripcionService.deleteTranscripcion(req.params.id);
  eliminado ? res.json({ message: 'Eliminado' }) : res.status(404).json({ message: 'No encontrado' });
};

//falta getByProfeYGrupo, getByEstudianteYGrupo
export const getByGrupo = async (req: Request, res: Response) => {
  const transcripciones = await transcripcionService.getTranscripcionesByGrupo(req.params.grupoId);
  res.json(transcripciones);
};

export const getByGrupoAndCreador = async (req: Request, res: Response) => {
  const { grupoId, usuarioId } = req.params;
  const transcripciones = await transcripcionService.getTranscripcionesByGrupoAndCreador(grupoId, usuarioId);
  res.json(transcripciones);
};

export const getByCreador = async (req: Request, res: Response) => {
  const { usuarioId } = req.params;
  const transcripciones = await transcripcionService.getTranscripcionesByCreador(usuarioId);
  res.json(transcripciones);
};