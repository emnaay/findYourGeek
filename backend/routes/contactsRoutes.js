const express = require("express");

const contactsRoutes = express.Router();

const {
    getContacts,
} = require("../controllers/contactsController");

contactsRoutes.post("/get", getContacts); 

module.exports = contactsRoutes;
