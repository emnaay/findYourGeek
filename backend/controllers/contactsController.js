const db = require("../database/db");


const getContacts = (req, res) => {
    const { user_id } = req.body;
  
    const sql = `
      SELECT * 
      FROM contacts
      WHERE user_id = ?
    `;
  
    db.query(sql, [user_id], (err, results) => {
      if (err) return res.status(500).json({ success: false, error: err.message });
  
      if (results.length > 0) {
        res.json({ success: true, contacts: results });
      } else {
        res.json({ success: false, msg: "No contacts found for this user." });
      }
    });
  };
  
  module.exports={getContacts}