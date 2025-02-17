# Imagem de dependências
FROM node:18-alpine AS deps

# Instalar dependências necessárias
RUN apk add --no-cache python3 make g++ openssl

WORKDIR /app

# Copiar apenas os arquivos necessários para instalação de dependências
COPY package*.json ./
COPY prisma ./prisma/

# Instalar dependências com cache
RUN npm ci

# Build stage
FROM node:18-alpine AS builder
WORKDIR /app

# Copiar dependências da etapa anterior
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Gerar o cliente do Prisma e compilar TypeScript
RUN npx prisma generate && npm run build

# Production stage
FROM node:18-alpine AS runner

# Instalar apenas o OpenSSL necessário para o Prisma
RUN apk add --no-cache openssl

WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 appuser

# Copiar apenas os arquivos necessários para produção
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=deps /app/node_modules ./node_modules
COPY package.json ./

USER appuser

EXPOSE 3000

CMD ["npm", "run", "start"] 