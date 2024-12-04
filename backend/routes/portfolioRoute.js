const express = require("express");

const portfolioRoute = express.Router();

const { getPortfolio, getPortfolioById } = require("../controllers/portfolioController");

portfolioRoute.get("/", getPortfolio);

portfolioRoute.get("/:userID", getPortfolioById);

module.exports = portfolioRoute;