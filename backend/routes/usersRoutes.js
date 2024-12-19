const express = require("express");

const usersRoutes = express.Router();

const { getUsers, getUserById, createUser, updateUser, deleteUser } = require("../controllers/usersControllers");
const { searchUsers } = require("../controllers/usersControllers");
// Routes for user operations
usersRoutes.get("/search", searchUsers);// Add this route for searching users

usersRoutes.get("/", getUsers); // Get all users
usersRoutes.get("/:Id", getUserById); // Get a user by ID
usersRoutes.post("/", createUser); // Create a new user
usersRoutes.put("/:Id", updateUser); // Update a user by ID
usersRoutes.delete("/:Id", deleteUser); // Delete a user by ID

module.exports = usersRoutes;
