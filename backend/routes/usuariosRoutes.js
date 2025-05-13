const express = require('express');
const {
    getUsuarios,
    createUsuario,
    updateUsuario,
    deleteUsuario,
    loginUsuario, // ✅ nuevo
  } = require('../controllers/usuariosControllers');
  
  const router = express.Router();
  
  router.get('/', getUsuarios);
  router.post('/', createUsuario);
  router.put('/:id', updateUsuario);
  router.delete('/:id', deleteUsuario);
  router.post('/login', loginUsuario);
  
  module.exports = router;
  