const express = require("express");

const messagesRoutes = express.Router();

const {
  getMessages,
  sendMessage,
  getMessagesForReceiver,
} = require("../controllers/messagesController");

messagesRoutes.get("/get/:receiver_id/:sender_id", getMessages);
messagesRoutes.post("/add", sendMessage); 
messagesRoutes.get("/get/:receiver_id", getMessagesForReceiver); 

module.exports = messagesRoutes;
