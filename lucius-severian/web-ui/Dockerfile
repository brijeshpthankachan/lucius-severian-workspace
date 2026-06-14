# ---------------------------------------
# Stage 1: Build the Angular Application
# ---------------------------------------
FROM node:26-alpine AS builder

WORKDIR /app

# Migration to npm to resolve pnpm lockfile sync issues
COPY package.json package-lock.json* ./

RUN npm ci || npm install

COPY . .

RUN npm run build

# ---------------------------------------
# Stage 2: Serve with Nginx
# ---------------------------------------
FROM nginx:alpine AS runner

COPY --from=builder /app/dist/web-ui/browser /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
