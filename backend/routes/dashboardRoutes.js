const express = require("express");
const router = express.Router();
const db = require("../database/db"); // Shared db connection

// GET Dashboard Stats
router.get("/", (req, res) => {
  const query = `
    SELECT 
      total_accounts,
      total_projects,
      projects_today,
      users_online
    FROM dashboard_data
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching dashboard data:", err);
      return res.status(500).json({ error: "Error fetching dashboard data" });
    }

    res.status(200).json(results[0]);
  });
});

module.exports = router;
