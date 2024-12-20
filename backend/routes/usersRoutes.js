const express = require("express");

const usersRoutes = express.Router();

const { getUsers, getUserById, loginUser, createUser, updateUser, deleteUser } = require("../controllers/usersControllers");

const { searchUsers } = require("../controllers/usersControllers");
const isAuth = require("../middleware/isAuth")
const isAutho=require('../middleware/isAutho')

usersRoutes.get("/search", searchUsers);

usersRoutes.get("/", getUsers); 
usersRoutes.get("/:Id", isAuth,isAutho(['user']), getUserById); 

usersRoutes.post("/", createUser); 
usersRoutes.put("/:Id", updateUser);
usersRoutes.delete("/:Id", isAuth,isAutho(['admin']), deleteUser); 

module.exports = usersRoutes;
