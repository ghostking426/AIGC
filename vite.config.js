import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";
// https://vitejs.dev/config/
export default defineConfig({
  base: "./",
  plugins: [vue()],
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
  server: {
    //port: 5173,
    port: 9999,
    host: "0.0.0.0",
    cors: true, // 默认启用并允许任何源
    open: true, // 在服务器启动时自动在浏览器中打开应用程序
    //反向代理配置，注意rewrite写法
    proxy: {
      // 跨域代理
      "/bpi": {
        target: "http://198.211.58.78:8088",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/bpi/, "admin"),
      },
      "/api": {
        target: "http://198.211.58.78:8111",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
