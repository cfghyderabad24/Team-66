const express = require("express");
const payment  = require('../Controllers/donorController.js');

const donorApp = express.Router();

import { payment,verifyPayment} from '../Controllers/donorController.js';


donorApp.post('/payment', payment);

donorApp.post('/payment',payment);
donorApp.post('/verify',verifyPayment);

module.exports = donorApp;
