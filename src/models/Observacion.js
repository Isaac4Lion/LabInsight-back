import mongoose from 'mongoose';

const observacionSchema = new mongoose.Schema(
  {
    solicitud: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'SolicitudSoporte', 
      required: true,
    },
    autor: { 
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Usuario', 
      required: true,
    },
    explicacion: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: {
        currentTime: () => moment().tz('America/Guayaquil').toDate(),
      }
  }
);

const Observacion = mongoose.model('Observacion', observacionSchema);
export default Observacion;