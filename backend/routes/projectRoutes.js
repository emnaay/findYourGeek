const express = require("express");

const projectsRouter = express.Router();
const {
  getProjects,
  getProjectById,
  postNewProject,
  updateProject,
  deleteProject,
} = require("../controllers/projectsController");

// Get all projects
projectsRouter.get("/", getProjects);

// Get projects by userID
projectsRouter.get("/:userID", getProjectById);

// Create a new project
projectsRouter.post("/", postNewProject);

// Update a project by projectID
projectsRouter.put("/:projectID", updateProject);

// Delete a project by projectID
projectsRouter.delete("/:projectID", deleteProject);

module.exports = projectsRouter;
