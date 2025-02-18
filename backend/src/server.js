const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').config();

// Importação das rotas
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');

const { errorHandler } = require('./middlewares/errorHandler');
const sequelize = require('./config/database');

const app = express();

// Configuração CORS detalhada
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Middlewares de segurança e utilidades
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rota de teste/saúde da API
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date() });
});

// Rotas da API
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/dashboard', dashboardRoutes);

// Log de rotas em desenvolvimento
if (process.env.NODE_ENV === 'development') {
  app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
  });
}

// Middleware de tratamento de erros
app.use(errorHandler);

// Rota para lidar com endpoints não encontrados
app.use((req, res) => {
  console.log(`Rota não encontrada: ${req.method} ${req.url}`);
  res.status(404).json({ error: 'Rota não encontrada.' });
});

// Sincronização com o banco de dados e inicialização do servidor
const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    console.log('Iniciando servidor...');
    console.log(`Ambiente: ${process.env.NODE_ENV}`);
    console.log(`Porta configurada: ${PORT}`);

    // Testar conexão com o banco
    console.log('Testando conexão com o banco de dados...');
    await sequelize.authenticate();
    console.log('Conexão com o banco de dados estabelecida com sucesso.');
    
    // Sincronizar modelos com o banco
    console.log('Sincronizando modelos com o banco de dados...');
    await sequelize.sync();
    console.log('Modelos sincronizados com sucesso');

    // Iniciar o servidor
    app.listen(PORT, () => {
      console.log(`Servidor rodando com sucesso na porta ${PORT}`);
      console.log(`URL base: http://localhost:${PORT}`);
      console.log('Rotas disponíveis:');
      console.log('- GET    /health              -> Verificar status do servidor');
      console.log('- GET    /api/products        -> Listar produtos');
      console.log('- POST   /api/products        -> Criar produto');
      console.log('- PUT    /api/products/:id    -> Atualizar produto');
      console.log('- DELETE /api/products/:id    -> Deletar produto');
      console.log('- PATCH  /api/products/:id/stock -> Atualizar estoque');
      console.log('- GET    /api/dashboard/metrics  -> Métricas do dashboard');
      console.log('- GET    /api/dashboard/activities -> Atividades recentes');
      console.log('- GET    /api/dashboard/charts    -> Dados dos gráficos');
    });

  } catch (error) {
    console.error('Erro fatal ao iniciar o servidor:');
    console.error(error);
    process.exit(1);
  }
}

// Tratamento de erros não capturados
process.on('uncaughtException', (error) => {
  console.error('Erro não capturado:', error);
  process.exit(1);
});

process.on('unhandledRejection', (error) => {
  console.error('Promise rejeitada não tratada:', error);
  process.exit(1);
});

startServer(); 