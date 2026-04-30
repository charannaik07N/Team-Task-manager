# Team Task Manager - MERN Stack Application

A complete production-ready project management web application built with MongoDB, Express.js, React.js, and Node.js (MERN stack).

## ✨ Features

- **User Authentication**: Secure JWT-based authentication with password hashing
- **Project Management**: Create, update, and manage projects with team members
- **Task Management**: Create tasks with priority levels, due dates, and status tracking
- **Role-Based Access Control**: Admin and Member roles with different permissions
- **Dashboard**: View comprehensive statistics about your tasks
- **Responsive Design**: Tailwind CSS for mobile-friendly UI
- **Real-time Updates**: Instant status and task updates

## 🚀 Quick Start

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud)
- npm or yarn

### Environment Setup

#### Backend Setup

1. Navigate to the Backend directory:

```bash
cd Backend
```

2. Update `.env` file with your configuration:

```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/team-task-manager
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRE=7d
NODE_ENV=development
```

3. Install dependencies:

```bash
npm install
```

4. Start the server:

```bash
npm run dev
```

Server will run on `http://localhost:5000`

#### Frontend Setup

1. Navigate to the Frontend directory:

```bash
cd Frontend
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

Frontend will run on `http://localhost:5173`

## 📁 Project Structure

```
Team-Task-Manager/
├── Backend/
│   ├── models/
│   │   ├── User.js
│   │   ├── Project.js
│   │   └── Task.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── projectController.js
│   │   ├── taskController.js
│   │   └── dashboardController.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── projects.js
│   │   ├── tasks.js
│   │   └── dashboard.js
│   ├── middleware/
│   │   ├── auth.js
│   │   ├── checkProjectAccess.js
│   │   ├── checkAdmin.js
│   │   └── errorHandler.js
│   ├── utils/
│   │   ├── AppError.js
│   │   └── asyncHandler.js
│   ├── .env
│   ├── server.js
│   └── package.json
│
└── Frontend/
    ├── src/
    │   ├── components/
    │   │   ├── Navbar.jsx
    │   │   ├── ProjectCard.jsx
    │   │   ├── TaskCard.jsx
    │   │   ├── TaskModal.jsx
    │   │   ├── DashboardStats.jsx
    │   │   └── ProtectedRoute.jsx
    │   ├── pages/
    │   │   ├── LoginPage.jsx
    │   │   ├── SignupPage.jsx
    │   │   ├── DashboardPage.jsx
    │   │   ├── ProjectsPage.jsx
    │   │   ├── ProjectDetailsPage.jsx
    │   │   └── ProfilePage.jsx
    │   ├── services/
    │   │   ├── api.js
    │   │   └── index.js
    │   ├── context/
    │   │   └── AuthContext.jsx
    │   ├── hooks/
    │   │   └── useAuth.js
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── index.css
    ├── index.html
    ├── vite.config.js
    └── package.json
```

## 🔐 API Endpoints

### Authentication

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user

### Projects

- `POST /api/projects` - Create project
- `GET /api/projects` - Get all projects
- `GET /api/projects/:id` - Get single project
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project
- `POST /api/projects/:id/members` - Add member
- `DELETE /api/projects/:id/members` - Remove member

### Tasks

- `POST /api/tasks` - Create task
- `GET /api/tasks?projectId=` - Get tasks
- `GET /api/tasks/:id` - Get single task
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task

### Dashboard

- `GET /api/dashboard` - Get dashboard statistics

## 🔒 Authentication Flow

1. User registers with email and password
2. Password is hashed using bcrypt
3. JWT token is generated and stored in localStorage
4. Token is automatically attached to all API requests
5. Protected routes verify token before access
6. Token expires after 7 days (configurable)

## 👥 User Roles

### Admin

- Full control over project
- Can manage members
- Can create/edit/delete tasks
- Can view all project details

### Member

- Can view project details
- Can update assigned tasks
- Cannot manage project settings
- Cannot add/remove members

## 🛡️ Security Features

- JWT token authentication
- Password hashing with bcrypt
- Input validation with express-validator
- CORS protection
- Protected routes
- Role-based access control

## 🎨 UI Components

### Navbar

- Navigation menu with user info
- Logout functionality
- Responsive mobile menu

### Dashboard Stats

- Total tasks count
- Completed tasks count
- Pending tasks count
- Overdue tasks count

### Project Card

- Project information display
- Quick access to project details
- Delete functionality

### Task Card

- Task details and status
- Priority indication
- Assigned user info
- Status update dropdown
- Edit/Delete buttons

### Task Modal

- Create/Edit task form
- Priority selection
- Status selection
- Due date picker
- Assignee selection

## 🚀 Deployment

### Backend Deployment (Heroku/Railway)

1. Set environment variables
2. Deploy from git repository
3. MongoDB Atlas for database

### Frontend Deployment (Vercel/Netlify)

1. Build: `npm run build`
2. Deploy build folder
3. Update API URL for production

## 📦 Dependencies

### Backend

- express: Web framework
- mongoose: MongoDB ORM
- bcrypt: Password hashing
- jsonwebtoken: JWT authentication
- express-validator: Input validation
- dotenv: Environment configuration
- cors: Cross-origin resource sharing

### Frontend

- react: UI library
- react-router-dom: Routing
- axios: HTTP client
- tailwindcss: Styling
- lucide-react: Icons

## 🐛 Troubleshooting

### MongoDB Connection Issues

- Ensure MongoDB is running locally or provide correct connection string
- Check firewall settings for MongoDB port

### CORS Errors

- Verify backend CORS configuration
- Check frontend API base URL

### Authentication Issues

- Clear localStorage and login again
- Check JWT_SECRET in backend .env
- Verify token expiration settings

## 📝 Database Schema

### User Schema

```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  createdAt: Date
}
```

### Project Schema

```javascript
{
  name: String,
  description: String,
  createdBy: ObjectId (User),
  members: [{userId: ObjectId (User), role: String}],
  createdAt: Date
}
```

### Task Schema

```javascript
{
  title: String,
  description: String,
  projectId: ObjectId (Project),
  assignedTo: ObjectId (User),
  status: String (Todo/In Progress/Done),
  priority: String (Low/Medium/High),
  dueDate: Date,
  createdBy: ObjectId (User),
  createdAt: Date
}
```

## 🎯 Future Enhancements

- Drag-and-drop task board
- Real-time notifications
- Advanced search and filters
- Pagination for large datasets
- Task attachments
- Comments on tasks
- Time tracking
- Activity logs
- Bulk operations

## 📄 License

ISC License - feel free to use this project for personal and commercial purposes.

## 🤝 Contributing

Contributions are welcome! Please fork the repository and submit pull requests with improvements.

---

**Built with ❤️ using MERN Stack**
