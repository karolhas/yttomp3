import { defineConfig } from "vite";
import * as dotenv from "dotenv";
import react from "@vitejs/plugin-react";

dotenv.config();

export default defineConfig({
  server: {
    proxy: {
      "/api/youtube-mp3": {
        target: "https://youtube-mp36.p.rapidapi.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/youtube-mp3/, ""),
        configure: (proxy) => {
          const apiKey = process.env.VITE_RAPID_API_KEY as string;

          if (!apiKey) {
            throw new Error(
              "VITE_RAPID_API_KEY is not defined. Please set it in your .env file."
            );
          }

          proxy.on("proxyReq", (proxyReq) => {
            proxyReq.setHeader("X-RapidAPI-Key", apiKey);
            proxyReq.setHeader(
              "X-RapidAPI-Host",
              "youtube-mp36.p.rapidapi.com"
            );
          });
        },
      },
    },
  },
  plugins: [react()],
});
