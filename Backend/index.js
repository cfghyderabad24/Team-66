const express = require("express");
const app = express();

const cors = require('cors');
require('dotenv').config();

app.use(express.json());
app.use(cors())


const donorApp = require("./API's/donorApi");
const parentApp = require("./API's/parentApi");
const adminApp = require("./API's/adminApi");
const volunteerApp = require("./API's/volunteerApi");

app.use("/parent",parentApp)
app.use("/donor",donorApp)
app.use("/admin",adminApp)
app.use("/volunteer",volunteerApp)


app.use((err, req, res, next) => {
    res.send({
        error: err.message
    })
})
const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});