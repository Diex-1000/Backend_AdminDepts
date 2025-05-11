const express = require('express');
const {
  crearReservacion,
  verificarDisponibilidad,
  actualizarEstadoReservacion
} = require('../controllers/reservacionesController');

const router = express.Router();

router.post('/', crearReservacion);
router.get('/disponibilidad', verificarDisponibilidad);
router.put('/:id/estado', actualizarEstadoReservacion);

module.exports = router;
