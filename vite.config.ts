import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  // 服务端口配置
  server: {
    port: 5173,
    open: true,
    proxy: {},
    cors: true,
    headers: {
      "Service-Worker-Allowed": "/",
    },
  },
});
