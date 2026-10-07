import express from 'express';
import * as foroController from '../controllers/foro.controller';

const router = express.Router();

router.get('/', foroController.getAll);
router.get('/msgs/:foroId', foroController.getMensajes);
router.get('/grupo/:grupoId', foroController.getByGrupo);
router.post('/', foroController.create);
router.post('/msg/:foroId', foroController.postMensaje);
router.put('/:id', foroController.update);
router.delete('/:id', foroController.remove);
router.get('/:id', foroController.getOne);


export default router;