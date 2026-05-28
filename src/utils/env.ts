const PLACEHOLDER_FALLBACK =
  'https://res.cloudinary.com/my-projects-cloudinary/image/upload/v1779735683/Ednitha/muneca-trapo_hq9p3g.jpg';

function envVar(key: keyof ImportMetaEnv, fallback?: string): string {
  const value = import.meta.env[key];
  if (typeof value === 'string' && value.length > 0) {
    return value;
  }
  if (fallback !== undefined) {
    return fallback;
  }
  throw new Error(`Variable de entorno requerida no definida: ${key}`);
}

export const env = {
  appName: envVar('VITE_APP_NAME', 'Ednitha'),
  appTagline: envVar('VITE_APP_TAGLINE', 'Manualidades con alma'),
  siteUrl: envVar('VITE_SITE_URL', 'http://localhost:5173'),
  contactEmail: envVar('VITE_CONTACT_EMAIL', 'contacto@ednitha.com'),
  cloudinaryBaseUrl: envVar(
    'VITE_CLOUDINARY_BASE_URL',
    'https://res.cloudinary.com/my-projects-cloudinary/image/upload',
  ),
  placeholderImageUrl: envVar('VITE_CLOUDINARY_PLACEHOLDER_URL', PLACEHOLDER_FALLBACK),
  whatsappPhone: envVar('VITE_WHATSAPP_PHONE', '573185755283'),
} as const;
