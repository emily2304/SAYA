import express from 'express';
import * as archivoController from '../controllers/archivo.controller';
import { subirMp3 } from '../controllers/archivo.controller';
import { uploadMp3 } from '../middlewares/upload.middleware';

const router = express.Router();

router.get('/', archivoController.getAll);
router.get('/:id', archivoController.getOne);
router.post('/', archivoController.create);
router.put('/:id', archivoController.update);
router.delete('/:id', archivoController.remove);
router.get('/grupo/:grupoId',       archivoController.getByGrupo);
router.get('/grupo/:grupoId/user/:usuarioId', archivoController.getByGrupoAndCreador);
router.get('/user/:usuarioId', archivoController.getByCreador);
router.post('/mp3', uploadMp3.single('archivo'), subirMp3);

export default router;