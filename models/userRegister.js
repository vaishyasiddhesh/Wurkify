const mongoose=require("mongoose");

const userRegister=new mongoose.Schema({
    Fullname:{
        type:String,
        required:true

    },
    email:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        reqiured:true
    },
    password:{
        type:String,
        required:true
    }
    



})
module.exports=mongoose.model("User",userRegister)

