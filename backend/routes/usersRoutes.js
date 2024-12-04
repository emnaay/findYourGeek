const express = require("express");

const usersRoutes = express.Router();

const { getUsers , getUserById } = require("../controllers/usersControllers");

usersRoutes.get("/", getUsers);

usersRoutes.get("/:Id", getUserById);

module.exports = usersRoutes;