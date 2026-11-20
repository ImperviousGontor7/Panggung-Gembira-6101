import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath, URL } from "node:url";

export default defineConfig({
  root: ".",

  plugins: [react()],

  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
      "@public": fileURLToPath(new URL("./public", import.meta.url)),
      "@shared": fileURLToPath(new URL("../shared", import.meta.url)),
    },
  },

  server: {
    host: "0.0.0.0",
    port: 5174,
    strictPort: true,
    open: true,

    proxy: {
      "/api": {
        target: "http://localhost:5000", // ganti jika backend memakai port lain
        changeOrigin: true,
      },

      "/socket.io": {
        target: "http://localhost:5000",
        changeOrigin: true,
        ws: true,
      },
    },
  },

  preview: {
    host: "0.0.0.0",
    port: 4173,
  },

  build: {
    outDir: "../dist/client",
    emptyOutDir: true,
    sourcemap: false,
  },
});