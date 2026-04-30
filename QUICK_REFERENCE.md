# QUICK REFERENCE GUIDE

One-page reference for all important commands and information.

## 🚀 Start Here

### Run Backend

```bash
cd Backend
npm install      # First time only
npm run dev      # Start development server
```

### Run Frontend (New Terminal)

```bash
cd Frontend
npm install      # First time only
npm run dev      # Start development server
```

### Access Application

```
http://localhost:5173
```

---

## 📋 Key Files & Locations

| Component    | Location                                  | Purpose           |
| ------------ | ----------------------------------------- | ----------------- |
| Server Entry | Backend/server.js                         | Express app setup |
| Auth Logic   | Backend/controllers/authController.js     | Login/Register    |
| Projects API | Backend/routes/projects.js                | Project endpoints |
| Tasks API    | Backend/routes/tasks.js                   | Task endpoints    |
| Main App     | Frontend/src/App.jsx                      | React routing     |
| Dashboard    | Frontend/src/pages/DashboardPage.jsx      | Stats page        |
| Projects     | Frontend/src/pages/ProjectsPage.jsx       | Projects list     |
| Project View | Frontend/src/pages/ProjectDetailsPage.jsx | Tasks board       |

---

## 🔐 Default Credentials (After Signup)

```
Email: your@email.com
Password: password123
```

---

## 📊 Database Collections

```
Users
├── _id
├── name
├── email
├── password (hashed)
└── createdAt

Projects
├── _id
├── name
├── description
├── createdBy (ref: User)
├── members [{ userId, role }]
└── createdAt

Tasks
├── _id
├── title
├── description
├── projectId (ref: Project)
├── assignedTo (ref: User)
├── status (Todo/In Progress/Done)
├── priority (Low/Medium/High)
├── dueDate
├── createdBy (ref: User)
└── createdAt
```

---

## 🔌 API Endpoints Quick Reference

### Auth

| Method | Endpoint       | Auth | Purpose          |
| ------ | -------------- | ---- | ---------------- |
| POST   | /auth/register | ❌   | Create account   |
| POST   | /auth/login    | ❌   | Login user       |
| GET    | /auth/me       | ✅   | Get current user |

### Projects

| Method | Endpoint              | Auth | Purpose        |
| ------ | --------------------- | ---- | -------------- |
| POST   | /projects             | ✅   | Create project |
| GET    | /projects             | ✅   | List projects  |
| GET    | /projects/:id         | ✅   | Get project    |
| PUT    | /projects/:id         | ✅   | Update project |
| DELETE | /projects/:id         | ✅   | Delete project |
| POST   | /projects/:id/members | ✅   | Add member     |
| DELETE | /projects/:id/members | ✅   | Remove member  |

### Tasks

| Method | Endpoint          | Auth | Purpose     |
| ------ | ----------------- | ---- | ----------- |
| POST   | /tasks            | ✅   | Create task |
| GET    | /tasks?projectId= | ✅   | Get tasks   |
| GET    | /tasks/:id        | ✅   | Get task    |
| PUT    | /tasks/:id        | ✅   | Update task |
| DELETE | /tasks/:id        | ✅   | Delete task |

### Dashboard

| Method | Endpoint   | Auth | Purpose   |
| ------ | ---------- | ---- | --------- |
| GET    | /dashboard | ✅   | Get stats |

---

## 🛠️ Common Commands

### Backend

```bash
cd Backend

# Installation
npm install

# Development
npm run dev

# Production
npm start

# Check health
curl http://localhost:5000/health
```

### Frontend

```bash
cd Frontend

# Installation
npm install

# Development
npm run dev

# Build for production
npm run build

# Preview build
npm run preview

# Lint check
npm run lint
```

---

## 🔄 Typical User Journey

1. **Signup** → LoginPage → SignupPage (Create account)
2. **Login** → LoginPage (Enter credentials)
3. **Dashboard** → DashboardPage (View stats)
4. **Create Project** → ProjectsPage (Add new project)
5. **View Project** → ProjectDetailsPage (See tasks)
6. **Create Task** → TaskModal (Add task)
7. **Update Status** → Click dropdown (Change status)
8. **View Profile** → ProfilePage (User info)

---

## 📦 Dependencies Overview

### Backend

```json
{
  "express": "Web framework",
  "mongoose": "MongoDB ORM",
  "bcrypt": "Password hashing",
  "jsonwebtoken": "JWT auth",
  "express-validator": "Input validation",
  "cors": "Cross-origin",
  "dotenv": "Environment vars"
}
```

### Frontend

```json
{
  "react": "UI library",
  "react-router-dom": "Routing",
  "axios": "HTTP client",
  "tailwindcss": "CSS framework",
  "lucide-react": "Icons"
}
```

