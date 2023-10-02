import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: (tag) =>
            ["home-layout", "delete-loading-overlay", "trash-icon"]
              .map((item) => tag.includes(item))
              .some((t) => t === true),
        },
      },
    }),
  ],
  server: {
    port: 8080,
  },
});
