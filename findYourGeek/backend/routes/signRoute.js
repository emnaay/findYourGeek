const express = require("express");

const signRoute = express.Router();

const { postSignUp, postLogIn } = require("../controllers/signController");

signRoute.post("/", postSignUp);

signRoute.post("/login", postLogIn);

module.exports = signRoute;