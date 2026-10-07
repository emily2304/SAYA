import { NextFunction, Request, RequestHandler, Response } from 'express';
import * as grupoService from '../services/grupo.service';


export const getAll = async (req: Request, res: Response) => {
  const usuarios = await grupoService.getGrupos();
  res.json(usuarios);
};

export const getOne = async (req: Request, res: Response) => {
  const usuario = await grupoService.getGrupoById(req.params.id);
  usuario ? res.json(usuario) : res.status(404).json({ message: 'No encontrado' });
};

export const create = async (req: Request, res: Response) => {
  const nuevo = await grupoService.createGrupo(req.body);
  res.status(201).json(nuevo);
};

export const update = async (req: Request, res: Response) => {
  const actualizado = await grupoService.updateGrupo(req.params.id, req.body);
  actualizado ? res.json(actualizado) : res.status(404).json({ message: 'No encontrado' });
};
//borra el grupo y lo relacionado a el, menos los usuarios

export const deleteGrupoCascade = async (
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;                // ① Extrae el string
  try {
    await grupoService.deleteGrupoCascade(id);
    res.status(200).json({ message: 'Grupo y dependencias eliminados' });
  } catch (err: any) {
    next(err);
  }
};


  export const getPorUsuario = async (req: Request, res: Response) => {
    try {
      const grupos = await grupoService.getGruposPorUsuario(req.params.identificador);
      res.json(grupos);
    } catch (err: any) {
      res.status(404).json({ message: err.message });
    }
  };

export const añadirAdministrador: RequestHandler = async (req, res, next) => {
  const { grupoId } = req.body;
  const { usuarioId } = req.body;
  if (!usuarioId) {
    res.status(400).json({ error: 'usuarioId es requerido' });
    return;
  }
  try {
    await grupoService.agregarAdministrador(grupoId, usuarioId);
    await grupoService.agregarGrupoAUsuario(usuarioId, grupoId);
    res.json({ ok: true, message: 'Administrador agregado' });
  } catch (err) {
    next(err);
  }
};

export const añadirMiembro: RequestHandler = async (req, res, next) => {
  const { grupoId } = req.body;
  const { usuarioId } = req.body;
  if (!usuarioId) {
    res.status(400).json({ error: 'usuarioId es requerido' });
    return;
  }
  try {
    await grupoService.agregarMiembro(grupoId, usuarioId);
    await grupoService.agregarGrupoAUsuario(usuarioId, grupoId);
    res.json({ ok: true, message: 'Miembro agregado' });
  } catch (err) {
    next(err);
  }
};