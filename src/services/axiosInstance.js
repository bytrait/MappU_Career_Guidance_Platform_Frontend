import axios from 'axios';
import { getSlugFromPath } from '../utils/tenantSlug';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // like http://localhost:4000/api/v1
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

API.interceptors.request.use((config) => {
  const slug = getSlugFromPath();
  config.headers = config.headers || {};
  config.headers['X-Tenant-Slug'] = slug;
  return config;
});

export default API;
