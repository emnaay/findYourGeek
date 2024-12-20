const express = require("express");

const projectsRouter = express.Router();
const {
  getProjects,
  getProjectById,
  postNewProject,
  updateProject,
  deleteProject,
} = require("../controllers/projectsController");

projectsRouter.get("/", getProjects);

projectsRouter.get("/:userID", getProjectById);

projectsRouter.post("/", postNewProject);

projectsRouter.put("/:projectID", updateProject);

projectsRouter.delete("/:projectID", deleteProject);

module.exports = projectsRouter;
