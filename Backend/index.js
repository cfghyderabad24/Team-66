const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const donorApp = require("./API's/donorApi");
const parentApp = require("./API's/parentApi");
const adminApp = require("./API's/adminApi");
const volunteerApp = require("./API's/volunteerApi");

const app = express();

dotenv.config();

app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        console.log("Database connected");
    })
    .catch((err) => {
        console.log(err);
    });


app.use("/parent", parentApp);
app.use("/donor", donorApp);
app.use("/admin", adminApp);
app.use("/volunteer", volunteerApp);

app.use((err, req, res, next) => {
    res.send({
        error: err.message
    });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
