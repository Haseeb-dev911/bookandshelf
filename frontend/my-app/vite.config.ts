import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import tailwindcss from "@tailwindcss/vite";
import checker from "vite-plugin-checker";


export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    checker({
      // Tell the checker to read project references (tsconfig.app.json)
      typescript: {
        buildMode: true,
      },
      overlay: {
        initialIsOpen: true,
        position: 'tr',
      },
    })
  ],
  // server: {
  //   port: 3000,
  //   open: true
  // },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
