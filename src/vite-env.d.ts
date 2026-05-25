/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_NAME: string;
  readonly VITE_APP_TAGLINE: string;
  readonly VITE_SITE_URL: string;
  readonly VITE_CONTACT_EMAIL: string;
  readonly VITE_CLOUDINARY_BASE_URL: string;
  readonly VITE_CLOUDINARY_PLACEHOLDER_URL: string;
  readonly VITE_DEV_PORT: string;
  readonly VITE_PREVIEW_PORT: string;
  readonly VITE_WHATSAPP_PHONE: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
