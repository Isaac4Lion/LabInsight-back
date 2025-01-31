import moment from 'moment-timezone';
import mongoose from 'mongoose';

const laboratorioSchema = new mongoose.Schema({
  codigo: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  descripcion: {
    type: String,
    required: true,
    trim: true,
  },
  numeroComputadoras: {
    type: Number,
    required: true,
    min: 1,
  },
  numeroProyectores: {
    type: Number,
    default: 1,
    min: 0,
  },
}, {
  timestamps: {
      createdAt: () => moment().tz('America/Guayaquil').toDate(),
      updatedAt: () => moment().tz('America/Guayaquil').toDate(),
    }
});

const Laboratorio = mongoose.model('Laboratorio', laboratorioSchema);
export default Laboratorio;
