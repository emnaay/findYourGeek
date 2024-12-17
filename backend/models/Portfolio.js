const db = require("../database/db");

const Portfolio = {
  // Create a new portfolio entry
  create: (portfolioData, callback) => {
    const sql = `INSERT INTO portfolio (userID, project_name, description, domain) VALUES (?, ?, ?, ?)`;
    const { userID, project_name, description, domain } = portfolioData;
    db.query(sql, [userID, project_name, description, domain], callback);
  },

  // Get all portfolios (with user details)
  getAll: (callback) => {
    const sql = `
      SELECT portfolio.*, users.userName 
      FROM portfolio 
      JOIN users ON portfolio.userID = users.id
    `;
    db.query(sql, callback);
  },

  // Get portfolios by userID
  getByUserId: (userID, callback) => {
    const sql = `SELECT * FROM portfolio WHERE userID = ?`;
    db.query(sql, [userID], callback);
  },

  // Update a portfolio by portfolioID
  update: (portfolioID, portfolioData, callback) => {
    const sql = `
      UPDATE portfolio 
      SET project_name = ?, description = ?, domain = ? 
      WHERE portfolioID = ?
    `;
    const { project_name, description, domain } = portfolioData;
    db.query(sql, [project_name, description, domain, portfolioID], callback);
  },

  // Delete a portfolio by portfolioID
  delete: (portfolioID, callback) => {
    const sql = `DELETE FROM portfolio WHERE portfolioID = ?`;
    db.query(sql, [portfolioID], callback);
  },
};

module.exports = Portfolio;
