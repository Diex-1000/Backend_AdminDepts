// models/reservacionesModel.js
const mongoose = require('mongoose');

const reservacionSchema = new mongoose.Schema({
  departamento: { type: mongoose.Schema.Types.ObjectId, ref: 'Departamento', required: true },
  fechaInicio:  { type: Date, required: true },
  fechaFin:     { type: Date, required: true },
  estado:       { type: String, enum: ['pendiente', 'aceptada', 'rechazada'], default: 'pendiente' },
  nombre:       { type: String },
  contacto:     { type: String },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Reservacion', reservacionSchema, "Reservaciones");
