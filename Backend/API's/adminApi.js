const express = require("express");
const adminApp = express.Router();

const adminModel = require("../Models/adminModel");
const volunteerModel = require("../Models/volunteerModel");

adminApp.post("/login",(req,res)=>{
    const {username, password} = req.body;
    adminModel.findOne({username:username})
    .then((admin)=>{
        if(admin){
          if(admin.password === password){
            res.send({
                message:"Login Success",
                success:true,
            })
        }else{
            res.send({
                message:"incorrect password",
                success:false,
            })
        }
      }else{
        res.send({
            message:"Admin not found",
            success:false,
        })
      }
    })
    .catch((err)=>{
        res.send({
            message:err.message,
            success:false,
        })
    })

})

adminApp.post("/verify_volunteer",(req,res)=>{
    const {name} = req.body;

    volunteerModel.findOne({name:name})
    .then((volunteer)=>{
        if(volunteer){
            volunteer.verified = true;
            volunteer.save();

            res.send({
                message:"Succesfully verified",
                success:true,
            })

        }else{

            res.send({
                message:"Volunteer not found",
                success:false,
            })
            
        }
    })
})




module.exports = adminApp;