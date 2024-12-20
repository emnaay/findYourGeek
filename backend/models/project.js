const db = require("../database/db");

const Project = {
  create: (projectData, callback) => {
    const sql = `
      INSERT INTO projects (projectName, userID, description, skills_needed, price)
      VALUES (?, ?, ?, ?, ?)
    `;
    const { projectName, userID, description, skills_needed, price } = projectData;
    db.query(sql, [projectName, userID, description, skills_needed, price], callback);
  },

  getAll: (callback) => {
    const sql = `
      SELECT projects.*, users.userName 
      FROM projects 
      JOIN users ON projects.userID = users.id
    `;
    db.query(sql, callback);
  },

  getByUserId: (userID, callback) => {
    const sql = `SELECT * FROM projects WHERE userID = ?`;
    db.query(sql, [userID], callback);
  },

  checkProjectName: (projectName, callback) => {
    const sql = `SELECT * FROM projects WHERE projectName = ?`;
    db.query(sql, [projectName], callback);
  },

  update: (projectID, projectData, callback) => {
    const sql = `
      UPDATE projects 
      SET projectName = ?, description = ?, skills_needed = ?, price = ?
      WHERE projectID = ?
    `;
    const { projectName, description, skills_needed, price } = projectData;
    db.query(sql, [projectName, description, skills_needed, price, projectID], callback);
  },

  delete: (projectID, callback) => {
    const sql = `DELETE FROM projects WHERE projectID = ?`;
    db.query(sql, [projectID], callback);
  },
};

module.exports = Project;
