import { Request, Response, NextFunction  } from 'express';
import * as archivoService from '../services/archivo.service';

export const getAll = async (req: Request, res: Response) => {
  const usuarios = await archivoService.getArchivos();
  res.json(usuarios);
};

export const getOne = async (req: Request, res: Response) => {
  console.log('Buscando archivo con ID:', req.params.id); 
  const archivo = await archivoService.getArchivoById(req.params.id);
  if (archivo) {
    res.json(archivo);
  } else {
    console.log('Archivo no encontrado'); 
    res.status(404).json({ message: 'No encontrado' });
  }
};

export const create = async (req: Request, res: Response) => {
  const nuevo = await archivoService.createArchivo(req.body);
  res.status(201).json(nuevo);
};
/// no se
export const update = async (req: Request, res: Response) => {
  const actualizado = await archivoService.updateArchivo(req.params.id, req.body);
  actualizado ? res.json(actualizado) : res.status(404).json({ message: 'No encontrado' });
};

export const remove = async (req: Request, res: Response) => {
  const eliminado = await archivoService.deleteArchivo(req.params.id);
  eliminado ? res.json({ message: 'Eliminado' }) : res.status(404).json({ message: 'No encontrado' });
};
//getByProfesorYgrupo y getByEstudianteYGrupo
export const getByGrupo = async (req: Request, res: Response) => {
  const archivos = await archivoService.getArchivosByGrupo(req.params.grupoId);
  res.json(archivos);
};

export const getByGrupoAndCreador = async (req: Request, res: Response) => {
  const { grupoId, usuarioId } = req.params;
  const archivos = await archivoService.getArchivosByGrupoAndCreador(grupoId, usuarioId);
  res.json(archivos);
};

export const getByCreador = async (req: Request, res: Response) => {
  const { usuarioId } = req.params;
  const archivos = await archivoService.getArchivosbyCreador( usuarioId);
  res.json(archivos);
};

export const subirMp3 = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    if (!req.file) {
      res.status(400).json({ message: 'Archivo MP3 no proporcionado' });
      return; // cortamos flujo, pero no devolvemos Response
    }

    const { buffer, originalname, mimetype } = req.file;
    const { grupoId, usuarioId } = req.body;

    const archivo = await archivoService.guardarArchivo({
      filename: originalname,
      contentType: mimetype,
      data: buffer,
      grupoId,
      usuarioId,
    });

    res
      .status(201)
      .json({
        id: archivo._id,
        filename: archivo.filename,
        contentType: archivo.contentType,
        usuarioId: archivo.subido_por,
      });
    // no usamos `return res...`
  } catch (err) {
    next(err);
  }
};