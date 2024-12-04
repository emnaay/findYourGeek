const db = require("../database/db");

const getUsers = (req, res) => {
    const sql = "SELECT * FROM users";
    db.query(sql, (err, data) => {
      if (err) return res.json(err);
      return res.json(data);
    });
  };

const getUserById = (req, res) => {
    const Id = req.params.Id;
    const sql = "SELECT * FROM users WHERE Id = ?";
  
    db.query(sql, [Id], (err, data) => {
      if (err) return res.json(err);
      return res.json(data);
    });
  };

  module.exports = { getUsers, getUserById };