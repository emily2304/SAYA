import express from 'express';
import * as cuestionarioController from '../controllers/cuestionario.controller';

const router = express.Router();

router.get('/', cuestionarioController.getAll);
router.get('/:id', cuestionarioController.getOne);
router.get('/grupo/:grupoId', cuestionarioController.getByGrupo);
router.get('/user/:usuarioId', cuestionarioController.getByCreador);
router.get('/grupo/:grupoId/user/:usuarioId', cuestionarioController.getByGrupoAndCreador);
router.put('/:id', cuestionarioController.update);
router.delete('/:id', cuestionarioController.remove);


export default router;