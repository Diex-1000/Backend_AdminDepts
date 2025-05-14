/**
 * @swagger
 * tags:
 *   name: Reservaciones
 *   description: Operaciones de reservación
 */

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

/**
 * @swagger
 * /api/reservaciones:
 *   get:
 *     summary: Obtener todas las reservaciones
 *     tags: [Reservaciones]
 *     responses:
 *       200:
 *         description: Lista de reservaciones
 */
router.get('/', getReservaciones);

/**
 * @swagger
 * /api/reservaciones:
 *   post:
 *     summary: Crear nueva reservación
 *     tags: [Reservaciones]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [departamento, fechaInicio, fechaFin, nombre, contacto]
 *             properties:
 *               departamento:
 *                 type: string
 *               fechaInicio:
 *                 type: string
 *                 format: date
 *               fechaFin:
 *                 type: string
 *                 format: date
 *               nombre:
 *                 type: string
 *               contacto:
 *                 type: string
 *     responses:
 *       201:
 *         description: Reservación creada
 */
router.post('/', crearReservacion);

/**
 * @swagger
 * /api/reservaciones/{id}:
 *   put:
 *     summary: Actualizar estado de una reservación
 *     tags: [Reservaciones]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               estado:
 *                 type: string
 *                 enum: [aceptada, rechazada]
 *     responses:
 *       200:
 *         description: Estado actualizado
 */
router.put('/:id', actualizarEstadoReservacion);

/**
 * @swagger
 * /api/reservaciones/pendientes:
 *   get:
 *     summary: Obtener reservaciones pendientes
 *     tags: [Reservaciones]
 *     responses:
 *       200:
 *         description: Lista de reservaciones pendientes
 */
router.get('/pendientes', getReservacionesPendientes);

/**
 * @swagger
 * /api/reservaciones/aceptadas/{departamentoId}:
 *   get:
 *     summary: Fechas ocupadas por departamento
 *     tags: [Reservaciones]
 *     parameters:
 *       - in: path
 *         name: departamentoId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lista de fechas ocupadas
 */
router.get('/aceptadas/:departamentoId', getFechasOcupadasPorDepartamento);

/**
 * @swagger
 * /api/reservaciones/{id}:
 *   delete:
 *     summary: Eliminar una reservación
 *     tags: [Reservaciones]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Reservación eliminada
 */
router.delete('/:id', deleteReservacion);

module.exports = router;
