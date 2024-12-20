const User = require("../models/User");

const getUsers = (req, res) => {
  User.getAll((err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json(results);
  });
};

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

const createUser = (req, res) => {
  const userData = req.body;
  User.create(userData, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ id: results.insertId, ...userData });
  });
};

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

const deleteUser = (req, res) => {
  const { Id } = req.params;
  User.delete(Id, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  });
};
const searchUsers = (req, res) => {
  const { username } = req.query;
  User.searchByUsername(username, (err, results) => {
    if (err) {
      console.error("Error searching users:", err);
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json(results);
  });
};
module.exports = { getUsers, getUserById, createUser, updateUser, deleteUser, searchUsers };
