# Utiliza la imagen oficial de Node.js que coincida con la versión de tu proyecto
FROM node:16.17.0

# Establece el directorio de trabajo en /src
WORKDIR /src

# Copia el archivo package.json y package-lock.json (si existe)
COPY package*.json ./

# Instala las dependencias de la aplicación
RUN npm install

# Copia el resto de la aplicación
COPY . .

# Expone un puerto si es necesario
EXPOSE 3000

# Comando para iniciar tu aplicación
CMD ["npm", "run", "dev"]
