export default defineConfig({
    plugins: [react()],
    server: {
      port: 5173,
      host: true // Para Codespaces
    }
  })