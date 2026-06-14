# ---------------------------------------
# Stage 1: Build the Angular Application
# ---------------------------------------
FROM node:26-alpine AS builder

WORKDIR /app

RUN npm install -g pnpm

COPY package.json pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile --config.dangerouslyAllowAllBuilds=true

COPY . .

RUN pnpm run build

# ---------------------------------------
# Stage 2: Serve with Nginx
# ---------------------------------------
FROM nginx:alpine AS runner

COPY --from=builder /app/dist/web-ui/browser /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
