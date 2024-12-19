const db = require("../database/db");

const Message = {
    // Get all messages between two users
    getMessages: (from, to, callback) => {
        const sql = `
            SELECT sender_id, message, timestamp 
            FROM messages 
            WHERE (sender_id = ? AND receiver_id = ?) 
               OR (sender_id = ? AND receiver_id = ?)
            ORDER BY timestamp ASC
        `;
        db.query(sql, [from, to, to, from], callback);
    },

    // Add a new message
    addMessage: (from, to, message, callback) => {
        const sql = `
            INSERT INTO messages (sender_id, receiver_id, message, timestamp)
            VALUES (?, ?, ?, NOW())
        `;
        db.query(sql, [from, to, message], callback);
    },

    // Get all messages for a specific receiver
    getMessagesForReceiver: (receiverId, callback) => {
        const sql = `
            SELECT * 
            FROM messages 
            WHERE receiver_id = ? 
            ORDER BY timestamp ASC
        `;
        db.query(sql, [receiverId], callback);
    },
};

module.exports = Message;
