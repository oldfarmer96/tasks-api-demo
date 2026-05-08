# syntax=docker/dockerfile:1

FROM node:20-bookworm-slim AS base
WORKDIR /app

RUN apt-get update && apt-get install -y --no-install-recommends \
  python3 \
  make \
  g++ \
  && rm -rf /var/lib/apt/lists/*

FROM base AS deps
COPY package*.json ./
RUN npm ci --build-from-source

FROM deps AS dev
COPY . .
EXPOSE 3000
CMD ["npm", "run", "dev"]

FROM base AS production
ENV NODE_ENV=production
COPY package*.json ./
RUN npm ci --omit=dev --build-from-source && npm cache clean --force
COPY src ./src
RUN mkdir -p data
EXPOSE 3000
CMD ["npm", "start"]
