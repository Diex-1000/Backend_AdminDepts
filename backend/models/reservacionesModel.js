const mongoose = require('mongoose');

const reservacionSchema = new mongoose.Schema({
  departamento: { type: mongoose.Schema.Types.ObjectId, ref: 'Departamento', required: true },
  fechaInicio:  { type: Date, required: true },
  fechaFin:     { type: Date, required: true },
  estado:       { type: String, enum: ['pendiente', 'aceptada', 'rechazada'], default: 'pendiente' },
  nombre:       { type: String, required: true },
  contacto:     { type: String, required: true },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Reservacion', reservacionSchema);
