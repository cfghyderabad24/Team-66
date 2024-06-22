const express = require("express");
const {payment}  = require('../Controllers/donorController.js');

const donorApp = express.Router();

const {verifyPayment} = require('../Controllers/donorController.js');

donorApp.post('/payment',payment);
donorApp.post('/verify',verifyPayment);

module.exports = donorApp;
