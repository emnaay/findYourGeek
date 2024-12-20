const db = require("../database/db");

const User = {
  getAll: (callback) => {
    const sql = "SELECT * FROM users";
    db.query(sql, callback);
  },

  getById: (id, callback) => {
    const sql = "SELECT * FROM users WHERE Id = ?";
    db.query(sql, [id], callback);
  },
 

  create: (userData, callback) => {
    const sql = "INSERT INTO users (userName, email, password, description, role) VALUES (?, ?, ?, ?, ?)";
    const { userName, email, password, description, role = 'user' } = userData; 
    db.query(sql, [userName, email, password, description, role], callback);
  },  

  update: (id, userData, callback) => {
    const sql = "UPDATE users SET userName = ?, email = ?, password = ?, description = ?, role = ? WHERE Id = ?";
    const { userName, email, password, description, role } = userData;
    db.query(sql, [userName, email, password, description, role, id], callback);
  },  

  delete: (id, callback) => {
    const sql = "DELETE FROM users WHERE Id = ?";
    db.query(sql, [id], callback);
  },
};

const searchByUsername = (username, callback) => {
  const query = "SELECT * FROM users WHERE userName LIKE ?";
  db.query(query, [`%${username}%`], callback);
};


  

module.exports = { ...User, searchByUsername };

