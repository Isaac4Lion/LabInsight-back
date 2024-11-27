import {Router} from 'express'
import { listarSolicitudes, solicitarSoporte } from '../controllers/solicitudes_controller.js';
const router = Router()

router.post("/solicitud", solicitarSoporte);
router.get("/solicitudes", listarSolicitudes);


export default router