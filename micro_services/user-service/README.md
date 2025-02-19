# User Service

Microserviço responsável pelo gerenciamento de usuários do sistema.

## Tecnologias Utilizadas

- Node.js
- Express
- PostgreSQL
- Sequelize
- Jest
- Swagger
- Redis
- Docker

## Pré-requisitos

- Node.js >= 14.x
- PostgreSQL >= 12
- Redis >= 6
- Docker (opcional)

## Instalação

1. Clone o repositório
2. Instale as dependências:
```bash
npm install
```
3. Copie o arquivo de exemplo de variáveis de ambiente:
```bash
cp .env.example .env
```
4. Configure as variáveis de ambiente no arquivo `.env`
5. Execute as migrações do banco de dados:
```bash
npm run migrate
```

## Executando o Projeto

### Desenvolvimento
```bash
npm run dev
```

### Produção
```bash
npm start
```

## Testes

### Executando todos os testes
```bash
npm test
```

### Executando testes com coverage
```bash
npm run test:coverage
```

## Docker

### Construindo a imagem
```bash
docker build -t user-service .
```

### Executando com Docker Compose
```bash
docker-compose up
```

## Documentação da API

A documentação da API está disponível através do Swagger UI em:
```
http://localhost:3001/api-docs
```

## Scripts Disponíveis

- `npm start`: Inicia o servidor em produção
- `npm run dev`: Inicia o servidor em desenvolvimento com hot-reload
- `npm test`: Executa os testes
- `npm run test:watch`: Executa os testes em modo watch
- `npm run test:coverage`: Gera relatório de cobertura de testes
- `npm run lint`: Executa verificação de linting
- `npm run lint:fix`: Corrige problemas de linting
- `npm run format`: Formata o código com Prettier

## Estrutura do Projeto

```
src/
├── config/         # Configurações do projeto
├── controllers/    # Controladores da API
├── interfaces/     # Interfaces e tipos
├── middlewares/    # Middlewares Express
├── models/         # Modelos do Sequelize
├── repositories/   # Camada de acesso a dados
├── routes/         # Rotas da API
├── services/       # Lógica de negócios
└── utils/          # Utilitários
```

## Contribuição

1. Faça o fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -am 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Crie um Pull Request

## Licença

Este projeto está sob a licença ISC. 