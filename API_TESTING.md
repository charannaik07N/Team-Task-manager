# API TESTING GUIDE

Complete guide to test all API endpoints using cURL or Postman.

## 📋 Base URL

```
http://localhost:5000/api
```

## 🔐 Authentication Endpoints

### 1. Register User

**Endpoint:**

```
POST /auth/register
```

**Request:**

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }'
```

**Response:**

```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

### 2. Login User

**Endpoint:**

```
POST /auth/login
```

**Request:**

```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

**Response:**

```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

### 3. Get Current User

**Endpoint:**

```
GET /auth/me
```

**Request:**

```bash
curl -X GET http://localhost:5000/api/auth/me \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

**Response:**

```json
{
  "success": true,
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "createdAt": "2024-04-29T10:00:00Z"
  }
}
```

## 📁 Project Endpoints

### 4. Create Project

**Endpoint:**

```
POST /projects
```

**Request:**

```bash
curl -X POST http://localhost:5000/api/projects \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "name": "My Awesome Project",
    "description": "This is a test project"
  }'
```

**Response:**

```json
{
  "success": true,
  "project": {
    "_id": "507f1f77bcf86cd799439012",
    "name": "My Awesome Project",
    "description": "This is a test project",
    "createdBy": "507f1f77bcf86cd799439011",
    "members": [
      {
        "userId": "507f1f77bcf86cd799439011",
        "role": "Admin"
      }
    ],
    "createdAt": "2024-04-29T10:00:00Z"
  }
}
```

### 5. Get All Projects

**Endpoint:**

```
GET /projects
```

**Request:**

```bash
curl -X GET http://localhost:5000/api/projects \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

**Response:**

```json
{
  "success": true,
  "projects": [
    {
      "_id": "507f1f77bcf86cd799439012",
      "name": "My Awesome Project",
      "description": "This is a test project",
      "createdBy": {
        "_id": "507f1f77bcf86cd799439011",
        "name": "John Doe",
        "email": "john@example.com"
      },
      "members": [...],
      "createdAt": "2024-04-29T10:00:00Z"
    }
  ]
}
```

### 6. Get Single Project

**Endpoint:**

```
GET /projects/:id
```

**Request:**

```bash
curl -X GET http://localhost:5000/api/projects/507f1f77bcf86cd799439012 \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

**Response:**

```json
{
  "success": true,
  "project": {
    "_id": "507f1f77bcf86cd799439012",
    "name": "My Awesome Project",
    "description": "This is a test project",
    "createdBy": {...},
    "members": [...],
    "createdAt": "2024-04-29T10:00:00Z"
  }
}
```

### 7. Update Project

**Endpoint:**

```
PUT /projects/:id
```

**Request:**

```bash
curl -X PUT http://localhost:5000/api/projects/507f1f77bcf86cd799439012 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "name": "Updated Project Name",
    "description": "Updated description"
  }'
```

### 8. Delete Project

**Endpoint:**

```
DELETE /projects/:id
```

**Request:**

```bash
curl -X DELETE http://localhost:5000/api/projects/507f1f77bcf86cd799439012 \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### 9. Add Member to Project

**Endpoint:**

```
POST /projects/:id/members
```

**Request:**

```bash
curl -X POST http://localhost:5000/api/projects/507f1f77bcf86cd799439012/members \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "userId": "507f1f77bcf86cd799439013",
    "role": "Member"
  }'
```

### 10. Remove Member from Project

**Endpoint:**

```
DELETE /projects/:id/members
```

**Request:**

```bash
curl -X DELETE http://localhost:5000/api/projects/507f1f77bcf86cd799439012/members \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "userId": "507f1f77bcf86cd799439013"
  }'
```

## ✅ Task Endpoints

### 11. Create Task

**Endpoint:**

```
POST /tasks
```

**Request:**

```bash
curl -X POST http://localhost:5000/api/tasks \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "title": "Implement login feature",
    "description": "Add JWT authentication to the app",
    "projectId": "507f1f77bcf86cd799439012",
    "assignedTo": "507f1f77bcf86cd799439013",
    "status": "Todo",
    "priority": "High",
    "dueDate": "2024-05-15T00:00:00Z"
  }'
```

### 12. Get Tasks for Project

**Endpoint:**

```
GET /tasks?projectId=<project_id>
```

**Request:**

