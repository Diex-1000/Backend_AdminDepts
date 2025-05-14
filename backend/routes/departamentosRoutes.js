/**
 * @swagger
 * tags:
 *   name: Departamentos
 *   description: Gestión de departamentos
 */

const express = require('express');
const {
  getDepartamentos,
  createDepartamento,
  updateDepartamento,
  deleteDepartamento,
} = require('../controllers/departamentosControllers');

const router = express.Router();

/**
 * @swagger
 * /api/departamentos:
 *   get:
 *     summary: Obtener todos los departamentos
 *     tags: [Departamentos]
 *     responses:
 *       200:
 *         description: Lista de departamentos
 */
router.get('/', getDepartamentos);

/**
 * @swagger
 * /api/departamentos:
 *   post:
 *     summary: Crear un nuevo departamento
 *     tags: [Departamentos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [nombre]
 *             properties:
 *               nombre:
 *                 type: string
 *               descripcion:
 *                 type: string
 *     responses:
 *       201:
 *         description: Departamento creado
 */
router.post('/', createDepartamento);

/**
 * @swagger
 * /api/departamentos/{id}:
 *   put:
 *     summary: Actualizar un departamento
 *     tags: [Departamentos]
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
 *               nombre:
 *                 type: string
 *               descripcion:
 *                 type: string
 *     responses:
 *       200:
 *         description: Departamento actualizado
 */
router.put('/:id', updateDepartamento);

/**
 * @swagger
 * /api/departamentos/{id}:
 *   delete:
 *     summary: Eliminar un departamento
 *     tags: [Departamentos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Departamento eliminado
 */
router.delete('/:id', deleteDepartamento);

module.exports = router;
