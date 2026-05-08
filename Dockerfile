# syntax=docker/dockerfile:1

FROM node:20-bookworm-slim AS base
WORKDIR /app

FROM base AS build-tools
RUN apt-get update && apt-get install -y --no-install-recommends \
  python3 \
  make \
  g++ \
  && rm -rf /var/lib/apt/lists/*

FROM build-tools AS deps
COPY package*.json ./
RUN npm ci --build-from-source

FROM deps AS dev
COPY . .
EXPOSE 3000
CMD ["npm", "run", "dev"]

FROM build-tools AS production-deps
COPY package*.json ./
RUN npm ci --omit=dev --build-from-source && npm cache clean --force

FROM base AS production
ENV NODE_ENV=production
RUN addgroup --system nodejs && adduser --system appuser --ingroup nodejs
COPY --from=production-deps /app/node_modules ./node_modules
COPY package*.json ./
COPY src ./src
RUN mkdir -p data && chown -R appuser:nodejs /app
USER appuser
EXPOSE 3000
CMD ["npm", "start"]
