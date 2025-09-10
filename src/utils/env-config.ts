/**
 * Utilidad para acceder a variables de entorno en tiempo de runtime
 * Estas variables se cargan dinámicamente desde env-config.js generado por el contenedor
 */

// Declarar el tipo para window._env_
declare global {
  interface Window {
    _env_?: {
      VITE_API_URL?: string;
      VITE_APP_NAME?: string;
      VITE_APP_VERSION?: string;
      VITE_ENVIRONMENT?: string;
      VITE_DEBUG?: string;
    };
  }
}

/**
 * Obtiene una variable de entorno del objeto window._env_
 * @param key - La clave de la variable de entorno
 * @param defaultValue - Valor por defecto si la variable no existe
 * @returns El valor de la variable de entorno o el valor por defecto
 */
export const getEnvVar = (
  key: string,
  defaultValue?: string
): string | undefined => {
  // Primero intentar obtener de window._env_ (runtime)
  if (typeof window !== 'undefined' && window._env_) {
    const value = window._env_[key as keyof typeof window._env_];
    if (value !== undefined) {
      return value;
    }
  }

  // Fallback a import.meta.env (build time) para desarrollo
  try {
    // @ts-ignore - import.meta es específico de Vite y puede no estar disponible en todos los contextos
    if (import.meta && import.meta.env) {
      // @ts-ignore
      const value = import.meta.env[key];
      if (value !== undefined) {
        return value;
      }
    }
  } catch (error) {
    // Silenciar errores si import.meta no está disponible
  }

  return defaultValue;
};

/**
 * Obtiene la URL base de la API
 */
export const getApiUrl = (): string => {
  return (
    getEnvVar('VITE_API_URL', 'http://localhost:3000') ||
    'http://localhost:3000'
  );
};

/**
 * Obtiene el nombre de la aplicación
 */
export const getAppName = (): string => {
  return getEnvVar('VITE_APP_NAME', 'Licitame') || 'Licitame';
};

/**
 * Obtiene la versión de la aplicación
 */
export const getAppVersion = (): string => {
  return getEnvVar('VITE_APP_VERSION', '1.0.0') || '1.0.0';
};

/**
 * Obtiene el entorno actual
 */
export const getEnvironment = (): string => {
  return getEnvVar('VITE_ENVIRONMENT', 'production') || 'production';
};

/**
 * Verifica si el modo debug está habilitado
 */
export const isDebugMode = (): boolean => {
  const debug = getEnvVar('VITE_DEBUG', 'false');
  return debug === 'true';
};

/**
 * Obtiene todas las variables de entorno disponibles
 */
export const getAllEnvVars = () => {
  return {
    apiUrl: getApiUrl(),
    appName: getAppName(),
    appVersion: getAppVersion(),
    environment: getEnvironment(),
    debug: isDebugMode(),
  };
};

/**
 * Log de configuración (solo en modo debug)
 */
export const logEnvConfig = () => {
  if (isDebugMode()) {
    console.log('🔧 Configuración de variables de entorno:', getAllEnvVars());
  }
};
