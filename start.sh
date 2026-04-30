#!/bin/bash

# Exit on error
set -e

echo "🚀 Starting deployment process..."

# Install backend dependencies
echo "📦 Installing backend dependencies..."
cd Backend
npm install
cd ..

# Install frontend dependencies and build
echo "📦 Installing frontend dependencies..."
cd Frontend
npm install

echo "🔨 Building frontend..."
npm run build
cd ..

# Copy frontend build to backend public folder
echo "📁 Setting up static files..."
mkdir -p Backend/public
cp -r Frontend/dist/* Backend/public/ 2>/dev/null || true

# Start the backend server
echo "✅ Starting backend server..."
cd Backend
npm start
