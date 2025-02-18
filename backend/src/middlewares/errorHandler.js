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
  // Log do erro
  logError(err, req);

  // Tratamento específico por tipo de erro
  if (err instanceof ValidationError) {
    return res.status(err.statusCode).json({
      status: 'error',
      code: err.statusCode,
      message: err.message,
      errors: err.errors,
    });
  }

  if (err instanceof DatabaseError) {
    return res.status(err.statusCode).json({
      status: 'error',
      code: err.statusCode,
      message: 'Erro no banco de dados. Por favor, tente novamente mais tarde.',
      ...(process.env.NODE_ENV === 'development' && { detail: err.message }),
    });
  }

  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      status: 'error',
      code: err.statusCode,
      message: err.message,
    });
  }

  // Tratamento de erros do Sequelize
  if (err.name === 'SequelizeValidationError') {
    return res.status(400).json({
      status: 'error',
      code: 400,
      message: 'Erro de validação',
      errors: err.errors.map(e => ({
        field: e.path,
        message: e.message,
      })),
    });
  }

  // Erro padrão para casos não tratados
  const statusCode = err.statusCode || 500;
  const errorResponse = {
    status: 'error',
    code: statusCode,
    message: process.env.NODE_ENV === 'production' 
      ? 'Erro interno do servidor' 
      : err.message || 'Erro interno do servidor',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  };

  res.status(statusCode).json(errorResponse);
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