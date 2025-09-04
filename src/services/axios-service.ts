import { useAuthTenantStore } from '@/data/auth-tenant-store';
import axios from 'axios';

export const AxiosInstance = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 1000,
  headers: { 'X-Custom-Header': 'foobar' },
  withCredentials: true,
});

AxiosInstance.interceptors.request.use((config) => {
  // Obtener el tenantId del almacenamiento zustand
  try {
    const state = useAuthTenantStore.getState();
    const { tenantId } = state;
    if (tenantId) {
      config.headers['x-tenant-id'] = tenantId;
    }
  } catch (error) {}

  return config;
});