---

## 🔐 Security Checklist

- ✅ Password hashed with bcrypt
- ✅ JWT token authentication
- ✅ Protected routes
- ✅ CORS enabled
- ✅ Input validation
- ✅ Email validation
- ✅ Role checks
- ✅ Error handling

---

## 📝 File Naming Convention

### Backend

- **Models:** PascalCase (User.js, Project.js)
- **Controllers:** camelCase + "Controller" (authController.js)
- **Routes:** camelCase (auth.js, projects.js)
- **Middleware:** camelCase (auth.js)
- **Utils:** camelCase (asyncHandler.js)

### Frontend

- **Components:** PascalCase.jsx (Navbar.jsx)
- **Pages:** PascalCase.jsx (LoginPage.jsx)
- **Services:** camelCase.js (api.js)
- **Context:** PascalCase.jsx (AuthContext.jsx)
- **Hooks:** useX naming (useAuth.js)

---

## 🧪 Quick Testing

### Register & Login

```bash
# Register
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@test.com","password":"pass123"}'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"pass123"}'
```

### Create Project

```bash
curl -X POST http://localhost:5000/api/projects \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"name":"Test Project","description":"Test"}'
```

---

## 💾 Environment Variables

### Backend (.env)

```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/team-task-manager
JWT_SECRET=your_secret_key
JWT_EXPIRE=7d
NODE_ENV=development
```

### Frontend (optional)

```
VITE_API_URL=http://localhost:5000/api
```

---

## 🎯 Key Concepts

### Authentication Flow

```
User Input → API Call → Backend → JWT Token → Store Locally → Attach to Requests
```

### CRUD Operations

```
Create (POST) → Read (GET) → Update (PUT) → Delete (DELETE)
```

### Kanban Board (ProjectDetailsPage)

```
Columns: Todo | In Progress | Done
Each column contains: Task Cards
Features: Drag-drop, status update, edit/delete
```

---

## 🔍 Debugging Tips

| Issue             | Check                   |
| ----------------- | ----------------------- |
| Can't login       | Verify email & password |
| API 404           | Check endpoint URL      |
| API 401           | Check JWT token         |
| API 403           | Check user role         |
| Can't create task | Check project access    |
| Styling broken    | Clear browser cache     |
| MongoDB error     | Check connection string |

---

## 📚 Documentation Files

| File               | Content            |
| ------------------ | ------------------ |
| README.md          | Project overview   |
| SETUP.md           | Installation guide |
| ARCHITECTURE.md    | System design      |
| API_TESTING.md     | API examples       |
| PROJECT_SUMMARY.md | Completion summary |

---

## 🚀 Production Deployment

### Frontend Build

```bash
cd Frontend
npm run build
```

Deploy `dist/` folder to Vercel/Netlify

### Backend Deployment

```bash
# Using Heroku
heroku create app-name
git push heroku main

# Using Railway
# Connect GitHub and deploy
```

### Database

```
Use MongoDB Atlas (Cloud)
Update connection string in .env
```

---

## 💡 Pro Tips

1. **Save Postman token variable** for easy API testing
2. **Use React DevTools** for component debugging
3. **Check MongoDB Compass** for database visualization
4. **Keep `.env` in `.gitignore`** for security
5. **Test authorization first** before other features
6. **Use meaningful commit messages** for version control
7. **Enable HTTPS** for production
8. **Set strong JWT_SECRET** for production

---

## 🎓 Learning Path

1. Understand MERN stack basics
2. Review project structure
3. Read backend code (controllers, models, routes)
4. Read frontend code (components, pages, services)
5. Test APIs with Postman/cURL
6. Explore the UI
7. Modify and add features
8. Deploy to production

---

## 📞 Quick Help

**Backend won't start?**

- Check MongoDB connection
- Verify port 5000 is free
- Check .env file

**Frontend won't start?**

- Delete node_modules, reinstall
- Check if port 5173 is free
- Verify API URL in services/api.js

**Can't login?**

- Clear localStorage
- Check email & password
- Verify backend is running

**API returning 401?**

- Token might be expired
- Check Authorization header format
- Verify JWT_SECRET

---

## ✨ Complete Checklist

- ✅ Backend setup & running
- ✅ Frontend setup & running
- ✅ MongoDB connected
- ✅ API endpoints working
- ✅ Authentication functional
- ✅ Projects CRUD complete
- ✅ Tasks CRUD complete
- ✅ Dashboard showing stats
- ✅ UI responsive
- ✅ Documentation complete
- ✅ All features tested
- ✅ Production ready

---

**Ready to code? Start with SETUP.md** 🚀
