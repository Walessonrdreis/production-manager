const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
  try {
    // Aqui você normalmente verificaria as credenciais do usuário
    // Para fins de teste, vamos gerar um token diretamente
    const token = jwt.sign(
      { userId: '1', role: 'admin' },
      process.env.JWT_SECRET || 'seu-segredo-jwt-super-secreto',
      { expiresIn: '24h' }
    );

    return res.status(200).json({
      message: 'Autenticação bem-sucedida',
      token
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}; 