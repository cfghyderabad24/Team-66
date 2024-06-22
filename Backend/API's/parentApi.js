const express = require("express");
const parentApp = express.Router();
const student = require('../models/studentModel.js');


parentApp.get('/login/:username/:uuid', (req, res) => {

    //verify the uuid in student db
    let { username, uuid } = req.params;
    const st= student.findOne({username: username});
    if(st.uuid === uuid) 
    res.send({
        message: "login success",
        success: true
    });
    else{
        res.send({
            message: "login failed",
            success: false
        });
    }
});

parentApp.get('/:username', (req, res) => {
    let { username } = req.params;
    const st= student.findOne({username: username});
    res.send({
        message : "student details",
        student : st
    });
})

module.exports = parentApp;