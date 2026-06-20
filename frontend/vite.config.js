import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes("node_modules")) return;
          if (id.includes("react-dom") || id.includes("react-router")) return "react-vendor";
          if (id.includes("react")) return "react-vendor";
          if (id.includes("motion") || id.includes("framer-motion")) return "motion-vendor";
          if (id.includes("i18next")) return "i18n-vendor";
          if (id.includes("swiper")) return "swiper-vendor";
          if (id.includes("axios")) return "axios-vendor";
          if (id.includes("lucide-react")) return "lucide-vendor";
        },
      },
    },
  },
});
