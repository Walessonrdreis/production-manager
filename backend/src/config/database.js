const { Sequelize } = require('sequelize');
require('dotenv').config();

console.log('Configurando banco de dados...');
console.log('Database:', process.env.DB_NAME);
console.log('Host:', process.env.DB_HOST);
console.log('Port:', process.env.DB_PORT);

const sequelize = new Sequelize(
  process.env.DB_NAME || 'production_manager',
  process.env.DB_USER || 'postgres',
  process.env.DB_PASSWORD || 'postgres',
  {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    dialect: 'postgres',
    logging: false, // Desativando logs SQL para maior clareza
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
);

async function initializeDatabase() {
  try {
    // Primeiro, tenta dropar o tipo ENUM existente
    await sequelize.query('DROP TYPE IF EXISTS "enum_users_role" CASCADE;');
    
    // Testa a conexão
    await sequelize.authenticate();
    console.log('Conexão com o banco estabelecida.');
    
    // Força a recriação das tabelas
    await sequelize.sync({ force: true });
    console.log('Tabelas recriadas com sucesso.');
    
    return true;
  } catch (error) {
    console.error('Erro ao inicializar banco:', error);
    return false;
  }
}

// Inicializa o banco
initializeDatabase();

module.exports = sequelize; 