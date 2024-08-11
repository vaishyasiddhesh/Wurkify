const express=require('express');
const path = require('path');
const bodyParser=require('body-parser')
const Formidable = require('express-formidable');

const organiser_route=express();
const session=require('express-session');
const config=require('../config/config')
organiser_route.use(session({secret:config.sessionSecert}))


const { 
    organiserAadhaarController,
    organiserAadhaarUpdateController,
    organiserAadhaarDeleteController,
    organiserProfileController,
    oragainserProfileUpdateController,
    organiserProfileDeleteController
} = require('../controllers/organiserController');

organiser_route.use(express.static('public'));
organiser_route.set('view engine','ejs');
organiser_route.set('views','./views')

organiser_route.use(bodyParser.json());
// Parse URL-encoded data
organiser_route.use(bodyParser.urlencoded({ extended: true }));

//userRoute
const organiserAuth=require('../middleware/organiserAuth')
const organiserController=require('../controllers/organiserController');
const organiserRegister = require('../models/organiserRegister');
organiser_route.get('/register',organiserAuth.isLogout,organiserController.organiserRegister)
organiser_route.post('/register',organiserController.insertOrganiser)
organiser_route.get('/login',organiserController.organiserRegister)
organiser_route.post('/login',organiserController.verifyLoginOrg)


// organiser_route.post('')

// ====================================================
// Aadhaar
organiser_route.post(
    '/organiser-adhar',
    Formidable(),
    organiserAadhaarController
);
organiser_route.put(
    '/organiser-adhar-update/:pid',
    Formidable(),
    organiserAadhaarUpdateController
);

organiser_route.delete('/organiser-adhar-delete/:pid',organiserAadhaarDeleteController)

// =====================================================
// Profile
organiser_route.post(
    '/organiser-profile',
    Formidable(),
    organiserProfileController
);

organiser_route.put(
    '/organiser-profile-update/:pid',
    Formidable(),
    oragainserProfileUpdateController
);


organiser_route.delete('/organiser-profile-delete/:pid',organiserProfileDeleteController)



module.exports=organiser_route;