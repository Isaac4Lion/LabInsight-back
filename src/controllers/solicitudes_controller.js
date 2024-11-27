import Solicitudes from "../models/Solicitudes.js"

const solicitarSoporte = async (req,res) => {
    const {laboratorio, n_maquina} = req.body
    if (Object.values(req.body).includes("")){ return res.status(400).json({msg: "Complete todos los campos"})}
    const verificarMaquina = await Solicitudes.findOne({laboratorio, n_maquina})
    if(verificarMaquina) return res.status(400).json({msg:"Lo sentimos, esa maquina ya se encuentra en espera."})
    const nuevaSolicitud = new Solicitudes(req.body)
    await nuevaSolicitud.save()
    res.status(200).json({nuevaSolicitud})
}
const listarSolicitudes = async (req, res) => {
    const solicitudes = await Solicitudes.find().select("-createdAt -updatedAt -__v")
    res.status(200).json(solicitudes)
}

export {
    solicitarSoporte,
    listarSolicitudes
}