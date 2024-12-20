const db = require("../database/db");



// Get all messages between two users
const getMessages = (req, res) => {
  const { sender_id, receiver_id } = req.params; // Extract from route parameters

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
      fromSelf: msg.sender_id === sender_id,
      message: msg.message,
      timestamp: msg.timestamp,
    }));

    res.json(projectedMessages);
  });
};


// Add a new message
/*const sendMessage = (req, res) => {
  const { from, to, message } = req.body;

  const sql = `
    INSERT INTO messages (sender_id, receiver_id, message, timestamp)
    VALUES (?, ?, ?, NOW())
  `;

  db.query(sql, [from, to, message], (err, result) => {
    if (err) return res.status(500).json(err);

    if (result.affectedRows > 0) {
      res.json({ msg: "Message added successfully." });
    } else {
      res.json({ msg: "Failed to add message to the database." });
    }
  });
};*/

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
  
// Optional: Get all messages for a receiver
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

/*const db = require("../database/db");

const Message = require("../models/messages");

const getMessages = (req, res) => {
  const sql = "SELECT * FROM messages";
  db.query(sql, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
};

const sendMessage = (req, res) => {
  const { senderId, receiverId, message } = req.body;
  const sql =
    "INSERT INTO messages (senderId, receiverId, message, timestamp) VALUES (?, ?, ?, NOW())";
  db.query(sql, [senderId, receiverId, message], (err, result) => {
    if (err) return res.status(500).json(err);
    return res
      .status(201)
      .json({ message: "Message sent", messageId: result.insertId });
  });
};

const getConversation = (req, res) => {
    const { userId1, userId2 } = req.params;
    const sql = `
        SELECT * FROM messages 
        WHERE (sender_id = ? AND receiver_id = ?) 
        OR (sender_id = ? AND receiver_id = ?) 
        ORDER BY timestamp
    `;
    db.query(sql, [userId1, userId2, userId2, userId1], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.json(data);
    });
};

const getMessage = (req, res) => {
    const { receiverId } = req.params; // Get the receiver ID from the URL params
    const sql = "SELECT * FROM messages WHERE receiver_id = ?";
    db.query(sql, [receiverId], (err, data) => {
        if (err) return res.status(500).json(err); // Return an error if the query fails
        return res.json(data); // Send the retrieved messages as the response
    });
};

module.exports = { getMessages, sendMessage, getConversation,getMessage };
*/