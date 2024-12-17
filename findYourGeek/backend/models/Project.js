const db = require("../database/db");

const Project = {
  // Create a new project
  create: (projectData, callback) => {
    const sql = `
      INSERT INTO projects (projectName, userID, description, skills_needed, price)
      VALUES (?, ?, ?, ?, ?)
    `;
    const { projectName, userID, description, skills_needed, price } = projectData;
    db.query(sql, [projectName, userID, description, skills_needed, price], callback);
  },

  // Get all projects (with user details)
  getAll: (callback) => {
    const sql = `
      SELECT projects.*, users.userName 
      FROM projects 
      JOIN users ON projects.userID = users.id
    `;
    db.query(sql, callback);
  },

  // Get projects by userID
  getByUserId: (userID, callback) => {
    const sql = `SELECT * FROM projects WHERE userID = ?`;
    db.query(sql, [userID], callback);
  },

  // Check if a project name already exists
  checkProjectName: (projectName, callback) => {
    const sql = `SELECT * FROM projects WHERE projectName = ?`;
    db.query(sql, [projectName], callback);
  },

  // Update a project by projectID
  update: (projectID, projectData, callback) => {
    const sql = `
      UPDATE projects 
      SET projectName = ?, description = ?, skills_needed = ?, price = ?
      WHERE projectID = ?
    `;
    const { projectName, description, skills_needed, price } = projectData;
    db.query(sql, [projectName, description, skills_needed, price, projectID], callback);
  },

  // Delete a project by projectID
  delete: (projectID, callback) => {
    const sql = `DELETE FROM projects WHERE projectID = ?`;
    db.query(sql, [projectID], callback);
  },
};

module.exports = Project;
