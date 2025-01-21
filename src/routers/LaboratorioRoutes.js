import express from 'express';
import {
  crearLaboratorio,
  listarLaboratorios,
  actualizarLaboratorio,
  eliminarLaboratorio,
  obtenerLaboratorio,
} from '../controllers/ControladorLaboratorio.js';
import { verificarAdministrador } from '../middlewares/VerificarRol.js';
import { verificarToken } from '../middlewares/VerificarToken.js';

const router = express.Router();

router.use(verificarToken);
router.get('/', listarLaboratorios);

router.use(verificarAdministrador);
router.post('/', crearLaboratorio);
router.get('/:id', obtenerLaboratorio);
router.put('/:id', actualizarLaboratorio);
router.delete('/:id', eliminarLaboratorio);

export default router;

