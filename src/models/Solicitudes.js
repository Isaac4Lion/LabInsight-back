import {Schema, model} from 'mongoose'

const solicitudesSchema = new Schema({
    laboratorio:{
        type:String,
        require:true,
        trim:true,
    },
    n_maquina:{
        type:Number,
        require:true,
        trim:true
    },
    descripcion:{
        type:String,
        trim:true
    },
    usuario:{
        type:String,
        trim:true
    }
},{
    timestamps:true
})

export default model('Solicitud',solicitudesSchema)