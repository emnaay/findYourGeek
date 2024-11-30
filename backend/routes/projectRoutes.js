const express = require("express");

const projectsRouter = express.Router();

const { getProjects } = require("../controllers/projectsController");

projectsRouter.get("/", getProjects);

module.exports = projectsRouter;
