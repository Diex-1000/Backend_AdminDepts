const asyncHandler = require('express-async-handler');
const Reservacion = require('../models/reservacionesModel');

// Obtener todas las reservaciones
const getReservaciones = asyncHandler(async (req, res) => {
  const reservaciones = await Reservacion.find().populate('departamento');
  res.status(200).json(reservaciones);
});

// Crear una nueva reservación
const crearReservacion = asyncHandler(async (req, res) => {
  const { departamento, fechaInicio, fechaFin, nombre, contacto } = req.body;

  if (!departamento || !fechaInicio || !fechaFin || !nombre || !contacto) {
    res.status(400);
    throw new Error('Todos los campos son obligatorios');
  }

  const fechaIni = new Date(fechaInicio + 'T00:00:00');
  const fechaFinDate = new Date(fechaFin + 'T00:00:00');
  const hoy = new Date();

  if (fechaFinDate <= fechaIni) {
    res.status(400);
    throw new Error('La fecha de fin debe ser posterior a la de inicio');
  }

  if (fechaIni < hoy.setHours(0, 0, 0, 0)) {
    res.status(400);
    throw new Error('La fecha de inicio no puede estar en el pasado');
  }

  const nueva = await Reservacion.create({
    departamento,
    fechaInicio: fechaIni,
    fechaFin: fechaFinDate,
    nombre,
    contacto,
  });

  res.status(201).json(nueva);
});

// Cambiar estado
const actualizarEstadoReservacion = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { estado } = req.body;

  if (!['aceptada', 'rechazada'].includes(estado)) {
    res.status(400);
    throw new Error('Estado inválido');
  }

  const reservacion = await Reservacion.findById(id);
  if (!reservacion) {
    res.status(404);
    throw new Error('Reservación no encontrada');
  }

  if (estado === 'aceptada') {
    const conflictos = await Reservacion.find({
      _id: { $ne: reservacion._id },
      departamento: reservacion.departamento,
      estado: 'aceptada',
      $or: [
        {
          fechaInicio: { $lte: reservacion.fechaFin },
          fechaFin: { $gte: reservacion.fechaInicio }
        }
      ]
    });

    if (conflictos.length > 0) {
      const c = conflictos[0];
      res.status(400);
      throw new Error(`Conflicto con la reservación de ${c.nombre} del ${c.fechaInicio.toISOString().slice(0,10)} al ${c.fechaFin.toISOString().slice(0,10)}`);
    }
  }

  reservacion.estado = estado;
  await reservacion.save();

  res.status(200).json(reservacion);
});

// Pendientes
const getReservacionesPendientes = asyncHandler(async (req, res) => {
  const pendientes = await Reservacion.find({ estado: 'pendiente' });
  res.status(200).json(pendientes);
});

// Fechas ocupadas por ID
const getFechasOcupadasPorDepartamento = asyncHandler(async (req, res) => {
  const { departamentoId } = req.params;

  const reservaciones = await Reservacion.find({
    departamento: departamentoId,
    estado: 'aceptada'
  }).select('fechaInicio fechaFin -_id');

  const fechas = reservaciones.map(r => ({
    inicio: r.fechaInicio.toISOString().slice(0, 10),
    fin: r.fechaFin.toISOString().slice(0, 10),
  }));

  res.status(200).json(fechas);
});

// Eliminar por ID
const deleteReservacion = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const reservacion = await Reservacion.findById(id);
  if (!reservacion) {
    res.status(404);
    throw new Error('Reservación no encontrada');
  }

  await reservacion.deleteOne();
  res.status(200).json({ mensaje: 'Reservación eliminada', id });
});

module.exports = {
  getReservaciones,
  crearReservacion,
  actualizarEstadoReservacion,
  getReservacionesPendientes,
  getFechasOcupadasPorDepartamento,
  deleteReservacion
};
