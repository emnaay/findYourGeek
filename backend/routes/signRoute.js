const express = require("express");

const signRoute = express.Router();

const { postSignUp, postSignIn } = require("../controllers/signController");

signRoute.post("/signup", postSignUp);
signRoute.post("/signin", postSignIn);    // Endpoint for signin

module.exports = signRoute;