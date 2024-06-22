const express = require("express");
const volunteerApi = express.Router();
const studentModel = require("../Models/studentModel.js");
const volunteerModel = require("../Models/volunteerModel.js");
const { v4: uuidv4 } = require('uuid');

volunteerApi.post("/register",async (req, res) => {
  const { name, age, profession, mobileNo, email, password } = req.body;
  const newVolunteer = new volunteerModel({
    name,
    age,
    profession,
    mobileNo,
    email,
    password,
  });
  await newVolunteer
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

volunteerApi.post("/login", async (req, res) => {
  const { email, password } = req.body;
  await volunteerModel
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

volunteerApi.get("/:id",async (req, res) => {
  const email = req.params.id;
  await volunteerModel
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
volunteerApi.post("/:id/add-student", async (req, res) => {
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

  await volunteerModel.findOne({ email: id })
    .then(async (volunteer) => {
      if (volunteer && volunteer.verified) {
        const newStudent = new studentModel({
          name,
          age,
          medicalDetails,
          parentName,
          parentContact,
          parentEmail,
          uuid,
        });
       await newStudent
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
      } else {
        res.send({
          message: "Volunteer not found or not verified",
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

volunteerApi.post('/:id/:sid/report',async (req,res)=>{
    const id = req.params.id;
    const sid = req.params.sid;
    const { report } = req.body;
    const re = {
      date: new Date(),
      comment: report,
    };

    await volunteerModel.findOne({ email: id, verified: true })
      .then(async (volunteer) => {
        if (volunteer) {
          await studentModel.findOne({name: sid})
            .then((student) => {
              student.reports.push(re);
              student.save()
                .then(() => {
                  res.send({
                    message: "Comment added successfully",
                    success: true,
                  });
                })
                .catch((err) => {
                  res.send({
                    message: err.message,
                    success: false,
                  });
                });
            })
            .catch((err) => {
              res.send({
                message: err.message,
                success: false,
              });
            });
        } else {
          res.send({
            message: "Volunteer not found or not verified",
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
})

volunteerApi.post("/user-login", async (req, res) => {
    let username = req.body.username;
    let uniqueId = uuidv4();
    const st = await studentModel.findOne({ name: username });
    st.uuid = uniqueId;
    await st.save();
    res.send({
      message: "uuid creation success",
      success: true,
      uuid: uniqueId,
    });
  });

  
module.exports = volunteerApi;