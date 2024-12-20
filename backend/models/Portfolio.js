const db = require("../database/db");

const Portfolio = {
  create: (portfolioData, callback) => {
    const sql = `INSERT INTO portfolio (userID, project_name, description, domain) VALUES (?, ?, ?, ?)`;
    const { userID, project_name, description, domain } = portfolioData;
    db.query(sql, [userID, project_name, description, domain], callback);
  },

  getAll: (callback) => {
    const sql = `
      SELECT portfolio.*, users.userName 
      FROM portfolio 
      JOIN users ON portfolio.userID = users.id
    `;
    db.query(sql, callback);
  },

  getByUserId: (userID, callback) => {
    const sql = `SELECT * FROM portfolio WHERE userID = ?`;
    db.query(sql, [userID], callback);
  },

  update: (portfolioID, portfolioData, callback) => {
    const sql = `
      UPDATE portfolio 
      SET project_name = ?, description = ?, domain = ? 
      WHERE portfolioID = ?
    `;
    const { project_name, description, domain } = portfolioData;
    db.query(sql, [project_name, description, domain, portfolioID], callback);
  },

  delete: (portfolioID, callback) => {
    const sql = `DELETE FROM portfolio WHERE portfolioID = ?`;
    db.query(sql, [portfolioID], callback);
  },
};

module.exports = Portfolio;
