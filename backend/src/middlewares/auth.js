const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports = async (req, res, next) => {
  try {
    // Verificar se o token foi enviado
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ error: 'Token não fornecido.' });
    }

    // Formato do token: Bearer TOKEN
    const [, token] = authHeader.split(' ');

    try {
      // Verificar se o token é válido
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      // Buscar usuário
      const user = await User.findByPk(decoded.id);
      if (!user) {
        return res.status(401).json({ error: 'Usuário não encontrado.' });
      }

      // Verificar se o usuário está ativo
      if (!user.active) {
        return res.status(401).json({ error: 'Usuário está inativo.' });
      }

      // Adicionar informações do usuário à requisição
      req.userId = decoded.id;
      req.userRole = decoded.role;
      
      return next();
    } catch (err) {
      return res.status(401).json({ error: 'Token inválido.' });
    }
  } catch (error) {
    return res.status(500).json({ error: 'Erro na autenticação: ' + error.message });
  }
}; 