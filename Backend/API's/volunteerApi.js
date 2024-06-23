const express = require("express");
const volunteerApi = express.Router();
const studentModel = require("../Models/studentModel.js");
const volunteerModel = require("../Models/volunteerModel.js");
const { v4: uuidv4 } = require('uuid');
const { createCanvas, loadImage, registerFont } = require('canvas');
const PDFDocument = require('pdfkit');
const path= require('path');
const bodyParser = require('body-parser');
registerFont(path.join(__dirname, 'arial.ttf'), { family: 'Arial' });


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


volunteerApi.get('/certificate/:id',async (req, res) => {
  const name = req.params.id;

  try {
      const canvas = createCanvas(800, 600); // Adjust size as per your template
      const ctx = canvas.getContext('2d');
      const template = await loadImage(path.join(__dirname, 'certificate.png'));

      // Load the template onto the canvas
      ctx.drawImage(template, 0, 0, canvas.width, canvas.height);

      // Set the font
      ctx.font = '40px Arial';

      // Set text color
      ctx.fillStyle = '#A28535';

      // Define text positions
      const namePosition = { x: 300, y: 300 }; // Adjust based on your template

      // Draw the text onto the canvas
      ctx.fillText(name, namePosition.x, namePosition.y);

      // Convert the canvas to a PNG buffer
      const buffer = canvas.toBuffer('image/png');

      // Create a PDF document
      const doc = new PDFDocument({ size: [canvas.width, canvas.height] });

      // Embed the PNG image into the PDF
      doc.image(buffer, 0, 0, { width: canvas.width, height: canvas.height });

      // Create a buffer to store the PDF data
      const pdfBuffer = [];

      // Capture the data chunks as the PDF is generated
      doc.on('data', chunk => pdfBuffer.push(chunk));
      
      // End the PDF document and send the response
      doc.on('end', () => {
          const finalBuffer = Buffer.concat(pdfBuffer);

          // Set headers and send the PDF as a response
          res.setHeader('Content-Type', 'application/pdf');
          res.setHeader('Content-Disposition', 'attachment; filename="certificate.pdf"');
          res.send(finalBuffer);
      });

      doc.end();
  } catch (error) {
      console.error(error);
      res.status(500).send('Error generating certificate.');
  }
}
);

  
module.exports = volunteerApi;