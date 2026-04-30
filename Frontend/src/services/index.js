import api from "./api";

export const authService = {
  register: (name, email, password) =>
    api.post("/auth/register", { name, email, password }),

  login: (email, password) => api.post("/auth/login", { email, password }),

  getMe: () => api.get("/auth/me"),

  getAllUsers: () => api.get("/auth/users"),
};

export const projectService = {
  createProject: (projectData) => api.post("/projects", projectData),

  getProjects: () => api.get("/projects"),

  getProject: (id) => api.get(`/projects/${id}`),

  updateProject: (id, projectData) => api.put(`/projects/${id}`, projectData),

  deleteProject: (id) => api.delete(`/projects/${id}`),

  addMember: (projectId, userId, role) =>
    api.post(`/projects/${projectId}/members`, { userId, role }),

  removeMember: (projectId, userId) =>
    api.delete(`/projects/${projectId}/members`, { data: { userId } }),
};

export const taskService = {
  createTask: (
    title,
    description,
    projectId,
    assignedTo,
    status,
    priority,
    dueDate,
  ) =>
    api.post("/tasks", {
      title,
      description,
      projectId,
      assignedTo,
      status,
      priority,
      dueDate,
    }),

  getTasks: (projectId) => api.get("/tasks", { params: { projectId } }),

  getTask: (id) => api.get(`/tasks/${id}`),

  updateTask: (id, updates) => api.put(`/tasks/${id}`, updates),

  deleteTask: (id) => api.delete(`/tasks/${id}`),
};

export const dashboardService = {
  getStats: () => api.get("/dashboard"),
  getTasks: () => api.get("/dashboard/tasks"),
};
