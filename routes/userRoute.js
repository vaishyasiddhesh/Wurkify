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
// user_route.get('/.wurkify-login',auth.isLogout,userController.loadLogin)
user_route.get('/login-register',auth.isLogout,userController.loadRegister)
user_route.post('/register',auth.isLogout,userController.insertUser)

user_route.get('/dashboard',auth.isLogin,userController.load_dashboard)
user_route.get('/profile',auth.isLogin,userController.load_profile)
user_route.get('/activities',auth.isLogin,userController.load_activites)
user_route.get('/latest-events',auth.isLogin,userController.load_latestevent)
user_route.get('/applications',auth.isLogin,userController.load_application)
user_route.get('/settings',auth.isLogin,userController.load_setting)
user_route.get('/messaging',auth.isLogin,userController.load_messaging)
user_route.get('/help-n-support',auth.isLogin,userController.load_helpnsupport)
user_route.get('/files',auth.isLogin,userController.load_file)
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


// =====================================================
// Activities
user_route.post(
    '/user-activities',
    Formidable(),
    userProfileController
);
user_route.put(
    '/user-activities-update/:pid',
    Formidable(),
    userProfileUpdateController
);
user_route.delete('/user-activities-delete/:pid',userProfileDeleteController)

// =====================================================
// Latest Event

user_route.post(
    '/user-activities',
    Formidable(),
    userProfileController
);
user_route.put(
    '/user-activities-update/:pid',
    Formidable(),
    userProfileUpdateController
);
user_route.delete('/user-activities-delete/:pid',userProfileDeleteController)

// =====================================================
// Appilication

user_route.post(
    '/user-activities',
    Formidable(),
    userProfileController
);
user_route.put(
    '/user-activities-update/:pid',
    Formidable(),
    userProfileUpdateController
);
user_route.delete('/user-activities-delete/:pid',userProfileDeleteController)


// =====================================================
// Payment

user_route.post(
    '/user-activities',
    Formidable(),
    userProfileController
);
user_route.put(
    '/user-activities-update/:pid',
    Formidable(),
    userProfileUpdateController
);
user_route.delete('/user-activities-delete/:pid',userProfileDeleteController)


// =====================================================
// Settings

user_route.post(
    '/user-activities',
    Formidable(),
    userProfileController
);
user_route.put(
    '/user-activities-update/:pid',
    Formidable(),
    userProfileUpdateController
);
user_route.delete('/user-activities-delete/:pid',userProfileDeleteController)


// =====================================================
// messaging

user_route.post(
    '/user-activities',
    Formidable(),
    userProfileController
);
user_route.put(
    '/user-activities-update/:pid',
    Formidable(),
    userProfileUpdateController
);
user_route.delete('/user-activities-delete/:pid',userProfileDeleteController)

// ========================================================================
// jelp and Support 

user_route.post(
    '/user-activities',
    Formidable(),
    userProfileController
);
user_route.put(
    '/user-activities-update/:pid',
    Formidable(),
    userProfileUpdateController
);
user_route.delete('/user-activities-delete/:pid',userProfileDeleteController)

module.exports=user_route;


// -------------------Aadhaar -----------------
// routes/userRoutes.js
// const express = require('express');
// const router = express.Router();


// module.exports = user_route;
