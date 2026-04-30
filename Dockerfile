FROM node:18-alpine

WORKDIR /app

# Copy entire project
COPY . .

# Install backend dependencies
WORKDIR /app/Backend
RUN npm ci --only=production || npm install

# Install frontend dependencies and build
WORKDIR /app/Frontend
RUN npm ci --only=production || npm install && npm run build

# Setup backend public folder with frontend build
WORKDIR /app
RUN mkdir -p Backend/public && cp -r Frontend/dist/* Backend/public/ || true

# Expose port (Railway will detect this)
EXPOSE 5000

# Start backend server
WORKDIR /app/Backend
CMD ["npm", "start"]
