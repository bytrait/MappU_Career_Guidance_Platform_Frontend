/** Default tenant slug (ByTrait platform brand). */
export const DEFAULT_TENANT_SLUG = 'bytrait';

const RESERVED_SEGMENTS = new Set([
  'login',
  'register',
  'counsellor',
  'demo',
  'assessment',
  'report',
  'payment',
  'careers',
  'career',
  'career_content',
  'congratulations',
  'api',
  'assets',
  'favicons',
  'logos',
  'src',
]);

export function getSlugFromPath(pathname = window.location.pathname) {
  const parts = pathname.split('/').filter(Boolean);
  if (parts.length === 0) return DEFAULT_TENANT_SLUG;

  const first = parts[0].toLowerCase();
  if (RESERVED_SEGMENTS.has(first)) return DEFAULT_TENANT_SLUG;
  if (first === 'default' || first === 'www') return DEFAULT_TENANT_SLUG;

  return first;
}

export function tenantPath(slug, path = '/') {
  const cleanSlug = (slug || DEFAULT_TENANT_SLUG).toLowerCase();
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `/${cleanSlug}${cleanPath === '/' ? '' : cleanPath}`;
}

export function authRedirectUrl(slug, path = '/') {
  const base = (import.meta.env.VITE_REDIRECT_URL || '').replace(/\/$/, '');
  return `${base}${tenantPath(slug, path)}`;
}
