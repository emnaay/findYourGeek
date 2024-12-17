const Portfolio = require("../models/Portfolio");

const getPortfolio = (req, res) => {
  Portfolio.getAll((err, data) => {
    if (err) return res.status(500).json(err);
    return res.json(data);
  });
};

const getPortfolioById = (req, res) => {
  const userID = req.params.userID;
  Portfolio.getByUserId(userID, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.json(data);
  });
};

const createPortfolio = (req, res) => {
  const portfolioData = req.body;
  Portfolio.create(portfolioData, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.json({ message: "Portfolio created successfully!", data });
  });
};

const updatePortfolio = (req, res) => {
  const portfolioID = req.params.portfolioID;
  const portfolioData = req.body;
  Portfolio.update(portfolioID, portfolioData, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.json({ message: "Portfolio updated successfully!", data });
  });
};

const deletePortfolio = (req, res) => {
  const portfolioID = req.params.portfolioID;
  Portfolio.delete(portfolioID, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.json({ message: "Portfolio deleted successfully!" });
  });
};

module.exports = {
  getPortfolio,
  getPortfolioById,
  createPortfolio,
  updatePortfolio,
  deletePortfolio,
};
