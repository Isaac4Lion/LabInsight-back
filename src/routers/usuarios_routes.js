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

router.put('/usuario/actualizarpassword',actualizarPassword)
router.get("/usuario/:id", detalleUsuario);
router.put("/usuario/:id", actualizarEmail);
router.put("/usuario/:id", eliminarUsuario);

export default router