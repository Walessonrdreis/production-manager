const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').config();

const userRoutes = require('./routes/userRoutes');
const { errorHandler } = require('./middlewares/errorHandler');
const sequelize = require('./config/database');

const app = express();

// Middlewares de segurança e utilidades
app.use(helmet()); // Adiciona headers de segurança
app.use(cors()); // Permite requisições cross-origin
app.use(morgan('dev')); // Log de requisições em desenvolvimento
app.use(express.json()); // Parse de JSON
app.use(express.urlencoded({ extended: true })); // Parse de URL-encoded bodies

// Rota de teste/saúde da API
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date() });
});

// Rotas da API
app.use('/api/users', userRoutes);

// Middleware de tratamento de erros
app.use(errorHandler);

// Rota para lidar com endpoints não encontrados
app.use((req, res) => {
  res.status(404).json({ error: 'Rota não encontrada.' });
});

// Sincronização com o banco de dados e inicialização do servidor
const PORT = process.env.PORT || 5000;

// Função para verificar se a porta está em uso
const isPortInUse = (port) => {
  return new Promise((resolve) => {
    const server = require('net').createServer();
    
    server.once('error', (err) => {
      if (err.code === 'EADDRINUSE') {
        console.log(`Porta ${port} já está em uso.`);
        resolve(true);
      }
    });
    
    server.once('listening', () => {
      server.close();
      resolve(false);
    });
    
    server.listen(port);
  });
};

async function startServer() {
  try {
    console.log('Iniciando servidor...');
    console.log(`Ambiente: ${process.env.NODE_ENV}`);
    console.log(`Porta configurada: ${PORT}`);

    // Verificar se a porta está em uso
    const portInUse = await isPortInUse(PORT);
    if (portInUse) {
      console.error(`ERRO: A porta ${PORT} já está em uso. Por favor, escolha outra porta ou libere esta porta.`);
      process.exit(1);
    }

    // Testar conexão com o banco
    console.log('Testando conexão com o banco de dados...');
    await sequelize.authenticate();
    console.log('Conexão com o banco de dados estabelecida com sucesso.');
    
    // Forçar recriação das tabelas
    console.log('Sincronizando modelos com o banco de dados...');
    await sequelize.sync({ force: true });
    console.log('Tabelas recriadas com sucesso');

    // Iniciar o servidor
    const server = app.listen(PORT, () => {
      console.log(`Servidor rodando com sucesso na porta ${PORT}`);
      console.log(`URL base: http://localhost:${PORT}`);
      console.log('Rotas disponíveis:');
      console.log('- GET  /health         -> Verificar status do servidor');
      console.log('- POST /api/users/login    -> Login de usuário');
      console.log('- POST /api/users/register -> Registro de usuário');
    });

    // Tratamento de erros do servidor
    server.on('error', (error) => {
      if (error.code === 'EADDRINUSE') {
        console.error(`ERRO: Porta ${PORT} já está em uso. Escolha outra porta.`);
      } else {
        console.error('Erro no servidor:', error);
      }
      process.exit(1);
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