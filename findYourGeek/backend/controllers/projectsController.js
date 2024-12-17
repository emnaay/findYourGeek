const Project = require("../models/Project");

const getProjects = (req, res) => {
  Project.getAll((err, data) => {
    if (err) return res.status(500).json(err);
    return res.json(data);
  });
};

const getProjectById = (req, res) => {
  const userID = req.params.userID;
  Project.getByUserId(userID, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.json(data);
  });
};

const postNewProject = (req, res) => {
  const projectData = req.body;

  // Check if project name is already used
  Project.checkProjectName(projectData.projectName, (err, data) => {
    if (err) return res.status(500).json("ERROR");
    if (data.length > 0) {
      return res.status(400).json({ status: "Project Title already used" });
    }

    // Add the new project if the name is unique
    Project.create(projectData, (err, result) => {
      if (err) return res.status(500).json("ERROR");
      return res.json({
        status: "Project Added",
        project: projectData,
      });
    });
  });
};

const updateProject = (req, res) => {
  const projectID = req.params.projectID;
  const projectData = req.body;

  Project.update(projectID, projectData, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.json({ message: "Project updated successfully!", data });
  });
};

const deleteProject = (req, res) => {
  const projectID = req.params.projectID;

  Project.delete(projectID, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.json({ message: "Project deleted successfully!" });
  });
};

module.exports = {
  getProjects,
  getProjectById,
  postNewProject,
  updateProject,
  deleteProject,
};
