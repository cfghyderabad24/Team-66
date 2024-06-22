const express = require("express");
const volunteerApi = express.Router();
const student = require("../Models/studentModel.js");
const volunteerModel = require("../Models/volunteerModel.js");
const { uuid } = require("uuid");

volunteerApi.post("/register", (req, res) => {
  const { name, age, profession, mobileNo, email, password } = req.body;
  const newVolunteer = new volunteerModel({
    name,
    age,
    profession,
    mobileNo,
    email,
    password,
  });
  newVolunteer
    .save()
    .then(() => {
      res.send({
        message: "Volunteer Registered Successfully",
        success: true,
      });
    })
    .catch((err) => {
      res.send({
        message: err.message,
        success: false,
      });
    });
});

volunteerApi.post("/login", (req, res) => {
  const { email, password } = req.body;
  volunteerModel
    .findOne({ email: email })
    .then((volunteer) => {
      if (volunteer) {
        if (volunteer.password === password) {
          res.send({
            message: "Login Success",
            success: true,
          });
        } else {
          res.send({
            message: "Incorrect Password",
            success: false,
          });
        }
      } else {
        res.send({
          message: "Volunteer not found",
          success: false,
        });
      }
    })
    .catch((err) => {
      res.send({
        message: err.message,
        success: false,
      });
    });
});

volunteerApi.get("/:id", (req, res) => {
  const email = req.params.id;
  volunteerModel
    .findOne({email:email})
    .then((user) => {
    let volunteer = user.toObject()
      delete volunteer.password
      res.send({
        message: "Volunteer found",
        success: true,
        volunteer: volunteer,
      });
    })
    .catch((err) => {
      res.send({
        message: err.message,
        success: false,
      });
    });
});

volunteerApi.post("/:id/add-student", (req, res) => {
  const id = req.params.id;
  const {
    name,
    age,
    medicalDetails,
    parentName,
    parentContact,
    parentEmail,
    uuid,
  } = req.body;

  const newStudent = new student({
    name,
    age,
    medicalDetails,
    parentName,
    parentContact,
    parentEmail,
    uuid,
  });
  newStudent
    .save()
    .then(() => {
      res.send({
        message: "Student added successfully",
        success: true,
      });
    })
    .catch((err) => {
      res.send({
        message: err.message,
        success: false,
      });
    });
});

volunteerApi.post('/:id/:sid/report',(req,res)=>{
    const id = req.params.id;
    const sid = req.params.sid;
    const {report} = req.body;
    const re = {
        date : new Date(),
        comment : report
    }
    student.findById(sid)
    .then((student)=>{
        student.reports.push(re);
        student.save()
        .then(()=>{
            res.send({
                message:"Comment added successfully",
                success:true
            })
        }).catch((err)=>{
            res.send({
                message:err.message,
                success:false
            })
        })
    })
    .catch((err)=>{
        res.send({
            message:err.message,
            success:false
        })
    })
})

volunteerApi.post("/user-login", (req, res) => {
    let username = req.body.username;
    let uniqueId = uuid();
    const st = student.findOne({ username: username });
    st.uuid = uniqueId;
    st.save();
    res.send({
      message: "login success",
      success: true,
      uuid: uniqueId,
    });
  });

  
module.exports = volunteerApi;