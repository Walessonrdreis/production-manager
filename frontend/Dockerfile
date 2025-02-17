# Imagem base
FROM node:18-alpine AS builder

# Instalar dependências necessárias
RUN apk add --no-cache libc6-compat

# Diretório de trabalho
WORKDIR /app

# Criar estrutura de diretórios
RUN mkdir -p public src/app

# Copiar arquivos de configuração primeiro
COPY package.json ./
COPY tailwind.config.js ./
COPY postcss.config.js ./

# Instalar dependências
RUN yarn install

# Copiar o código fonte
COPY src ./src
COPY public ./public

# Build da aplicação
RUN yarn build

# Imagem de produção
FROM node:18-alpine AS runner

WORKDIR /app

# Copiar dependências e build da etapa anterior
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/src ./src
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/tailwind.config.js ./
COPY --from=builder /app/postcss.config.js ./

# Expor porta
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["yarn", "dev"] 