# Stage 1: Build static website
FROM oven/bun:1.4.3-alpine AS build
WORKDIR /app

COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

COPY . .
ENV ASTRO_TELEMETRY_DISABLED=1
RUN bun run build

# Stage 2: Ultra-lightweight non-root web server (~25MB)
FROM nginxinc/nginx-unprivileged:alpine AS runtime
COPY --chown=101:101 nginx.conf /etc/nginx/nginx.conf
COPY --from=build --chown=101:101 /app/dist/ /usr/share/nginx/html/

USER 101:101
EXPOSE 8080

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --spider --quiet http://127.0.0.1:8080/healthz || exit 1
