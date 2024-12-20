const express = require("express");

const applicationsRoutes = express.Router();

const {  getApplications, getApplicationByProjectId, createApplication} = require("../controllers/applicationController");

applicationsRoutes.get("/", getApplications); 
applicationsRoutes.get("/:projectID", getApplicationByProjectId );

applicationsRoutes.post("/", createApplication);

module.exports = applicationsRoutes;