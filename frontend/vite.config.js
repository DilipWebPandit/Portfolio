import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  define: {
    // react-pdf (pdfjs) expects process.env to exist — add this for Vite
    "process.env": {},
  },
});
