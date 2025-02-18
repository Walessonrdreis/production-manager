// Tipos de erro personalizados
class ApiError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
    this.name = 'ApiError';
  }
}

class ValidationError extends ApiError {
  constructor(message, errors = []) {
    super(400, message);
    this.name = 'ValidationError';
    this.errors = errors;
  }
}

class DatabaseError extends ApiError {
  constructor(message) {
    super(503, message);
    this.name = 'DatabaseError';
  }
}

// Função para registrar erros (pode ser expandida para usar um serviço de log)
const logError = (err, req) => {
  const errorLog = {
    timestamp: new Date().toISOString(),
    error: {
      name: err.name,
      message: err.message,
      stack: err.stack,
    },
    request: {
      method: req.method,
      url: req.url,
      headers: req.headers,
      body: req.body,
      params: req.params,
      query: req.query,
    },
  };

  // Log no console em desenvolvimento
  if (process.env.NODE_ENV === 'development') {
    console.error('Error Log:', JSON.stringify(errorLog, null, 2));
  }

  // Aqui você pode adicionar outros métodos de log (ex: arquivo, serviço externo)
};

// Middleware principal de tratamento de erros
const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  // Erros de validação do Sequelize
  if (err.name === 'SequelizeValidationError') {
    return res.status(400).json({
      error: 'Erro de validação',
      details: err.errors.map(e => e.message)
    });
  }

  // Erros de chave única do Sequelize
  if (err.name === 'SequelizeUniqueConstraintError') {
    return res.status(400).json({
      error: 'Erro de duplicidade',
      details: 'Já existe um registro com estes dados.'
    });
  }

  // Erros de banco de dados do Sequelize
  if (err.name === 'SequelizeDatabaseError') {
    return res.status(500).json({
      error: 'Erro no banco de dados',
      details: 'Ocorreu um erro ao processar sua requisição.'
    });
  }

  // Erros de JWT
  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({
      error: 'Token inválido',
      details: 'O token de autenticação fornecido é inválido.'
    });
  }

  if (err.name === 'TokenExpiredError') {
    return res.status(401).json({
      error: 'Token expirado',
      details: 'O token de autenticação expirou. Faça login novamente.'
    });
  }

  // Erro padrão
  return res.status(500).json({
    error: 'Erro interno do servidor',
    details: process.env.NODE_ENV === 'development' ? err.message : 'Ocorreu um erro inesperado.'
  });
};

// Middleware para capturar erros assíncronos não tratados
const asyncErrorHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

module.exports = {
  errorHandler,
  asyncErrorHandler,
  ApiError,
  ValidationError,
  DatabaseError,
}; 