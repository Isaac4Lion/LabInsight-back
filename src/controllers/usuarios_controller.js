import generarJWT from "../helpers/crearJWT.js"
import Usuarios from "../models/Usuarios.js"

const login = async(req,res)=>{
    const {email,password} = req.body
    if (Object.values(req.body).includes("")) return res.status(404).json({msg:"Lo sentimos, debes llenar todos los campos"})
    const usuariosBDD = await Usuarios.findOne({email}).select("-status -__v -updatedAt -createdAt")
    if(!usuariosBDD) return res.status(404).json({msg:"Lo sentimos, el usuario no se encuentra registrado"})
    const verificarPassword = await usuariosBDD.matchPassword(password)
    if(!verificarPassword) return res.status(404).json({msg:"Lo sentimos, el password no es el correcto"})
    const token = generarJWT(usuariosBDD._id,"usuario")
    const { _id } = usuariosBDD
    res.status(200).json({
        token,
        _id,
        email: usuariosBDD.email
    })
}
const registro = async (req,res)=>{
    const {email,password} = req.body
    if (Object.values(req.body).includes("")) return res.status(400).json({msg:"Lo sentimos, debes llenar todos los campos"})
    const verificarEmailBDD = await Usuarios.findOne({email})
    if(verificarEmailBDD) return res.status(400).json({msg:"Lo sentimos, el email ya se encuentra registrado"})
    const nuevoUsuario = new Usuarios(req.body)
    nuevoUsuario.password = await nuevoUsuario.encryptPassword(password)
    await nuevoUsuario.save()
    res.status(200).json({nuevoUsuario})
}
const listarUsuarios = async (req,res)=>{
    const usuarios = await Usuarios.find({estado:true}).select("-createdAt -updatedAt -__v")
    res.status(200).json(usuarios)
}
const detalleUsuario = async(req,res)=>{
    const {id} = req.params
    if( !mongoose.Types.ObjectId.isValid(id) ) return res.status(404).json({msg:`Lo sentimos, debe ser un id válido`});
    const usuarioBDD = await Usuarios.findById(id).select("-password")
    if(!usuarioBDD) return res.status(404).json({msg:`Lo sentimos, no existe el usuario ${id}`})
    res.status(200).json(usuarioBDD)
}
const actualizarEmail = async (req,res)=>{
    const {id} = req.params
    if( !mongoose.Types.ObjectId.isValid(id) ) return res.status(404).json({msg:`Lo sentimos, debe ser un id válido`});
    if (Object.values(req.body).includes("")) return res.status(400).json({msg:"Lo sentimos, debes llenar todos los campos"})
    const usuarioBDD = await Usuarios.findById(id)
    if(!usuarioBDD) return res.status(404).json({msg:`Lo sentimos, no existe el usuario ${id}`})
    if (usuarioBDD.email !=  req.body.email)
    {
        const usuarioBDDMail = await Usuarios.findOne({email:req.body.email})
        if (usuarioBDDMail)
        {
            return res.status(404).json({msg:`Lo sentimos, el usuario ya se encuentra registrado`})  
        }
    }
    veterinarioBDD.email = req.body.email || veterinarioBDD?.email
    await veterinarioBDD.save()
    res.status(200).json({msg:"Correo actualizado correctamente"})
}
const actualizarPassword = async (req,res)=>{
    const {passwordactual, passwordnuevo} = req.body
    const usuarioBDD = await Usuarios.findById(req.usuarioBDD._id)
    if(!usuarioBDD) return res.status(404).json({msg:`Lo sentimos, no existe el usuario ${id}`})
    const verificarPassword = await usuarioBDD.matchPassword(passwordactual)
    if(!verificarPassword) return res.status(404).json({msg:"Lo sentimos, el password actual no es el correcto"})
    usuarioBDD.password = await usuarioBDD.encrypPassword(passwordnuevo)
    await veterinarioBDD.save()
    res.status(200).json({msg:"Password actualizado correctamente"})
}

const eliminarUsuario = async (req,res)=>{
    const {id} = req.params
    if (Object.values(req.body).includes("")) return res.status(400).json({msg:"Lo sentimos, debes llenar todos los campos"})
    if( !mongoose.Types.ObjectId.isValid(id) ) return res.status(404).json({msg:`Lo sentimos, no existe el veterinario ${id}`})
    await Usuarios.findByIdAndUpdate(id,{estado:false})
    res.status(200).json({msg:"Usuario eliminado correctamente"})
}


export {
    login,
    registro,
    listarUsuarios,
    detalleUsuario,
    actualizarEmail,
    actualizarPassword,
    eliminarUsuario
}