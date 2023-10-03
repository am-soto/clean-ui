/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_SUPABASE_URL: string;
  readonly VITE_API_SUPABASE_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
