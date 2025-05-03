# Usa la imagen oficial de Node.js como base para construir
FROM node:23-alpine AS build

# Establece el directorio de trabajo
WORKDIR /app

# Copia los archivos de dependencias
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el código fuente
COPY . .

# Ejecuta la construcción
RUN npm run build

# Usa Nginx para servir los archivos generados
FROM nginx:alpine


COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copia los archivos generados por Vite a Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Exponer el puerto 3000
EXPOSE 80
