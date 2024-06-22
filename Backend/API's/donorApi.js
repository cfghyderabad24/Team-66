const express = require("express");
const payment  = require('../Controllers/donorController.js');

const donorApp = express.Router();


donorApp.post('/payment', payment);

module.exports = donorApp;
