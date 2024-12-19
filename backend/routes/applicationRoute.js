const express = require("express");

const applicationsRoutes = express.Router();

const {  getApplications, getApplicationByProjectId, createApplication} = require("../controllers/applicationController");

// Routes for user operations
applicationsRoutes.get("/", getApplications); // Get all users
applicationsRoutes.get("/:projectID", getApplicationByProjectId );

applicationsRoutes.post("/", createApplication);

module.exports = applicationsRoutes;