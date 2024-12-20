const db = require("../database/db");



const getMessages = (req, res) => {
  const { sender_id, receiver_id } = req.params; 

  const sql = `
    SELECT sender_id, message, timestamp 
    FROM messages 
    WHERE (sender_id = ? AND receiver_id = ?) 
       OR (sender_id = ? AND receiver_id = ?)
    ORDER BY timestamp ASC
  `;

  db.query(sql, [sender_id, receiver_id, receiver_id, sender_id], (err, results) => {
    if (err) return res.status(500).json({ error: 'Database query failed' });

    const projectedMessages = results.map((msg) => ({
      message: msg.message,
      timestamp: msg.timestamp,
      sender_id: msg.sender_id
    }));

    res.json(projectedMessages);
  });
};




const sendMessage = (req, res) => {
    const { from, to, message } = req.body;
  
    const sql = `
      INSERT INTO messages (sender_id, receiver_id, message, timestamp)
      VALUES (?, ?, ?, NOW())
    `;
  
    db.query(sql, [from, to, message], (err, result) => {
      if (err) return res.status(500).json({ success: false, error: err.message });
  
      if (result.affectedRows > 0) {
        res.json({ success: true, msg: "Message added successfully." });
      } else {
        res.json({ success: false, msg: "Failed to add message to the database." });
      }
    });
  };
  
const getMessagesForReceiver = (req, res) => {
  const { receiver_id } = req.params;

  const sql = `
    SELECT * 
    FROM messages 
    WHERE receiver_id = ? 
    ORDER BY timestamp ASC
  `;

  db.query(sql, [receiver_id], (err, results) => {
    if (err) return res.status(500).json(err);

    res.json(results);
  });
};

module.exports = {
  getMessages,
  sendMessage,
  getMessagesForReceiver,
};

