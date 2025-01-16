import express from 'express';
import { login, solicitarCambioPassword, cambiarPassword, obtenerUsuarios } from '../controllers/ControladorUsuario.js';
import { verificarAdministrador } from '../middlewares/VerificarRol.js';
import { verificarToken } from '../middlewares/VerificarToken.js';

const router = express.Router();




router.post('/login', login);
router.post('/solicitar-cambio-password', solicitarCambioPassword); 
router.post('/cambiar-password', cambiarPassword);

router.get('/', verificarToken, verificarAdministrador, obtenerUsuarios);
export default router;
