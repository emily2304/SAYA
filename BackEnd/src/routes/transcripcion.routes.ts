import express from 'express';
import { Request, Response, NextFunction } from 'express';
import * as transcripcionController from '../controllers/transcripcion.controller';
import { transcribirDesdeMongo } from '../whisper';

const router = express.Router();

router.get('/', transcripcionController.getAll);
router.get('/:id', transcripcionController.getOne);
router.put('/:id', transcripcionController.update);
router.delete('/:id', transcripcionController.remove);
router.get('/grupo/:grupoId',       transcripcionController.getByGrupo);
router.get('/grupo/:grupoId/user/:usuarioId', transcripcionController.getByGrupoAndCreador);
router.get('/user/:usuarioId', transcripcionController.getByCreador);

router.post(
    '/transcribir/:id',
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const transcripcion = await transcribirDesdeMongo(req.params.id);
        res.json({ ok: true, transcripcion });
      } catch (err: any) {
        console.error(err);
        // Propaga el error al middleware de manejo de errores
        next(err);
      }
    }
  );

export default router;