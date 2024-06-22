// write a mongoose model for student details with name,age, and medical details as object which constists of blood group, height, weight, and any other details you want to add.

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const studentSchema = new Schema({
    name: { type: String, required: true },
    age: { type: Number, required: true },
    medicalDetails: {
        bloodGroup: { type: String, required: true },
        height: { type: Number, required: true },
        weight: { type: Number, required: true },
        disability: { type: String, required: true },
    },
    parentName: { type: String, required: true },
    parentContact: { type: Number, required: true },
    parentEmail: { type: String, required: false },
    reports: {
        type: [
            {
                date: { type: Date, required: true },
                comment: { type: String, required: true },
            }
        ],
        default: []
    },
    uuid: { type: String, required: false },
});

const studentModel = mongoose.model("student", studentSchema);

module.exports = studentModel;