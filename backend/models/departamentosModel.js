const mongoose = require('mongoose');

const departamentoSchema = new mongoose.Schema({
  nombre:      { type: String,  required: true },
  descripcion: { type: String,  default: '' },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Departamento', departamentoSchema, "departamentos");