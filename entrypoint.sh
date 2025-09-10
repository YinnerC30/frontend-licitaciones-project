#!/bin/sh

# Script de entrypoint para generar env-config.js dinámicamente
# Este script se ejecuta cada vez que el contenedor inicia

echo "Generando configuración de variables de entorno..."

# Crear el archivo env-config.js con las variables de entorno del contenedor
cat <<EOF > /usr/share/nginx/html/env-config.js
window._env_ = {
  VITE_API_URL: "${VITE_API_URL:-http://localhost:3000}",
  VITE_APP_NAME: "${VITE_APP_NAME:-Licitame}",
  VITE_APP_VERSION: "${VITE_APP_VERSION:-1.0.0}",
  VITE_ENVIRONMENT: "${VITE_ENVIRONMENT:-production}",
  VITE_DEBUG: "${VITE_DEBUG:-false}"
};
EOF

echo "Variables de entorno configuradas:"
echo "- VITE_API_URL: ${VITE_API_URL:-http://localhost:3000}"
echo "- VITE_APP_NAME: ${VITE_APP_NAME:-Licitame}"
echo "- VITE_APP_VERSION: ${VITE_APP_VERSION:-1.0.0}"
echo "- VITE_ENVIRONMENT: ${VITE_ENVIRONMENT:-production}"
echo "- VITE_DEBUG: ${VITE_DEBUG:-false}"

# Iniciar nginx
echo "Iniciando Nginx..."
exec nginx -g "daemon off;"
