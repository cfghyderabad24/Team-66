const express = require("express");
const donorApp = express.Router();

import { payment,verifyPayment} from '../Controllers/donorController.js';



donorApp.post('/payment',payment);
donorApp.post('/verify',verifyPayment);

module.exports = donorApp;