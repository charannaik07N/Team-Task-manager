# Deployment Configuration

This file documents the deployment setup for Team-Task-Manager on Railway/Railpack.

## Files Created

### `start.sh`

- Main deployment script that Railpack/Railway looks for
- Installs dependencies for Backend and Frontend
- Builds the Frontend React app with Vite
- Copies the built frontend to Backend's `public` folder
- Starts the Express backend server

### `Procfile`

- Railway process file that tells Railway to run `bash start.sh`
- Standard Railway configuration file

### Backend Updates (`Backend/server.js`)

- Added `path` module import for file serving
- Added static file serving middleware to serve the Frontend build
- Added SPA fallback route (`*`) to serve `index.html` for React Router

## How It Works

1. **Build Process**: When deployed, `start.sh` installs deps and builds the frontend
2. **Static Serving**: The Express backend serves the React app as static files from the `public` folder
3. **API Routes**: All API requests go through Express routes (`/api/*`)
4. **SPA Routing**: Non-API routes fall back to `index.html` for React Router to handle

## Environment Variables Required

Make sure these are set in your Railway environment:

```
MONGODB_URI=<your_mongodb_connection_string>
PORT=<port_number> (default: 5000)
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

```bash
bash start.sh
```

This will build the app and start it on port 5000 (or your configured PORT).
