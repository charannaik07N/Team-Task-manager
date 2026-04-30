# Deployment Configuration

This file documents the deployment setup for Team-Task-Manager on Railway/Railpack.

## Files Created

### `package.json` (Root)

- Root-level package.json tells Railpack/Railway this is a Node.js project
- Specifies Node.js engine requirement (>=18.0.0)
- Points to Backend/server.js as the main entry point
- Prevents Railpack from trying to detect the project type

### `Dockerfile`

- **Recommended approach**: Explicit Docker-based deployment
- Uses Node.js 18 Alpine image (lightweight)
- Handles complete build process in a controlled environment
- Ensures all dependencies are installed correctly
- Exposes port 5000 and runs the backend server

### `start.sh`

- Fallback deployment script for Railpack/Railway
- Installs dependencies for Backend and Frontend
- Builds the Frontend React app with Vite
- Copies the built frontend to Backend's `public` folder
- Starts the Express backend server
- Handles npm path detection and Node.js version checking

### `Procfile`

- Railway process file (optional with Dockerfile)
- Tells Railway to run `bash start.sh` if Dockerfile not used

### Backend Updates (`Backend/server.js`)

- Added `path` module import for file serving
- Added static file serving middleware to serve the Frontend build
- Added an Express 5-safe SPA fallback route to serve `index.html` for React Router

## Deployment Options

### Option 1: Dockerfile (Recommended)

Railway will automatically detect the Dockerfile and use it:

1. Builds using Node.js 18 Alpine
2. Installs all dependencies
3. Builds the frontend
4. Starts the backend server

**No additional configuration needed** - Railway auto-detects and uses Dockerfile.

### Option 2: Railpack with start.sh

If Railway doesn't detect the Dockerfile:

1. Uses root `package.json` to identify as Node.js project
2. Runs `start.sh` via `Procfile`
3. Builds and starts the application

## How It Works

1. **Build Process**: Installs deps and builds the frontend
2. **Static Serving**: The Express backend serves the React app as static files from the `public` folder
3. **API Routes**: All API requests go through Express routes (`/api/*`)
4. **SPA Routing**: Non-API routes fall back to `index.html` for React Router to handle

## Environment Variables Required

Make sure these are set in your Railway environment:

```
MONGODB_URI=<your_mongodb_connection_string>
PORT=<port_number> (default: 5000)
NODE_ENV=production
```

## CORS Configuration

Update the CORS origin in `Backend/server.js` after deployment to include your Railway domain:

```javascript
cors({
  origin: ["https://your-railway-domain.up.railway.app"],
  credentials: true,
});
```

## Local Testing

To test the deployment setup locally:

### Using Dockerfile (recommended):

```bash
docker build -t team-task-manager .
docker run -p 5000:5000 -e MONGODB_URI=<your_uri> team-task-manager
```

### Using start.sh:

```bash
bash start.sh
```

Both will build the app and start it on port 5000 (or your configured PORT).
