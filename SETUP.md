# SETUP GUIDE - Team Task Manager

Complete step-by-step guide to get the application running.

## 🎯 Quick Start (5 minutes)

### Prerequisites

- Node.js v14+ and npm installed
- MongoDB running locally or MongoDB Atlas account

### Step 1: Backend Setup

```bash
# Navigate to Backend directory
cd Backend

# Install dependencies
npm install

# Start the server
npm run dev
```

✅ Backend running on `http://localhost:5000`

### Step 2: Frontend Setup

Open a **new terminal window**:

```bash
# Navigate to Frontend directory
cd Frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

✅ Frontend running on `http://localhost:5173`

### Step 3: Access the Application

Open your browser and go to:

```
http://localhost:5173
```

### Step 4: Create Your Account

1. Click "Sign Up"
2. Enter name, email, and password
3. Click "Sign Up" button
4. You'll be redirected to Dashboard

## 📋 Detailed Setup Instructions

### Backend Configuration

#### 1. MongoDB Setup

**Option A: Local MongoDB**

```bash
# On Windows, ensure MongoDB is running as a service
# On Mac: brew services start mongodb-community
# On Linux: sudo systemctl start mongod

# Verify MongoDB is running
mongosh
```

**Option B: MongoDB Atlas (Cloud)**

