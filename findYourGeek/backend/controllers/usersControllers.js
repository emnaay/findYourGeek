const User = require("../models/User");

// Get all users
const getUsers = (req, res) => {
  User.getAll((err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json(results);
  });
};

// Get a user by ID
const getUserById = (req, res) => {
  const { Id } = req.params;
  User.getById(Id, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(results[0]);
  });
};

// Create a new user
const createUser = (req, res) => {
  const userData = req.body;
  User.create(userData, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ id: results.insertId, ...userData });
  });
};

// Update a user
const updateUser = (req, res) => {
  const { Id } = req.params;
  const userData = req.body;
  User.update(Id, userData, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User updated successfully" });
  });
};

// Delete a user
const deleteUser = (req, res) => {
  const { Id } = req.params;
  User.delete(Id, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  });
};

module.exports = { getUsers, getUserById, createUser, updateUser, deleteUser };
