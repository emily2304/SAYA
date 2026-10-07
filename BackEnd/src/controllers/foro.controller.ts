import { NextFunction, Request, RequestHandler, Response } from 'express';
import * as foroService from '../services/foro.service';

export const getAll = async (req: Request, res: Response) => {
  const usuarios = await foroService.getForos();
  res.json(usuarios);
};

export const getOne = async (req: Request, res: Response) => {
  const usuario = await foroService.getForoById(req.params.id);
  usuario ? res.json(usuario) : res.status(404).json({ message: 'No encontrado' });
};

export const create = async (req: Request, res: Response) => {
  const nuevo = await foroService.createForo(req.body);
  res.status(201).json(nuevo);
};

export const update = async (req: Request, res: Response) => {
  const actualizado = await foroService.updateForo(req.params.id, req.body);
  actualizado ? res.json(actualizado) : res.status(404).json({ message: 'No encontrado' });
};

export const remove = async (req: Request, res: Response) => {
  const eliminado = await foroService.deleteForo(req.params.id);
  eliminado ? res.json({ message: 'Eliminado' }) : res.status(404).json({ message: 'No encontrado' });
};

export const getByGrupo = async (req: Request, res: Response) => {
  const { grupoId } = req.params;
  try {
    const foros = await foroService.getForosByGrupo(grupoId);
    res.json(foros);
  } catch (err: any) {
    res.status(500).json({ message: 'Error al obtener foros por grupo', error: err.message });
  }
};

export const getMensajes = async (
  req: Request<{ foroId: string }>,
  res: Response,
  next: NextFunction
): Promise<void> => {                // devuelve Promise<void>, no Promise<Response>
  try {
    const { foroId } = req.params;
    const foro = await foroService.getMensajesDeUnForo(foroId);
    if (!foro) {
      res.status(404).json({ message: 'Foro no encontrado' });
      return;
    }
    res.json(foro.mensajes);        // envía la respuesta…
    return;                         // …luego terminas la función sin devolver res
  } catch (err) {
    next(err);                      // propaga el error
  }
};

export const postMensaje: RequestHandler = async (req, res, next) => {
  const { foroId } = req.params;
  const { emisorId, contenido } = req.body;

  try {
    await foroService.agregarMensaje(foroId, emisorId, contenido);
    res.status(201).json({ ok: true });

  } catch (err) {
    next(err);
  }
};