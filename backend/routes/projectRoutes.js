const express = require("express");

const projectsRouter = express.Router();

const { getProjects, getProjectById, postNewProject } = require("../controllers/projectsController");

projectsRouter.get("/", getProjects);

projectsRouter.get("/:userID", getProjectById);

projectsRouter.post("/", postNewProject);


module.exports = projectsRouter;
