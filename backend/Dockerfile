# Étape 1 : Build
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

# Étape 2 : Run
FROM node:20-alpine
WORKDIR /app

# Copie du code compilé (ou tout le dossier si pas de transpilation)
COPY --from=builder /app .

# Copie du .env s’il est fourni à runtime (sinon géré avec docker-compose)
# COPY .env .  # ⚠️ Pas recommandé si tu génères le .env via GitHub Actions

EXPOSE 3000
CMD ["npm", "start"]
