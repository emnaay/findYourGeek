const db = require("../database/db");

const User = {
  // Get all users
  getAll: (callback) => {
    const sql = "SELECT * FROM users";
    db.query(sql, callback);
  },

  // Get a user by ID
  getById: (id, callback) => {
    const sql = "SELECT * FROM users WHERE Id = ?";
    db.query(sql, [id], callback);
  },
 

  // Create a new user
  create: (userData, callback) => {
    const sql = "INSERT INTO users (userName, email, password, phone_number, rank,description) VALUES (?, ?, ?, ?)";
    const { userName, email, password, description } = userData;
    db.query(sql, [userName, email, password, description], callback);
  },

  // Update a user by ID
  update: (id, userData, callback) => {
    const sql = "UPDATE users SET userName = ?, email = ?, password = ?, description = ? WHERE Id = ?";
    const { userName, email, password, description } = userData;
    db.query(sql, [userName, email, password, description, id], callback);
  },

  // Delete a user by ID
  delete: (id, callback) => {
    const sql = "DELETE FROM users WHERE Id = ?";
    db.query(sql, [id], callback);
  },
};

// User Model: Search users by username
const searchByUsername = (username, callback) => {
  const query = "SELECT * FROM users WHERE userName LIKE ?";
  db.query(query, [`%${username}%`], callback);
};

module.exports = { ...User, searchByUsername };

// module.exports = User;
