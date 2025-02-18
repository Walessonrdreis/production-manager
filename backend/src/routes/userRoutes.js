const express = require('express');
const UserController = require('../controllers/UserController');
const authMiddleware = require('../middlewares/auth');

const router = express.Router();

// Middleware para validar dados do usuário
const validateUserData = (req, res, next) => {
  const { name, email, password } = req.body;

  if (!email || !email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
    return res.status(400).json({ error: 'E-mail inválido.' });
  }

  if (!password || password.length < 6) {
    return res.status(400).json({ error: 'A senha deve ter no mínimo 6 caracteres.' });
  }

  if (!name || name.trim().length < 3) {
    return res.status(400).json({ error: 'O nome deve ter no mínimo 3 caracteres.' });
  }

  next();
};

// Middleware para validar login
const validateLoginData = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'E-mail e senha são obrigatórios.' });
  }

  next();
};

// Middleware para verificar se é admin
const isAdmin = (req, res, next) => {
  if (req.userRole !== 'admin') {
    return res.status(403).json({ error: 'Acesso negado. Apenas administradores podem realizar esta ação.' });
  }
  next();
};

// Rotas públicas
router.post('/login', validateLoginData, UserController.login);
router.post('/register', validateUserData, UserController.create);

// Middleware de autenticação para rotas protegidas
router.use(authMiddleware);

// Rotas do usuário (requerem autenticação)
router.get('/profile', UserController.show); // Rota para o próprio perfil
router.put('/profile', validateUserData, UserController.update); // Atualizar próprio perfil

// Rotas administrativas (requerem autenticação e privilégios de admin)
router.get('/', isAdmin, UserController.index); // Listar todos os usuários
router.get('/:id', isAdmin, UserController.show); // Buscar usuário específico
router.put('/:id', isAdmin, validateUserData, UserController.update); // Atualizar qualquer usuário
router.delete('/:id', isAdmin, UserController.delete); // Deletar usuário

module.exports = router; 