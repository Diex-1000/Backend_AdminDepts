const asyncHandler = require('express-async-handler');
const Reservacion = require('../models/reservacionesModel');

// Crear una nueva solicitud de reservación
const crearReservacion = asyncHandler(async (req, res) => {
  const { departamento, fechaInicio, fechaFin, nombre, contacto } = req.body;

  if (!departamento || !fechaInicio || !fechaFin) {
    res.status(400);
    throw new Error('Faltan datos requeridos: departamento, fechaInicio o fechaFin');
  }

  const nuevaReservacion = await Reservacion.create({
    departamento,
    fechaInicio,
    fechaFin,
    nombre,
    contacto,
    estado: 'pendiente',
  });

  res.status(201).json(nuevaReservacion);
});

// Verificar disponibilidad en un rango de fechas
const verificarDisponibilidad = asyncHandler(async (req, res) => {
  const { departamentoId, fechaInicio, fechaFin } = req.query;

  if (!departamentoId || !fechaInicio || !fechaFin) {
    res.status(400);
    throw new Error('Faltan parámetros: departamentoId, fechaInicio o fechaFin');
  }

  const reservas = await Reservacion.find({
    departamento: departamentoId,
    estado: 'aceptada',
    $or: [
      {
        fechaInicio: { $lte: fechaFin },
        fechaFin: { $gte: fechaInicio },
      },
    ],
  });

  const disponible = reservas.length === 0;
  res.status(200).json({ disponible });
});

// Actualizar el estado de una solicitud (aceptar o rechazar)
const actualizarEstadoReservacion = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { estado } = req.body;

  if (!['aceptada', 'rechazada'].includes(estado)) {
    res.status(400);
    throw new Error('Estado inválido: debe ser "aceptada" o "rechazada"');
  }

  const reservacion = await Reservacion.findById(id);

  if (!reservacion) {
    res.status(404);
    throw new Error('Reservación no encontrada');
  }

  reservacion.estado = estado;
  await reservacion.save();

  res.status(200).json(reservacion);
});

module.exports = {
  crearReservacion,
  verificarDisponibilidad,
  actualizarEstadoReservacion,
};
