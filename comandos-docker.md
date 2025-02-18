# Comandos Docker Úteis

## Comandos Rápidos (Com Aliases)
Após configurar os aliases, você pode usar estes comandos simplificados:
```bash
dcup       # Iniciar o ambiente de desenvolvimento
dcdown     # Parar o ambiente
dclogs     # Ver logs em tempo real
dcrestart  # Reiniciar todos os serviços
```

## Ambiente de Desenvolvimento

### Iniciar o Ambiente
```bash
# Iniciar normalmente
docker compose -f docker-compose.dev.yml up

# Iniciar em background
docker compose -f docker-compose.dev.yml up -d

# Iniciar reconstruindo as imagens (após mudanças em dependências)
docker compose -f docker-compose.dev.yml up --build
```

### Parar o Ambiente
```bash
# Parar mantendo os volumes
docker compose -f docker-compose.dev.yml down

# Parar e remover volumes (útil quando há problemas com node_modules)
docker compose -f docker-compose.dev.yml down -v
```

## Logs e Monitoramento

### Ver logs
```bash
# Ver logs de todos os serviços
docker compose -f docker-compose.dev.yml logs

# Ver logs em tempo real
docker compose -f docker-compose.dev.yml logs -f

# Ver logs de um serviço específico
docker compose -f docker-compose.dev.yml logs frontend
docker compose -f docker-compose.dev.yml logs backend
docker compose -f docker-compose.dev.yml logs db
```

### Status dos Containers
```bash
# Listar containers em execução
docker ps

# Listar todos os containers (incluindo parados)
docker ps -a

# Ver uso de recursos (CPU, memória, etc)
docker stats
```

## Gerenciamento de Containers

### Reiniciar Serviços
```bash
# Reiniciar todos os serviços
docker compose -f docker-compose.dev.yml restart

# Reiniciar um serviço específico
docker compose -f docker-compose.dev.yml restart frontend
docker compose -f docker-compose.dev.yml restart backend
docker compose -f docker-compose.dev.yml restart db
```

### Executar Comandos
```bash
# Executar comando no frontend
docker compose -f docker-compose.dev.yml exec frontend yarn add [pacote]
docker compose -f docker-compose.dev.yml exec frontend yarn remove [pacote]

# Executar comando no backend
docker compose -f docker-compose.dev.yml exec backend npm install [pacote]
docker compose -f docker-compose.dev.yml exec backend npm uninstall [pacote]

# Acessar shell dos containers
docker compose -f docker-compose.dev.yml exec frontend sh
docker compose -f docker-compose.dev.yml exec backend sh
docker compose -f docker-compose.dev.yml exec db psql -U postgres
```

## Banco de Dados

### Backup e Restore
```bash
# Fazer backup do banco
docker compose -f docker-compose.dev.yml exec db pg_dump -U postgres production_manager > backup.sql

# Restaurar backup
docker compose -f docker-compose.dev.yml exec -T db psql -U postgres production_manager < backup.sql
```

## Limpeza e Manutenção

### Limpar Recursos Não Utilizados
```bash
# Remover containers parados
docker container prune

# Remover imagens não utilizadas
docker image prune

# Remover volumes não utilizados
docker volume prune

# Remover tudo que não está em uso (containers, imagens, volumes, redes)
docker system prune -a
```

### Gerenciamento de Volumes
```bash
# Listar volumes
docker volume ls

# Inspecionar um volume
docker volume inspect production-manager-frontend-modules
docker volume inspect production-manager-backend-modules
docker volume inspect production-manager-postgres-data
```

## Dicas Úteis

### Aliases Recomendados
Adicione estes aliases ao seu `~/.bashrc` ou `~/.zshrc`:
```bash
# Atalho para docker compose dev
alias dcd='docker compose -f docker-compose.dev.yml'

# Comandos comuns
alias dcup='dcd up'
alias dcdown='dcd down'
alias dcrestart='dcd restart'
alias dclogs='dcd logs -f'
```

### Comandos de Emergência
```bash
# Parar todos os containers (em caso de emergência)
docker stop $(docker ps -q)

# Remover todos os containers
docker rm $(docker ps -a -q)

# Remover todas as imagens
docker rmi $(docker images -q)
```

## Prisma

### Comandos do Prisma
```bash
# Gerar cliente Prisma
docker compose -f docker-compose.dev.yml exec backend npx prisma generate

# Executar migrações
docker compose -f docker-compose.dev.yml exec backend npx prisma migrate dev

# Abrir Prisma Studio
docker compose -f docker-compose.dev.yml exec -d backend npx prisma studio
```

## Troubleshooting

### Problemas Comuns
```bash
# Reconstruir apenas uma imagem específica
docker compose -f docker-compose.dev.yml build frontend
docker compose -f docker-compose.dev.yml build backend

# Forçar recriação de containers
docker compose -f docker-compose.dev.yml up --force-recreate

# Verificar logs do sistema Docker
sudo journalctl -fu docker.service
``` 