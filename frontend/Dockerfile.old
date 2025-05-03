# Usa la imagen oficial de Node.js como base
FROM node:23-alpine

# Establece el directorio de trabajo
WORKDIR /app

# Copia el archivo package.json y el lockfile para instalar las dependencias
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el código fuente de la aplicación
COPY . .

# Expone el puerto que Vite usará
EXPOSE 3000

# Inicia el servidor de desarrollo de Vite
CMD ["npm", "run", "dev"]
