import express from 'express';
import * as grupoController from '../controllers/grupo.controller';

const router = express.Router();

router.get('/', grupoController.getAll);
router.get('/:id', grupoController.getOne);
router.post('/', grupoController.create);
router.post('/admin', grupoController.añadirAdministrador);
router.post('/miembro', grupoController.añadirMiembro);
router.put('/:id', grupoController.update);
router.delete('/:id', grupoController.deleteGrupoCascade);
router.get('/por-usuario/:identificador', grupoController.getPorUsuario);

export default router;