const asyncHandler = require('express-async-handler');
const Departamento = require('../models/departamentosModel');

const getDepartamentos = asyncHandler(async (req, res) => {
  const departamentos = await Departamento.find();
  res.status(200).json(departamentos);
});

const createDepartamento = asyncHandler(async (req, res) => {
  const { nombre, descripcion = ''} = req.body;
  if (!nombre) {
    res.status(400);
    throw new Error('El campo "nombre" es obligatorio');
  }
  const newDepartamento = await Departamento.create({ nombre, descripcion});
  res.status(201).json(newDepartamento);
});

const updateDepartamento = asyncHandler(async (req, res) => {
  const departamento = await Departamento.findById(req.params.id);
  if (!departamento) {
    res.status(404);
    throw new Error('Departamento no encontrado');
  }
  const actualizado = await Departamento.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json(actualizado);
});

const deleteDepartamento = asyncHandler(async (req, res) => {
  const departamento = await Departamento.findById(req.params.id);
  if (!departamento) {
    res.status(404);
    throw new Error('Departamento no encontrado');
  }
  await departamento.deleteOne();
  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getDepartamentos,
  createDepartamento,
  updateDepartamento,
  deleteDepartamento,
};