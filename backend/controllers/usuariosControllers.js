const asyncHandler = require('express-async-handler');
const Usuario = require('../models/usuariosModel'); 

// GET: Obtener todos los usuarios
const getUsuarios = asyncHandler(async (req, res) => {
  const usuarios = await Usuario.find();
  res.status(200).json(usuarios);
});

// POST: Crear nuevo usuario
const bcrypt = require('bcrypt');

const createUsuario = asyncHandler(async (req, res) => {
  const { usuario, password } = req.body;

  if (!usuario || !password) {
    res.status(400);
    throw new Error('Los campos "usuario" y "password" son obligatorios');
  }

  const existe = await Usuario.findOne({ usuario });
  if (existe) {
    res.status(400);
    throw new Error('El usuario ya existe');
  }


  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const nuevoUsuario = await Usuario.create({ usuario, password: hashedPassword });
  res.status(201).json(nuevoUsuario);
});

// PUT: Actualizar usuario por ID
const updateUsuario = asyncHandler(async (req, res) => {
  const usuario = await Usuario.findById(req.params.id);
  if (!usuario) {
    res.status(404);
    throw new Error('Usuario no encontrado');
  }

  const actualizado = await Usuario.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json(actualizado);
});

// DELETE: Eliminar usuario por ID
const deleteUsuario = asyncHandler(async (req, res) => {
  const usuario = await Usuario.findById(req.params.id);
  if (!usuario) {
    res.status(404);
    throw new Error('Usuario no encontrado');
  }

  await usuario.deleteOne();
  res.status(200).json({ id: req.params.id });
});

const loginUsuario = asyncHandler(async (req, res) => {
    const { usuario, password } = req.body;
  
    const user = await Usuario.findOne({ usuario });
    if (!user) {
      res.status(404);
      throw new Error('Usuario no encontrado');
    }
  
    const passwordValida = await bcrypt.compare(password, user.password);
    if (!passwordValida) {
      res.status(401);
      throw new Error('Contraseña incorrecta');
    }
  
    res.status(200).json({
      id: user._id,
      usuario: user.usuario,
      mensaje: 'Login exitoso'
    });
  });

  module.exports = {
    getUsuarios,
    createUsuario,
    updateUsuario,
    deleteUsuario,
    loginUsuario,
  };
  
