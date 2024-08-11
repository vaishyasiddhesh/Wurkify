const mongoose=require("mongoose");

const userProfile=new mongoose.Schema({
    FirstName:{
        type:String,
        required:true

    },
    LastName:{
        type:String,
        required:true
    },
    Age:{
        type:Number,
        reqiured:true
    },
    Gender:{
        type:String,
        required:true
    },
    Email:{
        type:String,
        required:true,
        unique:true
    },
    Mobile1:{
        type:Number,
        required:true
    },
    Mobile2:{
        type:Number,
        reqiured:false
    },
    Address:{
        type:String,
        required:true
    },
    Photo:{
        data:Buffer, // Store the file path or URL
        contentType:String
    }



},{timestamps:true})
module.exports=mongoose.model("OrganiserProfile",userProfile)