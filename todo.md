## The Containerization To-Do List

### Phase 1: Local Preparation

- [ ] **Verify Local Build:** Run your production build command locally (`pnpm build` or `npm run build`) to ensure there are no TypeScript or Angular compilation errors before introducing Docker.
- [ ] **Check Output Path:** Inspect your local `dist/` directory. Note the exact folder name containing your server bundle (usually `dist/<project-name>/server/server.mjs`).
- [ ] **Create `.dockerignore`:** Add a `.dockerignore` file to your project root to exclude `node_modules`, `.angular`, and `dist` from the build context.

### Phase 2: Configuration & Image Building

- [ ] **Create `Dockerfile`:** Add a standard, multi-stage `Dockerfile` to your project root.
- [ ] **Configure Stage 1 (Builder):** Use a Node alpine image, copy dependency files, run your package manager install, and trigger the production build inside the container.
- [ ] **Configure Stage 2 (Runner):** Use a fresh Node alpine image, copy _only_ the compiled `dist` files from Stage 1, expose your port (e.g., `4000`), and define the `CMD` to execute the server.
- [ ] **Execute Build Command:** Run `docker build -t angular-ssr-app .` in your terminal.

### Phase 3: Verification & Testing

- [ ] **Run the Container:** Launch the container locally using port mapping: `docker run -p 4000:4000 angular-ssr-app`.
- [ ] **Verify Logs:** Confirm the terminal outputs your Node Express server startup message.
- [ ] **Test in Browser:** Navigate to `http://localhost:4000` to verify that Server-Side Rendering is working and assets load correctly.
