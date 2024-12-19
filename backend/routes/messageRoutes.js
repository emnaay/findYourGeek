const express = require("express");

const messagesRoutes = express.Router();

const {
  getMessages,
  sendMessage,
  getMessagesForReceiver,
} = require("../controllers/messagesController");

// Routes for user operations
messagesRoutes.post("/messages/get", getMessages); 
messagesRoutes.post("/messages/add", sendMessage); 
messagesRoutes.get("/messages/get/:receiverId1", getMessagesForReceiver); // Get all users

module.exports = messagesRoutes;
