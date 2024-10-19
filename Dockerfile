FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8000

# Establecer variable de entorno para evitar buffering
ENV NODE_ENV=development

# Opción adicional para mayor detalle en logs
ENV NODE_OPTIONS="--trace-uncaught"

RUN chmod +x ./start.sh
CMD ["./start.sh"]
