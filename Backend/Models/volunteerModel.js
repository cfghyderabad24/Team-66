const mongoose = require("mongoose");

const volunteerSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },

    age:{
        type:Number,
        required:true,
    },

    profession:{
        type:String,
        required:true,
    },

    mobileNo:{
        type:Number,
        required:true, 
    },

    email:{
        type:String,
        required:true,
    },

    password:{
        type:String,
        required:true,
    },

    studentIds:{
        type:[String],
        default:[],
    },

    verified:{
        type:Boolean,
        default:false,
    }

})

const volunteerModel = mongoose.models.order || mongoose.model("volunteer",volunteerSchema);

module.exports = volunteerModel;