const express = require("express");
const parentApp = express.Router();
const studentModel = require('../Models/studentModel.js');


parentApp.get('/login/:username/:uuid', async (req, res) => {

    //verify the uuid in student db
    let { username, uuid } = req.params;
    const st = await studentModel.findOne({name: username});
    if(st.uuid === uuid) 
    res.send({
        message: "login success",
        success: true,
        student: st
    });
    else{
        res.send({
            message: "login failed",
            success: false
        });
    }
});

parentApp.get('/:username', async (req, res) => {
    let { username } = req.params;
    const st= await studentModel.findOne({username: username});
    res.send({
        message : "student details",
        student : st
    });
})

module.exports = parentApp;