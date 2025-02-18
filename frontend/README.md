# Production Manager

Sistema completo de gerenciamento de produção com frontend em React e backend em Node.js.

## Estrutura do Projeto

O projeto está dividido em duas partes principais:

### Frontend (./frontend)
Interface do usuário desenvolvida com React, TypeScript e Material-UI.

### Backend (./backend)
API REST desenvolvida com Node.js, Express, TypeScript e TypeORM.

## Como Executar o Projeto Completo

1. Clone o repositório
2. Configure o Backend:
```bash
cd backend
yarn
cp .env.example .env
# Configure as variáveis de ambiente no arquivo .env
yarn migration:run
yarn dev
```

3. Configure o Frontend:
```bash
cd frontend
yarn
cp .env.example .env
# Configure a variável VITE_API_URL no arquivo .env
yarn dev
```

4. Acesse:
- Frontend: `http://localhost:5173`
- Backend: `http://localhost:3000`

## Documentação

- [Documentação do Frontend](./frontend/README.md)
- [Documentação do Backend](./backend/README.md)

## Tecnologias Utilizadas

### Frontend
- React
- TypeScript
- Material-UI
- Axios
- React Router DOM
- Styled Components

### Backend
- Node.js
- TypeScript
- Express
- TypeORM
- PostgreSQL
- JWT
- BCrypt