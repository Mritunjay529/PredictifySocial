import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsConfigPaths from "vite-tsconfig-paths";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";

export default defineConfig({
  plugins: [
    tanstackStart({
      ssr: true,
      serverBuildFile: "server.js",
      optimizeDeps: {
        exclude: ["@tanstack/react-start/server-entry"],
      },
    }),
    react(),
    tailwindcss(),
    tsConfigPaths(),
  ],
  optimizeDeps: {
    exclude: ["@tanstack/react-start/server-entry"],
  },
  resolve: {
    dedupe: ["react", "react-dom"],
  },
  build: {
    target: "esnext",
    minify: true,
  },
  server: {
    host: "127.0.0.1",
    port: 3000,
    strictPort: true,
  },
});
