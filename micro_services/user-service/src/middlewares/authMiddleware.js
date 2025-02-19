const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const userRepository = require('../repositories/UserRepository');

/**
 * Middleware de autenticação
 * Verifica se o token JWT é válido e adiciona o usuário à requisição
 */
const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: 'Token não fornecido' });
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    const user = await userRepository.findById(decoded.id);

    if (!user) {
      return res.status(401).json({ error: 'Usuário não encontrado' });
    }

    if (!user.active) {
      return res.status(401).json({ error: 'Usuário inativo' });
    }

    req.userId = decoded.id;
    req.userRole = decoded.role;
    return next();
  } catch (err) {
    return res.status(401).json({ error: 'Token inválido' });
  }
};

/**
 * Middleware de autorização
 * Verifica se o usuário tem a role necessária para acessar a rota
 * @param {string[]} roles - Roles permitidas
 */
const authorize = (roles = []) => {
  if (typeof roles === 'string') {
    roles = [roles];
  }

  return (req, res, next) => {
    if (roles.length && !roles.includes(req.userRole)) {
      return res.status(403).json({
        error: 'Acesso negado - Você não tem permissão para acessar este recurso',
      });
    }
    next();
  };
};

module.exports = {
  authMiddleware,
  authorize,
}; 