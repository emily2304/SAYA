import { Router } from 'express';
import * as UsuarioController from '../controllers/user.controller';

const router = Router();

router.get('/', UsuarioController.getAll);
router.post('/login', UsuarioController.login);
router.get('/:id', UsuarioController.getOne);
router.get('/groups/:id', UsuarioController.getAllByGroup);
router.get('/group/:id', UsuarioController.getOneByGroup);
router.post('/email', UsuarioController.getOneByEmail);
router.post('/', UsuarioController.create);
router.put('/:id', UsuarioController.update);
router.delete('/:id', UsuarioController.remove);

export default router;