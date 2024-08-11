const mongoose=require("mongoose");
const dotenv=require('dotenv');
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })
const bodyParser=require('body-parser')
dotenv.config()
mongoose.connect("mongodb://0.0.0.0/wurkify");

const express=require("express");
const app=express();

// Middleware
app.use(express.json());

app.use(express.static('public'));
app.set('view engine','ejs');
app.set('views','./views')

app.use(bodyParser.json());
// Parse URL-encoded data
app.use(bodyParser.urlencoded({ extended: true }));

app.get('',(req,res)=>{
     res.render('landing')
})
const userRoute=require('./routes/userRoute')
app.use('/user',userRoute);

const organiserRoute=require('./routes/organiserRoute')
app.use('/organiser',organiserRoute)

app.listen(3000,function(){
    console.log("server is run sucessfylly");
})
