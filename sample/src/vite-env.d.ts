/// <reference types="vite/client" />

declare module "*.vue" {
  import type { ComponentOptions } from "vue";

  const component: ComponentOptions;
  export default component;
}

interface ImportMetaEnv {
  readonly VITE_CLIENT_ID: string;
  readonly VITE_AUTHORITY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
