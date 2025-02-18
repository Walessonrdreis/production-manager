const express = require('express');
const UserController = require('../controllers/UserController');
const router = express.Router();

// Middleware para validar dados de login
const validateLoginData = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'E-mail e senha são obrigatórios.' });
  }

  next();
};

// Rotas de autenticação
router.post('/login', validateLoginData, UserController.login);
router.post('/register', UserController.create);

module.exports = router; 