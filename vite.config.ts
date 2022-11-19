import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  // 服务端口配置
  server: {
    port: 5173,
    open: true,
    proxy: {
      // 配置代理
      "/api": {
        target: "http://localhost:8080/",
        changeOrigin: true,
        rewrite: (path: string): string => path.replace(/^\/api/, ""),
      },
    },
    cors: true,
    headers: {
      // 为启用 SharedArrayBuffer 进行配置
      // "Cross-Origin-Opener-Policy": "same-origin",
      // "Cross-Origin-Embedder-Policy": "require-corp",
    },
  },
});
