const application = require("../models/Application");


const getApplications = (req, res) => {
    application.getAll((err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.status(200).json(results);
    });
  };

const getApplicationByProjectId = (req, res) => {
  const { projectID } = req.params;
  console.log(projectID),
  application.getByProjectId(projectID, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: "application not found" });
    }
    res.status(200).json(results);
  });
  };

  const createApplication = (req, res) => {
    const applicationData = req.body;
    console.log(applicationData);
    application.create(applicationData, (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      return res.json({
        status: "Application Added",
        Application: applicationData,
      })
      
    });
    
  };

  module.exports = { getApplications, getApplicationByProjectId, createApplication };