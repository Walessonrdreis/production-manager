import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { errorHandler, ApiError, ValidationError, DatabaseError } from './middlewares/errorHandler';

// Configuração das variáveis de ambiente
dotenv.config();

// Criação da aplicação Express
const app = express();

// Middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rota básica de teste
app.get('/', (req, res) => {
  res.json({ message: 'API funcionando!' });
});

// Rotas de teste para diferentes tipos de erro
app.get('/teste/erro-api', (req, res, next) => {
  try {
    throw new ApiError(400, 'Teste de erro da API');
  } catch (error) {
    next(error);
  }
});

app.get('/teste/erro-validacao', (req, res, next) => {
  try {
    throw new ValidationError('Erro de validação', [
      { field: 'email', message: 'Email é obrigatório' },
      { field: 'senha', message: 'Senha deve ter no mínimo 6 caracteres' }
    ]);
  } catch (error) {
    next(error);
  }
});

app.get('/teste/erro-database', (req, res, next) => {
  try {
    throw new DatabaseError('Erro ao conectar com o banco de dados');
  } catch (error) {
    next(error);
  }
});

app.get('/teste/erro-nao-tratado', (req, res, next) => {
  try {
    // Simulando um erro não tratado
    throw new Error('Este é um erro não tratado');
  } catch (error) {
    next(error);
  }
});

// Middleware de tratamento de erros (deve ser o último middleware)
app.use(errorHandler);

// Middleware para rotas não encontradas
app.use((req, res, next) => {
  res.status(404).json({
    status: 'error',
    code: 404,
    message: 'Rota não encontrada'
  });
});

// Porta do servidor
const PORT = process.env.PORT || 3000;

// Inicialização do servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
