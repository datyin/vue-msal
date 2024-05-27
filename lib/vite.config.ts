import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  plugins: [
    vue(),
  ],
  build: {
    minify: false,
    lib: {
      name: "VueMSALProvider",
      formats: ["es", "cjs", "umd"],
      entry: {
        index: "src/index.ts",
      },
    },
    rollupOptions: {
      external: [
        "vue",
        "@azure/msal-browser",
      ],
      output: {
        globals: {
          "vue": "Vue",
          "@azure/msal-browser": "msal",
        },
      },
    },
  },
});
