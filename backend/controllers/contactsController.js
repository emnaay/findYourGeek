const db = require("../database/db");


const getContacts = (req, res) => {
  const { user_id } = req.body;

  const sql = `
    SELECT 
      u.id AS contact_id,
      u.userName AS contact_name
    FROM messages m
    JOIN users u
      ON u.id = CASE 
                 WHEN m.sender_id = ? THEN m.receiver_id 
                 ELSE m.sender_id 
               END
    WHERE m.sender_id = ? OR m.receiver_id = ?
    GROUP BY contact_id
  `;

  db.query(sql, [user_id, user_id, user_id], (err, results) => {
    if (err) return res.status(500).json({ success: false, error: err.message });

    if (results.length > 0) {
      res.json({ success: true, contacts: results });
    } else {
      res.json({ success: false, msg: "No contacts found for this user." });
    }
  });
};

module.exports = { getContacts };
