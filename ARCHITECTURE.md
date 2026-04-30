# ARCHITECTURE GUIDE - Team Task Manager

Complete architecture documentation for the MERN stack application.

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     FRONTEND (React + Vite)                │
│                   http://localhost:5173                     │
├─────────────────────────────────────────────────────────────┤
│  Components │ Pages │ Services │ Context │ Hooks            │
└────────────────────────┬────────────────────────────────────┘
                         │ HTTP (Axios)
                         │ JWT Token in Headers
                         ↓
┌─────────────────────────────────────────────────────────────┐
│                   BACKEND (Express.js + Node)              │
│                    http://localhost:5000                    │
├─────────────────────────────────────────────────────────────┤
│  Routes │ Controllers │ Middleware │ Models │ Utils         │
└────────────────────────┬────────────────────────────────────┘
                         │ Mongoose ORM
                         ↓
┌─────────────────────────────────────────────────────────────┐
│                    DATABASE (MongoDB)                       │
│              mongodb://localhost:27017                      │
├─────────────────────────────────────────────────────────────┤
│  Collections: Users │ Projects │ Tasks                      │
└─────────────────────────────────────────────────────────────┘
```

## 📱 Frontend Architecture

### Component Hierarchy

```
App
├── Navbar
├── Routes
│   ├── LoginPage
│   ├── SignupPage
│   ├── DashboardPage
│   │   └── DashboardStats
│   ├── ProjectsPage
│   │   ├── ProjectCard (multiple)
│   │   └── TaskModal
│   ├── ProjectDetailsPage
│   │   ├── TaskCard (multiple)
│   │   └── TaskModal
│   └── ProfilePage
└── AuthContext Provider
```

### Data Flow

```
1. User Action (Click)
   ↓
2. Event Handler (onClick, onSubmit)
   ↓
3. API Call (via service)
   ↓
4. Backend Processing
   ↓
5. Response Received
   ↓
6. State Update
   ↓
7. Component Re-render
```

### State Management

```
AuthContext
├── user (current user info)
├── token (JWT token)
├── loading (auth loading state)
├── isAuthenticated (boolean)
└── Methods
    ├── login(email, password)
    ├── register(name, email, password)
    └── logout()
```

## 🔌 Backend Architecture

### Request-Response Flow

```
HTTP Request
    ↓
Middleware Stack
├── CORS Middleware
├── JSON Parser
└── Authentication Middleware
    ↓
Route Handler
├── Input Validation
├── Authorization Check
├── Business Logic (Controller)
├── Database Operation
└── Response Formatting
    ↓
Error Handling Middleware
    ↓
HTTP Response
```

### Middleware Chain

```
Request → CORS → JSON Parser → Auth Check → Route Handler → Response
                                            ↓
                                    Error Handler (catches errors)
```

### Controller Pattern

```
Controller
├── Extract request data
├── Validate input
├── Check authorization
├── Call database
├── Format response
└── Send response (or pass to error handler)
```

## 🗄️ Database Schema

### User Collection

```javascript
{
  _id: ObjectId,
  name: String,
  email: String (unique),
  password: String (hashed with bcrypt),
  createdAt: Date (default: now)
}
```

**Indexes:**

- `email` (unique)

### Project Collection

```javascript
{
  _id: ObjectId,
  name: String,
  description: String,
  createdBy: ObjectId (ref: User),
  members: [
    {
      userId: ObjectId (ref: User),
      role: String (enum: ['Admin', 'Member'])
    }
  ],
  createdAt: Date (default: now)
}
```

**Indexes:**

- `createdBy` (for querying user's projects)
- `members.userId` (for checking membership)

### Task Collection

```javascript
{
  _id: ObjectId,
  title: String,
  description: String,
  projectId: ObjectId (ref: Project),
  assignedTo: ObjectId (ref: User, optional),
  status: String (enum: ['Todo', 'In Progress', 'Done']),
  priority: String (enum: ['Low', 'Medium', 'High']),
  dueDate: Date,
  createdBy: ObjectId (ref: User),
  createdAt: Date (default: now)
}
```

**Indexes:**

- `projectId` (for querying project tasks)
- `assignedTo` (for querying user's tasks)

## 🔐 Authentication Flow

```
User Signup
    ↓
Hash Password (bcrypt)
    ↓
Save User to DB
    ↓
Generate JWT Token
    ↓
Return Token to Frontend
    ↓
Store in localStorage
    ↓
Attach to API Requests
```

### JWT Token Structure

```
Header.Payload.Signature

Payload Contains:
{
  id: userId,
  iat: issuedAt,
  exp: expirationTime
}
```

## 🔄 API Call Lifecycle

### Frontend to Backend

```
1. User Action
   └─ Click button

2. Event Handler
   └─ handleCreateProject()

3. Service Layer
   └─ projectService.createProject(name, description)

4. Axios Instance
   ├─ Add token to Authorization header
   ├─ POST /api/projects
   └─ Send JSON body

5. Backend Route
   └─ POST /api/projects

6. Middleware
   ├─ Auth middleware validates token
   └─ Extracts userId

7. Controller
   ├─ Validate input
   ├─ Create project document
   └─ Return response

