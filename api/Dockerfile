# ========= Base (deps + build) =========
FROM node:20-alpine AS builder
WORKDIR /app

# Prisma precisa de openssl em runtime
RUN apk add --no-cache openssl

# Instala somente com lock para build reprodutível
COPY package*.json ./
RUN npm ci

# Copia schema/migrations antes para cachear generate
COPY prisma ./prisma
# Gera o client (usa @prisma/client nas deps)
RUN npx prisma generate

# Copia código e compila
COPY tsconfig.json ./
COPY src ./src
RUN npm run build

# ========= Runtime slim =========
FROM node:20-alpine AS runner
WORKDIR /app

RUN apk add --no-cache openssl

# Copia apenas o necessário
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/dist ./dist
COPY package*.json ./

# Porta do servidor (ajuste se seu server.ts usar outra)
ENV PORT=3030
# DATABASE_URL apontando para volume externo: file:/data/dev.db (setado no compose)
ENV NODE_ENV=production

# Executa migrações no start e sobe o server
CMD npx prisma migrate deploy && node dist/server.js

EXPOSE 3030