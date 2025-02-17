# Imagem base
FROM node:18-alpine AS deps

# Instalar dependências necessárias
RUN apk add --no-cache libc6-compat

# Diretório de trabalho
WORKDIR /app

# Copiar apenas os arquivos necessários para instalação de dependências
COPY package.json yarn.lock ./

# Instalar dependências
RUN yarn install --frozen-lockfile

# Imagem de build
FROM node:18-alpine AS builder
WORKDIR /app

# Copiar dependências da etapa anterior
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build da aplicação
RUN yarn build

# Imagem de produção
FROM node:18-alpine AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copiar apenas os arquivos necessários para produção
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"] 