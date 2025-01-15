import express from 'express';
import {
  crearLaboratorio,
  listarLaboratorios,
  actualizarLaboratorio,
  eliminarLaboratorio,
} from '../controllers/ControladorLaboratorio.js';
import { verificarAdministrador } from '../middlewares/VerificarRol.js';
import { verificarToken } from '../middlewares/VerificarToken.js';

const router = express.Router();

router.use(verificarToken);
router.get('/', listarLaboratorios);

router.use(verificarAdministrador);
router.post('/', crearLaboratorio);
router.put('/:id', actualizarLaboratorio);
router.delete('/:id', eliminarLaboratorio);

export default router;

