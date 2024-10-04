# 1. Utilizar una imagen base con Node.js
FROM node:20-alpine

# 2. Establecer el directorio de trabajo en el contenedor
WORKDIR /app

# 3. Copiar solo los archivos de dependencias (para aprovechar la cache de Docker)
COPY package*.json ./

# 4. Instalar las dependencias
RUN npm install

# 5. Copiar el resto del código de la aplicación al contenedor
COPY . .

# 6. Compilar el código TypeScript a JavaScript
RUN npx prisma generate
RUN npx prisma migrate deploy
RUN npm run build


# 7. Exponer el puerto de la aplicación (ajústalo según sea necesario)
EXPOSE 8000

# 8. Definir el comando de inicio para ejecutar la aplicación compilada
CMD ["npm", "run", "start"]
