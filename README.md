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

## 🛠️ Tratamento de Erros

O sistema implementa um tratamento de erros centralizado e consistente usando middlewares do Express. Esta abordagem garante que todos os erros sejam tratados de forma padronizada e que as respostas de erro sigam um formato consistente.

### Tipos de Erro

1. **ApiError** (Base)
   ```javascript
   throw new ApiError(statusCode, message);
   ```
   - Erro base para todos os erros da API
   - Permite definir status code e mensagem personalizados

2. **ValidationError**
   ```javascript
   throw new ValidationError('Mensagem de erro', [
     { field: 'email', message: 'Email é obrigatório' }
   ]);
   ```
   - Status code: 400
   - Usado para erros de validação de dados
   - Suporta múltiplos erros por campo

3. **DatabaseError**
   ```javascript
   throw new DatabaseError('Erro ao conectar com o banco');
   ```
   - Status code: 503
   - Usado para erros relacionados ao banco de dados
   - Mensagem técnica visível apenas em desenvolvimento

### Formato das Respostas

1. **Erro de API**
   ```json
   {
     "status": "error",
     "code": 400,
     "message": "Mensagem do erro"
   }
   ```

2. **Erro de Validação**
   ```json
   {
     "status": "error",
     "code": 400,
     "message": "Erro de validação",
     "errors": [
       {
         "field": "email",
         "message": "Email é obrigatório"
       }
     ]
   }
   ```

3. **Erro de Banco de Dados**
   ```json
   {
     "status": "error",
     "code": 503,
     "message": "Erro no banco de dados. Por favor, tente novamente mais tarde.",
     "detail": "Detalhes técnicos (apenas em desenvolvimento)"
   }
   ```

### Uso em Controllers

```javascript
const createUser = asyncErrorHandler(async (req, res) => {
  // Validação
  if (!req.body.email) {
    throw new ValidationError('Dados inválidos', [
      { field: 'email', message: 'Email é obrigatório' }
    ]);
  }

  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (error) {
    throw new DatabaseError('Erro ao criar usuário');
  }
});
```

### Características

- **Centralizado**: Todos os erros são tratados por um único middleware
- **Consistente**: Formato padronizado para todas as respostas de erro
- **Seguro**: Informações sensíveis são ocultadas em produção
- **Rastreável**: Stack traces disponíveis em desenvolvimento
- **Flexível**: Fácil adicionar novos tipos de erro
- **Assíncrono**: Suporte para erros em operações assíncronas

### Ambiente de Desenvolvimento vs Produção

- **Desenvolvimento**:
  - Stack traces incluídos nas respostas
  - Mensagens de erro detalhadas
  - Detalhes técnicos visíveis

- **Produção**:
  - Stack traces omitidos
  - Mensagens de erro genéricas
  - Detalhes técnicos ocultados

### Logs de Erro

O sistema registra automaticamente:
- Timestamp do erro
- Tipo e mensagem do erro
- Stack trace
- Detalhes da requisição (método, URL, headers, body)
- Informações adicionais do contexto

### Boas Práticas

1. Use os tipos de erro apropriados para cada situação
2. Evite expor detalhes técnicos em produção
3. Sempre inclua mensagens claras e úteis
4. Utilize o `asyncErrorHandler` para funções assíncronas
5. Mantenha as mensagens de erro em português e user-friendly

## 📝 Licença

Este projeto está sob a licença ISC.

## ✨ Contribuição

1. Faça um Fork do projeto
2. Crie uma Branch para sua Feature (`git checkout -b feature/AmazingFeature`)
3. Faça o Commit das suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Faça o Push para a Branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request 