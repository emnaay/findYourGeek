const db = require("../database/db");

const getPortfolio =  (req, res) => {
    const sql = `
      SELECT portfolio.*, users.userName 
      FROM portfolio 
      JOIN users ON portfolio.userID = users.Id;
    `;
    db.query(sql, (err, data) => {
      if (err) return res.json(err);
      return res.json(data);
    });
  };

const getPortfolioById = (req, res) => {
    const userID = req.params.userID;
    const sql = "SELECT * FROM portfolio WHERE userID = ?";
  
    db.query(sql, [userID], (err, data) => {
      if (err) return res.json(err);
      return res.json(data);
    });
  };
  module.exports = { getPortfolio, getPortfolioById };