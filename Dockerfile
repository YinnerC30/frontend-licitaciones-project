# Etapa 1: Construcción
FROM node:20-alpine AS builder

WORKDIR /app

# Copiamos dependencias y las instalamos
COPY package*.json ./
RUN npm install

# Copiamos el resto del código y construimos
COPY . .
RUN npm run build

# Etapa 2: Servir con Nginx
FROM nginx:latest

# Eliminamos configuración por defecto y agregamos la nuestra
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d

# Copiamos los archivos generados por Vite
COPY --from=builder /app/dist /usr/share/nginx/html

# Exponemos el puerto
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