1. Go to [mongodb.com/cloud/atlas](https://mongodb.com/cloud/atlas)
2. Create free account
3. Create new cluster
4. Get connection string
5. Update in Backend/.env

#### 2. Backend Environment Variables

Create `Backend/.env`:

```bash
cd Backend
cat > .env << EOF
PORT=5000
MONGODB_URI=mongodb://localhost:27017/team-task-manager
JWT_SECRET=change_this_to_a_random_string_in_production_at_least_32_characters_long
JWT_EXPIRE=7d
NODE_ENV=development
EOF
```

#### 3. Install Backend Dependencies

```bash
npm install
```

**Dependencies installed:**

- express: Web framework
- mongoose: MongoDB ORM
- bcrypt: Password encryption
- jsonwebtoken: JWT tokens
- express-validator: Input validation
- cors: Cross-origin support
- dotenv: Environment variables

#### 4. Start Backend Server

```bash
# Development mode (with auto-restart on changes)
npm run dev

# Or production mode
npm start
```

Check if running:

```bash
curl http://localhost:5000/health
# Should return: { "status": "Server is running" }
```

### Frontend Configuration

#### 1. Install Dependencies

```bash
cd Frontend
npm install
```

**Dependencies installed:**

- react: UI library
- react-router-dom: Routing
- axios: HTTP client
- tailwindcss: CSS framework
- lucide-react: Icons

#### 2. Start Development Server

```bash
npm run dev
```

Access at: `http://localhost:5173`

#### 3. API Configuration (Optional)

If using different API URL, edit `Frontend/src/services/api.js`:

```javascript
const API_BASE_URL = "http://localhost:5000/api";
```

## 🧪 Test the Application

### Create Test User

1. Go to `http://localhost:5173`
2. Click "Sign Up"
3. Enter:
   - Name: John Doe
   - Email: john@example.com
   - Password: password123

### Test Project Creation

1. Go to Projects page
2. Click "New Project"
3. Enter project details
4. Click "Create Project"

### Test Task Creation

1. Click on a project
2. Click "New Task"
3. Fill in task details
4. Click "Create Task"

### Test Dashboard

1. Go to Dashboard
2. Should see statistics about tasks

## 🔍 Verify Everything is Working

### Backend API Test

```bash
# Health check
curl http://localhost:5000/health

# Register user
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"password123"}'

# Login user
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

### Frontend Accessibility

- Login page: `http://localhost:5173/login`
- Sign up page: `http://localhost:5173/signup`
- Dashboard: `http://localhost:5173/dashboard` (requires login)
- Projects: `http://localhost:5173/projects` (requires login)
- Profile: `http://localhost:5173/profile` (requires login)

## 📦 Production Build

### Build Frontend

```bash
cd Frontend
npm run build
```

Creates optimized build in `Frontend/dist/` folder.

### Deploy Frontend

**Option 1: Vercel**

```bash
npm install -g vercel
vercel
```

**Option 2: Netlify**

1. Push to GitHub
2. Connect on netlify.com
3. Set build command: `npm run build`
4. Set publish directory: `dist`

### Deploy Backend

**Option 1: Heroku**

```bash
heroku create your-app-name
git push heroku main
```

**Option 2: Railway.app**

1. Connect GitHub repo
2. Add environment variables
3. Deploy

**Option 3: Docker**
Create `Backend/Dockerfile`:

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 5000
CMD ["npm", "start"]
```

## ⚠️ Troubleshooting

### Issue: "MongoDB connection failed"

**Solution:**

- Ensure MongoDB is running: `mongosh`
- Check connection string in `.env`
- For MongoDB Atlas, whitelist your IP

### Issue: "Port 5000 already in use"

**Solution:**

```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Mac/Linux
lsof -i :5000
kill -9 <PID>
```

Or change PORT in `Backend/.env`

### Issue: "Cannot GET /dashboard" after login

**Solution:**

- Verify frontend is running on port 5173
- Check that backend is accessible
- Clear browser cache and localStorage

### Issue: "CORS error in browser"

**Solution:**

- Backend CORS is configured to accept `http://localhost:5173`
- If using different port, update in `Backend/server.js`:

```javascript
app.use(
  cors({
    origin: "http://localhost:YOUR_PORT",
    credentials: true,
  }),
);
```

### Issue: "npm install fails"

**Solution:**

```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Reinstall
npm install
```

## 📚 Learning Resources

### MERN Stack

- React: [react.dev](https://react.dev)
- Node.js: [nodejs.org](https://nodejs.org)
- Express: [expressjs.com](https://expressjs.com)
- MongoDB: [mongodb.com/docs](https://mongodb.com/docs)

### Libraries

- Tailwind: [tailwindcss.com](https://tailwindcss.com)
- Axios: [axios-http.com](https://axios-http.com)
- React Router: [reactrouter.com](https://reactrouter.com)

## 📝 File Structure Summary

```
Team-Task-Manager/
├── Backend/                    # Express.js API
│   ├── models/                # Database models
│   ├── controllers/           # Business logic
│   ├── routes/                # API routes
│   ├── middleware/            # Custom middleware
│   ├── utils/                 # Utility functions
│   ├── .env                   # Environment config
│   └── server.js              # Entry point
│
├── Frontend/                   # React.js UI
│   ├── src/
│   │   ├── components/        # React components
│   │   ├── pages/             # Page components
│   │   ├── services/          # API services
│   │   ├── context/           # State context
│   │   ├── hooks/             # Custom hooks
│   │   ├── App.jsx            # Main component
│   │   └── index.css          # Tailwind CSS
│   ├── index.html             # HTML entry point
│   └── vite.config.js         # Vite config
│
└── README.md                   # Project documentation
```

## 🚀 Next Steps

1. ✅ Get application running
2. 📖 Read Backend README for API details
3. 📖 Read Frontend README for component details
4. 🧪 Explore the codebase
5. 🎨 Customize styling
6. 🚀 Deploy to production

## 💡 Tips

- Use VS Code for better development experience
- Install Thunder Client or Postman for API testing
- Enable React DevTools browser extension
- Use MongoDB Compass for database visualization
- Keep `.env` files in `.gitignore`

## 🔐 Security Reminders

- Never commit `.env` files
- Use strong JWT_SECRET in production
- Keep dependencies updated: `npm update`
- Enable HTTPS for production
- Use environment variables for sensitive data

## 📞 Support

If you encounter issues:

1. Check browser console for errors
2. Check backend terminal output
3. Verify all ports are free
4. Ensure MongoDB is running
5. Check `.env` configuration
6. Review README files

---

**Happy coding! 🎉**
