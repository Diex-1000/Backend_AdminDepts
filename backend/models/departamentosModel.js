const mongoose = require('mongoose');

const departamentoSchema = new mongoose.Schema({
  nombre:      { type: String,  required: true },
  descripcion: { type: String,  default: '' },
  disponible:  { type: Boolean, default: true },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Departamento', departamentoSchema);
