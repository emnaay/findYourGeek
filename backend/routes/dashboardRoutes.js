const express = require("express");
const router = express.Router();
const db = require("../database/db"); // Shared db connection

// GET Dashboard Stats
router.get("/", (req, res) => {
  const updateQuery = `
    UPDATE dashboard_data
    SET 
        total_accounts = (
            SELECT COUNT(DISTINCT Id)
            FROM users
            WHERE Id IS NOT NULL
              AND userName IS NOT NULL
              AND email IS NOT NULL
              AND description IS NOT NULL
        ),
        total_projects = (
            SELECT COUNT(DISTINCT projectID)
            FROM projects
            WHERE projectID IS NOT NULL
              AND projectName IS NOT NULL
              AND description IS NOT NULL
              AND skills_needed IS NOT NULL
        )
    WHERE id = 2;
  `;

  const selectQuery = `
    SELECT total_accounts, total_projects
    FROM dashboard_data
    WHERE id = 2;
  `;

  // Execute the UPDATE query first
  db.query(updateQuery, (err) => {
    if (err) {
      console.error("Error updating dashboard data:", err);
      return res.status(500).json({ error: "Error updating dashboard data" });
    }

    // Then execute the SELECT query
    db.query(selectQuery, (err, results) => {
      if (err) {
        console.error("Error fetching dashboard data:", err);
        return res.status(500).json({ error: "Error fetching dashboard data" });
      }

      res.status(200).json(results[0]); // Send the first row of the SELECT query
    });
  });
});




module.exports = router;
