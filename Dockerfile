# frontend/Dockerfile

FROM node:20-alpine

WORKDIR /app

# Install deps
COPY package*.json ./
RUN npm install

# Copy source
COPY . .

# Build with envs passed at build time
ARG VITE_API_BASE_URL
ARG VITE_AUTH_BASE_URL
ENV VITE_API_BASE_URL=${VITE_API_BASE_URL}
ENV VITE_AUTH_BASE_URL=${VITE_AUTH_BASE_URL}

RUN npm run build

# Use "serve" to serve static files
RUN npm install -g serve

EXPOSE 3000
CMD ["serve", "-s", "dist", "-l", "3000"]
