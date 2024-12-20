const express = require("express");

const portfolioRoute = express.Router();
const {
  getPortfolio,
  getPortfolioById,
  createPortfolio,
  updatePortfolio,
  deletePortfolio,
} = require("../controllers/portfolioController");


portfolioRoute.get("/", getPortfolio);

portfolioRoute.get("/:userID", getPortfolioById);

portfolioRoute.post("/", createPortfolio);

portfolioRoute.put("/:portfolioID", updatePortfolio);

portfolioRoute.delete("/:portfolioID", deletePortfolio);

module.exports = portfolioRoute;
