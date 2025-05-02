// routes/departamentosRoutes.js
const express = require('express');
const {
  getDepartamentos,
  createDepartamento,
  updateDepartamento,
  deleteDepartamento,
} = require('../controllers/departamentosControllers');

const router = express.Router();

router.get('/', getDepartamentos);
router.post('/', createDepartamento);
router.put('/:id', updateDepartamento);
router.delete('/:id', deleteDepartamento);

module.exports = router;
