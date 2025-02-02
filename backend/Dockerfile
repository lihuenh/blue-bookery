# Usa la imagen oficial de Node.js como base
FROM node:18-alpine

# Establece el directorio de trabajo
WORKDIR /app

# Copia el archivo package.json y el lockfile
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el código fuente de la aplicación
COPY . .

COPY wait-for-db.sh /app/wait-for-db.sh 
RUN chmod +x /app/wait-for-db.sh 

# Expone el puerto que Express usará
EXPOSE 5000

ENTRYPOINT ["/app/wait-for-db.sh"]