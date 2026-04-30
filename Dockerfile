FROM node:20-alpine AS builder

WORKDIR /app

# Copy project files
COPY . .

# Install backend dependencies
WORKDIR /app/Backend
RUN npm install --omit=dev

# Install frontend dependencies and build
WORKDIR /app/Frontend
RUN npm install && npm run build

# Production stage
FROM node:20-alpine

WORKDIR /app

# Copy only necessary files from builder
COPY --from=builder /app/Backend ./Backend
COPY --from=builder /app/Frontend/dist ./Frontend/dist

# Setup backend public folder with frontend build
RUN mkdir -p Backend/public && cp -r Frontend/dist/* Backend/public/

# Expose port
EXPOSE 5000

# Start backend server
WORKDIR /app/Backend
CMD ["npm", "start"]
