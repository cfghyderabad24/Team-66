const mongoose = require('mongoose')

const donorSchema = new mongoose.Schema({
    name:{
        type:String,
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
    amount:{
        type:Number,
        required:true,
    },
})

const donorModel = mongoose.models.order || mongoose.model("donor",donorSchema);

module.exports=donorModel;