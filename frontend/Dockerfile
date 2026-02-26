FROM node:20-slim

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Vite dev server with 3000 port
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0", "--port", "3000"]
