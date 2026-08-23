import axiosInstance from './axiosInstance';
import { DEFAULT_TENANT_SLUG, getSlugFromPath } from '../utils/tenantSlug';

export async function fetchTenant(slug = getSlugFromPath()) {
  const resolved = slug || DEFAULT_TENANT_SLUG;

  const res = await axiosInstance.get('/tenant', {
    params: { slug: resolved },
    headers: { 'X-Tenant-Slug': resolved },
  });

  if (!res?.data) {
    throw new Error('Failed to load tenant');
  }

  return {
    ...res.data,
    code: res.data.code || resolved,
    plan: res.data.plan || 'basic',
    theme: res.data.theme || {},
    customization: res.data.customization || {},
  };
}
