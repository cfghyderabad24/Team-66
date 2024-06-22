const express = require("express");
const donorApp = express.Router();

import { payment } from '../Controllers/donorController.js';


donorApp.post('/payment',payment);

module.exports = donorApp;