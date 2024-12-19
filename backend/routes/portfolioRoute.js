const express = require("express");

const portfolioRoute = express.Router();
const {
  getPortfolio,
  getPortfolioById,
  createPortfolio,
  updatePortfolio,
  deletePortfolio,
} = require("../controllers/portfolioController");

// Get all portfolios
portfolioRoute.get("/", getPortfolio);

// Get portfolios by userID
portfolioRoute.get("/:userID", getPortfolioById);

// Create a new portfolio
portfolioRoute.post("/", createPortfolio);

// Update a portfolio by portfolioID
portfolioRoute.put("/:portfolioID", updatePortfolio);

// Delete a portfolio by portfolioID
portfolioRoute.delete("/:portfolioID", deletePortfolio);

module.exports = portfolioRoute;