```bash
curl -X GET "http://localhost:5000/api/tasks?projectId=507f1f77bcf86cd799439012" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

**Response:**

```json
{
  "success": true,
  "tasks": [
    {
      "_id": "507f1f77bcf86cd799439014",
      "title": "Implement login feature",
      "description": "Add JWT authentication to the app",
      "projectId": "507f1f77bcf86cd799439012",
      "assignedTo": {
        "_id": "507f1f77bcf86cd799439013",
        "name": "Jane Doe",
        "email": "jane@example.com"
      },
      "status": "Todo",
      "priority": "High",
      "dueDate": "2024-05-15T00:00:00Z",
      "createdBy": {...},
      "createdAt": "2024-04-29T10:00:00Z"
    }
  ]
}
```

### 13. Get Single Task

**Endpoint:**

```
GET /tasks/:id
```

**Request:**

```bash
curl -X GET http://localhost:5000/api/tasks/507f1f77bcf86cd799439014 \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### 14. Update Task

**Endpoint:**

```
PUT /tasks/:id
```

**Request:**

```bash
curl -X PUT http://localhost:5000/api/tasks/507f1f77bcf86cd799439014 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "status": "In Progress",
    "priority": "Medium"
  }'
```

### 15. Delete Task

**Endpoint:**

```
DELETE /tasks/:id
```

**Request:**

```bash
curl -X DELETE http://localhost:5000/api/tasks/507f1f77bcf86cd799439014 \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

## 📊 Dashboard Endpoints

### 16. Get Dashboard Statistics

**Endpoint:**

```
GET /dashboard
```

**Request:**

```bash
curl -X GET http://localhost:5000/api/dashboard \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

**Response:**

```json
{
  "success": true,
  "stats": {
    "totalTasks": 15,
    "completedTasks": 7,
    "pendingTasks": 6,
    "overdueTasks": 2
  }
}
```

## 🚀 Postman Collection

### Import Collection

1. Download Postman from [postman.com](https://postman.com)
2. Create new collection "Team Task Manager"
3. Add requests manually or import JSON

### Collection JSON (Copy to Postman)

```json
{
  "info": {
    "name": "Team Task Manager API",
    "description": "MERN Stack Project Management API"
  },
  "item": [
    {
      "name": "Auth",
      "item": [
        {
          "name": "Register",
          "request": {
            "method": "POST",
            "url": "{{base_url}}/auth/register",
            "body": {
              "mode": "raw",
              "raw": "{\"name\":\"John\",\"email\":\"john@test.com\",\"password\":\"pass123\"}"
            }
          }
        },
        {
          "name": "Login",
          "request": {
            "method": "POST",
            "url": "{{base_url}}/auth/login",
            "body": {
              "mode": "raw",
              "raw": "{\"email\":\"john@test.com\",\"password\":\"pass123\"}"
            }
          }
        }
      ]
    }
  ],
  "variable": [
    {
      "key": "base_url",
      "value": "http://localhost:5000/api"
    },
    {
      "key": "token",
      "value": ""
    }
  ]
}
```

## 📝 Common Workflows

### Complete User Flow

```bash
# 1. Register
TOKEN=$(curl -s -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John",
    "email": "john@test.com",
    "password": "pass123"
  }' | jq -r '.token')

# 2. Create Project
PROJECT=$(curl -s -X POST http://localhost:5000/api/projects \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"name":"My Project","description":"Test"}' | jq -r '._id')

# 3. Create Task
curl -X POST http://localhost:5000/api/tasks \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title":"My Task",
    "projectId":"'$PROJECT'",
    "status":"Todo",
    "priority":"High"
  }'
```

## 🔍 Error Response Format

### 400 Bad Request

```json
{
  "success": false,
  "message": "Please provide a project name"
}
```

### 401 Unauthorized

```json
{
  "success": false,
  "message": "Not authorized to access this route"
}
```

### 403 Forbidden

```json
{
  "success": false,
  "message": "Only admins can perform this action"
}
```

### 404 Not Found

```json
{
  "success": false,
  "message": "Project not found"
}
```

## 💡 Tips

- Save token in Postman environment variable
- Use `{{base_url}}` and `{{token}}` in requests
- Test authentication first before other endpoints
- Check MongoDB for data persistence
- Use different user accounts for testing permissions

---

**Ready to test! Start with Auth endpoints first.**
