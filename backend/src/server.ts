import express from 'express';
import cors from 'cors';
import 'express-async-errors';
import { config } from 'dotenv';
import morgan from 'morgan';
import helmet from 'helmet';
import compression from 'compression';
import cookieParser from 'cookie-parser';

import { routes } from './routes';
import { errorHandler } from './middlewares/errorHandler';

config();

const app = express();

// Middlewares de segurança e otimização
app.use(helmet());
app.use(compression());
app.use(morgan('dev'));
app.use(cookieParser());

// Configuração do CORS
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3001',
  credentials: true,
}));

app.use(express.json());

// Rotas da API
app.use('/api', routes);

// Middleware de tratamento de erros
app.use(errorHandler);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`🚀 Servidor rodando na porta ${port}`);
  console.log(`📚 Documentação disponível em: http://localhost:${port}/api/docs`);
}); 