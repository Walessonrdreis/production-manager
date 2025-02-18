const { Sequelize } = require('sequelize');
require('dotenv').config();

console.log('Configurações do banco de dados:');
console.log('Database:', process.env.DB_NAME || 'production_manager');
console.log('User:', process.env.DB_USER || 'postgres');
console.log('Host:', process.env.DB_HOST || 'localhost');
console.log('Port:', process.env.DB_PORT || 5432);

const sequelize = new Sequelize(
  process.env.DB_NAME || 'production_manager',
  process.env.DB_USER || 'postgres',
  process.env.DB_PASSWORD || 'postgres',
  {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    dialect: 'postgres',
    logging: console.log,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
    dialectOptions: {
      ssl: process.env.DB_SSL === 'true' ? {
        require: true,
        rejectUnauthorized: false
      } : false
    }
  }
);

// Teste de conexão com mais detalhes
async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('✅ Conexão com o banco de dados estabelecida com sucesso!');
    
    // Testar se podemos criar tabelas
    await sequelize.query('CREATE TABLE IF NOT EXISTS test_connection (id SERIAL PRIMARY KEY);');
    console.log('✅ Teste de criação de tabela bem sucedido!');
    
    // Limpar tabela de teste
    await sequelize.query('DROP TABLE IF EXISTS test_connection;');
    
    return true;
  } catch (error) {
    console.error('❌ Erro ao conectar com o banco de dados:');
    console.error('Tipo do erro:', error.name);
    console.error('Mensagem:', error.message);
    if (error.original) {
      console.error('Erro original:', error.original.code);
      console.error('Detalhes:', error.original.detail);
    }
    
    // Sugestões de solução
    console.log('\nPossíveis soluções:');
    console.log('1. Verifique se o PostgreSQL está rodando: sudo systemctl status postgresql');
    console.log('2. Verifique se o banco de dados existe: sudo -u postgres psql -l');
    console.log('3. Verifique as credenciais no arquivo .env');
    console.log('4. Verifique se o usuário postgres tem permissão para acessar o banco');
    
    return false;
  }
}

// Executar teste de conexão
testConnection();

module.exports = sequelize; 