8. Frontend receives response
   ├─ Update state
   └─ Re-render component
```

## 🛡️ Authorization & Access Control

### Token-Based Authentication

```
Frontend Request
    ↓
Header: Authorization: Bearer <token>
    ↓
Backend Auth Middleware
    ├─ Extract token
    ├─ Verify signature
    ├─ Extract userId
    └─ Attach to request
    ↓
Protected Route Handler
```

### Role-Based Access Control

```
Project Route
    ↓
Check Project Access
├─ Is user member?
└─ Get user role
    ↓
Operation Handler
├─ Admin Only
│   ├─ Update project
│   ├─ Delete project
│   └─ Manage members
├─ Member
│   ├─ View project
│   └─ Update assigned tasks
└─ Creator (Auto-Admin)
    └─ Full control
```

## 📊 Data Relationships

### User to Project

```
User (1) ────── (Many) Project
         createdBy

User (Many) ────── (Many) Project
           members
```

### Project to Task

```
Project (1) ────── (Many) Task
          projectId

User (1) ────── (Many) Task
   createdBy

User (Many) ────── (Many) Task
        assignedTo
```

## 🔍 Query Patterns

### Get User's Projects

```javascript
// Option 1: Projects created by user
db.projects.find({ createdBy: userId });

// Option 2: Projects where user is member
db.projects.find({ "members.userId": userId });

// Option 3: Both (union)
db.projects.find({
  $or: [{ createdBy: userId }, { "members.userId": userId }],
});
```

### Get Project Tasks

```javascript
db.tasks
  .find({ projectId: projectId })
  .populate("assignedTo")
  .populate("createdBy");
```

### Get User Statistics

```javascript
db.tasks.countDocuments({ createdBy: userId });
db.tasks.countDocuments({ createdBy: userId, status: "Done" });
db.tasks.countDocuments({ createdBy: userId, status: { $ne: "Done" } });
```

## ⚡ Performance Optimization

### Database Indexes

```javascript
// User
db.users.createIndex({ email: 1 }, { unique: true });

// Project
db.projects.createIndex({ createdBy: 1 });
db.projects.createIndex({ "members.userId": 1 });

// Task
db.tasks.createIndex({ projectId: 1 });
db.tasks.createIndex({ assignedTo: 1 });
```

### Query Optimization

```javascript
// Instead of:
const project = await Project.findById(id);
const members = project.members;

// Do:
const project = await Project.findById(id).populate("members.userId");
```

### Pagination (Future Enhancement)

```javascript
const page = req.query.page || 1;
const limit = 10;
const skip = (page - 1) * limit;

const tasks = await Task.find({ projectId }).limit(limit).skip(skip);
```

## 🚀 Scalability Considerations

### Horizontal Scaling

```
Load Balancer
    ├─ Server 1
    ├─ Server 2
    └─ Server 3
        ↓
    Shared MongoDB
    ├─ Replica Set
    └─ Backup
```

### Caching Strategy (Future)

```
Redis Cache
    ├─ User sessions
    ├─ Project data
    └─ Task statistics
```

### Message Queue (Future)

```
Task Queue
    ├─ Email notifications
    ├─ Bulk operations
    └─ Report generation
```

## 📈 Monitoring & Logging (Future)

```
Application
    ├─ Request logging
    ├─ Error tracking
    ├─ Performance metrics
    └─ User analytics
        ↓
    Monitoring Dashboard
    (Datadog, New Relic, etc.)
```

## 🔄 Deployment Architecture

### Production Setup

```
GitHub Repository
    ├─ Frontend Code
    └─ Backend Code
        ↓
    CI/CD Pipeline
    ├─ Run Tests
    ├─ Build
    └─ Deploy
        ↓
    Frontend Deployment
    └─ Vercel/Netlify (Static Site)
        ↓
    Backend Deployment
    └─ Heroku/Railway (API Server)
        ↓
    Database
    └─ MongoDB Atlas (Cloud)
```

## 🧪 Testing Strategy

### Unit Testing (Future)

```
Controllers
├─ Input validation
├─ Business logic
└─ Response format

Models
├─ Schema validation
├─ Methods
└─ Hooks
```

### Integration Testing (Future)

```
API Endpoints
├─ Authentication flow
├─ Project operations
├─ Task operations
└─ Authorization checks
```

### E2E Testing (Future)

```
User Workflows
├─ Signup → Login → Create Project → Add Task
├─ Permission checks
└─ Error handling
```

## 📚 Code Organization Best Practices

### Separation of Concerns

```
Route Layer
    ↓ (input/params)
Controller Layer
    ↓ (business logic)
Service Layer (optional)
    ↓ (data access)
Model Layer
    ↓ (database)
Database
```

### Error Handling

```
Try-Catch in Controller
    ↓
Catch Errors
    ↓
Create AppError
    ↓
Pass to Error Middleware
    ↓
Format Error Response
    ↓
Send to Client
```

### Validation

```
Route Handler
    ├─ Validate input with express-validator
    ├─ Check authorization
    └─ Call controller
        ├─ Validate business logic
        └─ Execute operation
```

---

**This architecture follows SOLID principles and REST conventions for maintainability and scalability.**
