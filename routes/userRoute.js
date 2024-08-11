const express=require('express');
const path = require('path');
const bodyParser=require('body-parser')
const Formidable = require('express-formidable');

const user_route=express();
const session=require('express-session');
const config=require('../config/config')
user_route.use(session({secret:config.sessionSecert}))
const auth=require('../middleware/auth');
const { 
    userAadhaarController ,
    userAadhaarUpdateController,
    userAadhaarDeleteController,
    userProfileController,
    userProfileUpdateController,
    userProfileDeleteController
} = require('../controllers/userController');//shaiban


user_route.use(express.static('public'));
user_route.set('view engine','ejs');
user_route.set('views','./views')

user_route.use(bodyParser.json());
// Parse URL-encoded data
user_route.use(bodyParser.urlencoded({ extended: true }));

//userRoute

const userController=require('../controllers/userController');

user_route.get('/landing',auth.isLogout,userController.load_landing)
user_route.post('/login',auth.isLogout,userController.verifyLogin)
user_route.get('/register',auth.isLogout,userController.loadRegister)
user_route.post('/register',auth.isLogout,userController.insertUser)
user_route.post('/login',auth.isLogout,userController.verifyLogin)

user_route.get('/dashboard',auth.isLogin,userController.load_dashboard)

// ====================================================
// Aadhaar
user_route.post(
    '/user-adhar',
    Formidable(),
    userAadhaarController
);
user_route.put(
    '/user-adhar-update/:pid',
    Formidable(),
    userAadhaarUpdateController
);

user_route.delete('/user-adhar-delete/:pid',userAadhaarDeleteController)

// =====================================================
// Profile
user_route.post(
    '/user-profile',
    Formidable(),
    userProfileController
);
user_route.put(
    '/user-profile-update/:pid',
    Formidable(),
    userProfileUpdateController
);
user_route.delete('/user-profile-delete/:pid',userProfileDeleteController)


module.exports=user_route;


// -------------------Aadhaar -----------------
// routes/userRoutes.js
// const express = require('express');
// const router = express.Router();


// module.exports = user_route;
