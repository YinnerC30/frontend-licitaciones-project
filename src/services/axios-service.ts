import { useAuthTenantStore } from '@/data/auth-tenant-store';
import { getApiUrl, logEnvConfig } from '@/utils/env-config';
import axios from 'axios';

// Log de configuración en modo debug
logEnvConfig();

export const AxiosInstance = axios.create({
  baseURL: getApiUrl(),
  timeout: 10000, // Aumentado el timeout para mejor experiencia
  headers: {
    'X-Custom-Header': 'foobar',
    'Content-Type': 'application/json',
  },
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
