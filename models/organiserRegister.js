const mongoose=require("mongoose");

const organiserRegister=new mongoose.Schema({
    Fullname:{
        type:String,
        required:true

    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
    



})
module.exports=mongoose.model("Organiser",organiserRegister)

