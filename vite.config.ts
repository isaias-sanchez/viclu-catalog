import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// Configuración limpia sin dependencias de Lovable
export default defineConfig({
  // Configuración por defecto (localhost:5173)
  server: {
    open: true, // Abrir navegador automáticamente
  },
  plugins: [
    react(),
    // Hemos eliminado el "componentTagger()" de Lovable aquí
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});