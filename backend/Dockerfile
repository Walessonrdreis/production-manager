# Build stage
FROM node:18-alpine AS builder

# Instalar dependências necessárias
RUN apk add --no-cache python3 make g++ openssl

# Diretório de trabalho
WORKDIR /app

# Copiar arquivos de dependências
COPY package*.json ./
COPY prisma ./prisma/

# Instalar todas as dependências (incluindo devDependencies)
RUN npm ci

# Copiar o resto do código
COPY . .

# Gerar o cliente do Prisma
RUN npx prisma generate

# Compilar TypeScript
RUN npm run build

# Production stage
FROM node:18-alpine

# Instalar OpenSSL para o Prisma
RUN apk add --no-cache openssl

WORKDIR /app

# Copiar package.json e package-lock.json
COPY package*.json ./

# Instalar apenas as dependências de produção
RUN npm ci --only=production

# Copiar o Prisma schema e o cliente gerado
COPY prisma ./prisma/
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma

# Copiar os arquivos compilados
COPY --from=builder /app/dist ./dist

# Expor porta
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["npm", "run", "start"] 