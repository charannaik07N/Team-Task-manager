# Backend - Team Task Manager

Node.js and Express.js backend API for Team Task Manager application.

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Create a `.env` file in the Backend directory:

```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/team-task-manager
JWT_SECRET=your_super_secret_jwt_key_here_change_in_production
JWT_EXPIRE=7d
NODE_ENV=development
```

### 3. MongoDB Setup

**Option A: Local MongoDB**

- Install MongoDB locally
- Ensure MongoDB service is running
- Use default connection: `mongodb://localhost:27017/team-task-manager`

**Option B: MongoDB Atlas (Cloud)**

- Create account at mongodb.com/cloud/atlas
- Create a cluster
- Get connection string
- Replace in `.env`: `MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/team-task-manager`

### 4. Start the Server

Development mode (with auto-restart):

```bash
npm run dev
```

Production mode:

```bash
npm start
```

Server will be available at `http://localhost:5000`

## API Documentation

### Authentication Routes

#### Register User

```
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}

Response: { success: true, token: "...", user: {...} }
```

#### Login User

```
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}

Response: { success: true, token: "...", user: {...} }
```

#### Get Current User

```
GET /api/auth/me
Authorization: Bearer <token>

Response: { success: true, user: {...} }
```

### Project Routes

#### Create Project

```
POST /api/projects
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "My Project",
  "description": "Project description"
}
```

#### Get All Projects

```
GET /api/projects
Authorization: Bearer <token>
```

#### Get Single Project

```
GET /api/projects/:id
Authorization: Bearer <token>
```

#### Update Project

```
PUT /api/projects/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Updated Name",
  "description": "Updated description"
}
```

#### Delete Project

```
DELETE /api/projects/:id
Authorization: Bearer <token>
```

#### Add Member

```
POST /api/projects/:id/members
Authorization: Bearer <token>
Content-Type: application/json

{
  "userId": "user_object_id",
  "role": "Member" or "Admin"
}
```

#### Remove Member

```
DELETE /api/projects/:id/members
Authorization: Bearer <token>
Content-Type: application/json

{
  "userId": "user_object_id"
}
```

### Task Routes

#### Create Task

```
POST /api/tasks
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Task Title",
  "description": "Task description",
  "projectId": "project_object_id",
  "assignedTo": "user_object_id",
  "status": "Todo",
  "priority": "High",
  "dueDate": "2024-12-31T00:00:00Z"
}
```

#### Get Tasks

```
GET /api/tasks?projectId=<project_id>
Authorization: Bearer <token>
```

#### Get Single Task

```
GET /api/tasks/:id
Authorization: Bearer <token>
```

#### Update Task

```
PUT /api/tasks/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "status": "In Progress",
  "priority": "Medium"
}
```

#### Delete Task

```
DELETE /api/tasks/:id
Authorization: Bearer <token>
```

### Dashboard Routes

#### Get Statistics

```
GET /api/dashboard
Authorization: Bearer <token>

Response: {
  success: true,
  stats: {
    totalTasks: 10,
    completedTasks: 5,
    pendingTasks: 3,
    overdueTasks: 2
  }
}
```

## Middleware

### Authentication Middleware (`auth.js`)

- Verifies JWT token
- Extracts user ID from token
- Protects routes from unauthorized access

### Project Access Middleware (`checkProjectAccess.js`)

- Verifies user has access to project
- Determines user role in project
- Sets `req.project` and `req.userRole`

### Admin Check Middleware (`checkAdmin.js`)

- Verifies user is admin of project
- Prevents non-admin operations

### Error Handler Middleware (`errorHandler.js`)

- Catches all errors
- Returns formatted error responses
- Handles MongoDB and validation errors

## Models

### User Model

- Email validation
- Password hashing on save
- Password comparison method
- Unique email constraint

### Project Model

- References to User model
- Members array with roles
- Indexes for performance

### Task Model

- Linked to Project and User
- Status and priority enums
- Due date validation
- Timestamps for tracking

## Error Handling

The API returns consistent error responses:

```json
{
  "success": false,
  "message": "Error description"
}
```

HTTP Status Codes:

- 200: Success
- 201: Created
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 500: Server Error

## Testing Endpoints

### Using cURL

```bash
# Register
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"John","email":"john@example.com","password":"password123"}'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"password123"}'

# Get Current User
curl http://localhost:5000/api/auth/me \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### Using Postman

1. Set base URL: `http://localhost:5000/api`
2. Create new requests for each endpoint
3. Add `Authorization: Bearer <token>` header for protected routes
4. Use JSON body for POST/PUT requests

## Health Check

```bash
curl http://localhost:5000/health

Response: { "status": "Server is running" }
```

## Troubleshooting

### Port Already in Use

```bash
# Kill process on port 5000
lsof -i :5000
kill -9 <PID>

# Or change PORT in .env
PORT=5001
```

### MongoDB Connection Failed

- Ensure MongoDB service is running
- Check connection string in .env
- Verify firewall settings
- For MongoDB Atlas, whitelist your IP

### JWT Token Errors

- Ensure token is properly formatted: `Bearer <token>`
- Check token hasn't expired
- Verify JWT_SECRET matches between encoding and decoding

## Database Optimization

- Indexes on frequently queried fields
- Lean queries for read-only operations
- Population of references only when needed

## Security Best Practices

- Never commit `.env` file
- Use strong JWT_SECRET in production
- Implement rate limiting (future)
- Use HTTPS in production
- Keep dependencies updated
- Validate all inputs
- Implement request logging

---

**Backend running on port 5000**
