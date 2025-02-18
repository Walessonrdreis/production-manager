# Sistema de Gerenciamento de Produção

Sistema web para gerenciamento de produção desenvolvido com React, Node.js e PostgreSQL.

## 🚀 Tecnologias

### Frontend
- React
- TypeScript
- Styled Components
- Redux Toolkit
- React Router DOM
- Formik & Yup
- Axios

### Backend
- Node.js
- TypeScript
- Express
- Sequelize (PostgreSQL)
- JWT Authentication
- Express Validator
- Morgan

### Banco de Dados
- PostgreSQL

### DevOps
- Docker
- Docker Compose

## 📋 Pré-requisitos

- Node.js (versão 18 ou superior)
- Yarn (opcional, mas recomendado)
- Docker e Docker Compose
- PostgreSQL (se não estiver usando Docker)

## 🔧 Instalação e Configuração

1. Clone o repositório:
```bash
git clone [url-do-repositorio]
cd production-manager
```

2. Configure as variáveis de ambiente:

Backend (.env):
```env
PORT=5000
NODE_ENV=development

# Configurações do Banco de Dados
DB_HOST=localhost
DB_PORT=5432
DB_NAME=production_manager
DB_USER=postgres
DB_PASS=postgres

# Configuração JWT
JWT_SECRET=seu_jwt_secret_aqui
JWT_EXPIRES_IN=1d
```

Frontend (.env):
```env
REACT_APP_API_URL=http://localhost:5000
```

3. Instale as dependências:

```bash
# Frontend
cd frontend
yarn install

# Backend
cd ../backend
yarn install
```

## 🏃‍♂️ Executando o Projeto

### Usando Docker (Recomendado)

1. Na raiz do projeto, execute:
```bash
cd docker
docker-compose up
```

Isso iniciará todos os serviços:
- Frontend: http://localhost:3000
- Backend: http://localhost:5000
- PostgreSQL: localhost:5432

### Executando Localmente

1. Inicie o Backend:
```bash
cd backend
yarn dev
```

2. Inicie o Frontend:
```bash
cd frontend
yarn start
```

3. Configure o banco de dados:
```bash
cd backend
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all
```

## 📁 Estrutura do Projeto

```
production-manager/
├── frontend/          # Aplicação React
├── backend/           # API Node.js
├── database/          # Migrações e Seeders
└── docker/           # Configurações Docker
```

### Frontend
- `src/components/`: Componentes React
- `src/pages/`: Páginas da aplicação
- `src/routes/`: Configuração de rotas
- `src/store/`: Gerenciamento de estado (Redux)
- `src/services/`: Serviços e chamadas API
- `src/styles/`: Estilos globais e temas

### Backend
- `src/controllers/`: Controladores da API
- `src/models/`: Modelos Sequelize
- `src/routes/`: Rotas da API
- `src/middlewares/`: Middlewares Express
- `src/config/`: Configurações
- `src/services/`: Regras de negócio

### Database
- `migrations/`: Migrações do banco de dados
- `seeders/`: Seeds para dados iniciais

## 🛠️ Scripts Disponíveis

### Frontend
- `yarn start`: Inicia o servidor de desenvolvimento
- `yarn build`: Gera build de produção
- `yarn test`: Executa os testes

### Backend
- `yarn dev`: Inicia o servidor em modo desenvolvimento
- `yarn build`: Compila o TypeScript
- `yarn start`: Inicia o servidor em produção
- `yarn test`: Executa os testes

## 📝 Licença

Este projeto está sob a licença ISC.

## ✨ Contribuição

1. Faça um Fork do projeto
2. Crie uma Branch para sua Feature (`git checkout -b feature/AmazingFeature`)
3. Faça o Commit das suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Faça o Push para a Branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request 