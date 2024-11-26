import {Schema, model} from 'mongoose'
import bcrypt from "bcrypt"

const usuariosSchema = new Schema({
    email:{
        type:String,
        require:true,
        trim:true,
        unique: true,
    },
    password:{
        type:String,
        require:true,
        trim:true
    },
    status:{
        type:Boolean,
        default:true
    },
},{
    timestamps:true
})

// Método para cifrar el password del usuario
usuariosSchema.methods.encryptPassword = async function(password){
    const salt = await bcrypt.genSalt(10)
    const passwordEncryp = await bcrypt.hash(password,salt)
    return passwordEncryp
}

// Método para verificar si el password ingresado es el mismo de la BDD
usuariosSchema.methods.matchPassword = async function(password){
    const response = await bcrypt.compare(password,this.password)
    return response
}

export default model('Usuario',usuariosSchema)