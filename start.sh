#!/bin/bash

# Exit on error
set -e

echo "🚀 Starting deployment process..."

# Ensure npm is available
if ! command -v npm &> /dev/null; then
    echo "⚠️  npm not found in PATH, trying to find Node.js..."
    export PATH="/usr/local/bin:$PATH:/opt/render/project/.nvm/versions/node/v*/bin"
fi

# Verify Node and npm are available
echo "Checking Node.js installation..."
node --version
npm --version

# Install backend dependencies
echo "📦 Installing backend dependencies..."
cd Backend
npm ci --only=production || npm install
cd ..

# Install frontend dependencies and build
echo "📦 Installing frontend dependencies..."
cd Frontend
npm ci --only=production || npm install

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
