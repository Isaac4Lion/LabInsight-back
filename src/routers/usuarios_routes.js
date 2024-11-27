import {Router} from 'express'
const router = Router()
import {
    login,
    registro,
    actualizarPassword,
    listarUsuarios,
    detalleUsuario,
    actualizarEmail,
    eliminarUsuario,
} from "../controllers/usuarios_controller.js";

router.post("/login", login);
router.post("/registro", registro);
router.get("/usuarios", listarUsuarios);

router.put('/usuario/actualizar-password',actualizarPassword)
router.put("/usuario/actualizar-email/:id", actualizarEmail);
router.get("/usuario/:id", detalleUsuario);
router.put("/usuario/:id", eliminarUsuario);

export default router