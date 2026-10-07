import express from 'express';
import * as AficheController from '../controllers/afiche.controller';

const router = express.Router();

router.get('/', AficheController.getAll);
router.get('/:id', AficheController.getOne);
router.put('/:id', AficheController.update);
router.delete('/:id', AficheController.remove);
router.get('/grupo/:grupoId', AficheController.getByGrupo);
router.get('/user/:usuarioId', AficheController.getByCreador);
router.get('/grupo/:grupoId/user/:usuarioId', AficheController.getByGrupoAndCreador);

export default router;