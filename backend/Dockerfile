# Etapa de build
FROM node:23-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install --production

COPY . .

# Etapa final (runtime)
FROM node:23-alpine

WORKDIR /app

# Solo copiar lo necesario desde el builder
COPY --from=builder /app .

COPY wait-for-db.sh /app/wait-for-db.sh
RUN chmod +x /app/wait-for-db.sh

EXPOSE 5000

ENTRYPOINT ["/app/wait-for-db.sh"]
