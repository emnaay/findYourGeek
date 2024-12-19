const express = require("express");

const usersRoutes = express.Router();

const { getUsers, getUserById, loginUser, createUser, updateUser, deleteUser } = require("../controllers/usersControllers");

// Routes for user operations
usersRoutes.get("/", getUsers); // Get all users
usersRoutes.get("/:Id", getUserById); // Get a user by ID

usersRoutes.post("/", createUser); // Create a new user
usersRoutes.put("/:Id", updateUser); // Update a user by ID
usersRoutes.delete("/:Id", deleteUser); // Delete a user by ID

module.exports = usersRoutes;
