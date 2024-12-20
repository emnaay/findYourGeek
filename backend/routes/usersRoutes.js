const express = require("express");

const usersRoutes = express.Router();

const { getUsers, getUserById, loginUser, createUser, updateUser, deleteUser } = require("../controllers/usersControllers");

const { searchUsers } = require("../controllers/usersControllers");
const isAuth = require("../middleware/isAuth")
const isAutho=require('../middleware/isAutho')

// Routes for user operations
usersRoutes.get("/search", searchUsers);// Add this route for searching users

usersRoutes.get("/", getUsers); // Get all users
usersRoutes.get("/:Id", isAuth,isAutho(['user']), getUserById); // Get a user by ID

usersRoutes.post("/", createUser); // Create a new user
usersRoutes.put("/:Id", updateUser); // Update a user by ID
usersRoutes.delete("/:Id", isAuth,isAutho(['admin']), deleteUser); // Delete a user by ID

module.exports = usersRoutes;
