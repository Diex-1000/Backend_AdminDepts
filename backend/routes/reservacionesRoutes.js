const express = require('express');
const {
  getReservaciones,
  crearReservacion,
  actualizarEstadoReservacion,
  getReservacionesPendientes,
  getFechasOcupadasPorDepartamento,
  deleteReservacion
} = require('../controllers/reservacionesControllers');

const router = express.Router();

router.get('/', getReservaciones); 
router.post('/', crearReservacion);
router.put('/:id', actualizarEstadoReservacion);
router.get('/aceptadas/nombre/:nombreDepartamento', getFechasOcupadasPorDepartamento);
router.get('/pendientes', getReservacionesPendientes);
router.delete('/:id', deleteReservacion);

module.exports = router;
