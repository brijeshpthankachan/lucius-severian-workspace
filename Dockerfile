# ---------------------------------------
# Stage 1: Build the Angular Application
# ---------------------------------------
FROM node:26-alpine AS builder

# Set the working directory inside the container
WORKDIR /app

# Install pnpm globally via npm
RUN npm install -g pnpm

# Copy dependency manifests first to leverage Docker layer caching
COPY package.json pnpm-lock.yaml ./

# Install dependencies and explicitly allow native build scripts in Docker
RUN pnpm install --frozen-lockfile --config.dangerouslyAllowAllBuilds=true

# Copy the rest of the application source code
COPY . .

# Build the Angular application (this generates the /dist folder)
RUN pnpm run build

# ---------------------------------------
# Stage 2: Production Server Environment
# ---------------------------------------
FROM node:26-alpine AS runner

WORKDIR /app

# Copy the compiled assets from the builder stage
COPY --from=builder /app/dist/web-ui ./dist

# Expose the port your Express server is configured to listen on
EXPOSE 4000

ENV NG_ALLOWED_HOSTS="localhost,localhost:4000"

# Start the Node.js server
CMD ["node", "dist/server/server.mjs"]
