const User= require("../models/userRegister")
const formidable = require('formidable');
const path = require('path');
const fs = require('fs');
const UserAadhaar = require ('../models/userAadhaar')
const UserProfile = require('../models/userProfile')
const { validateDateOfBirth,parseDateOfBirth} = require("../helpers/userHelper");
const port = 3000
const load_landing=async(req,res)=>{
    try {
        console.log('loadlanding chala woh b userController mein ')
        res.render('landing');
        
    } catch (error) {
        console.log(error.message)
    }
}


const loadRegister=async(req,res) => {
    try {
        console.log('loadRegister chala woh b userController mein ')
        res.render("register")
    } catch (error) {
        console.log("Error meassges")
    }
    
}
const insertUser=async(req,res) => {
    try {
        const user=new User({
            Fullname:req.body.Fullname,
            email:req.body.email,
            phone:req.body.phone,
            password:req.body.password

        });

        const userData=await user.save()

        if(userData)
        {
            res.render('register',{message:"You have registered successfully"})
        }
        else{
            res.render('register',{message:"registration is failed"})
        }

        
    } catch (error) {
        console.log("error message")
    }
}
const verifyLogin=async(req,res)=>{
    try {
        const email=req.body.email;
        const password=req.body.password;
        const datachecker= await User.findOne({email:email});
        if (datachecker.password===password) {
            req.session.user_id=datachecker._id;
                    res.redirect('/dashboard')
               
                    
        } else {
            res.render('register',{message:"Email or password is incorrect"})
        }
        
    } catch (error) {
        console.log(error.message)
    }
}
const load_dashboard=async(req,res)=>{
    try {
        const UserData= await User.findById({_id:req.session.user_id})
        res.render('dashboard',{seeker:UserData});
        
    } catch (error) {
        console.log(error.message)
    }
};

// -----------------------------shaiban userAadhaarController---------------------

    const userAadhaarController = async (req,res,next) =>{
    try{
        const {fullName,aadhaarNumber,dateOfBirth,address} = req.fields
        const {file} = req.files
        console.log(`DOB ${dateOfBirth}`)
        const parsedDateOfBirth = parseDateOfBirth(dateOfBirth);
        // console.log(`parsedDateOfBirth ${parsedDateOfBirth.day}`)
        if (!dateOfBirth.day && dateOfBirth.month && dateOfBirth.year) {
        return res.status(400).send({ message: 'Invalid date of birth format' });
        }

        switch(true){
            case !fullName:
                return res.status(401).send({message:'Name is Required'})
            case !aadhaarNumber:
                return res.status(401).send({message:'adharnumber is Required'})
            case !dateOfBirth:
                return res.status(401).send({message:'dob is Required'})
            case !address:
                return res.status(401).send({message:'address is Required'})
            case file && file.size < 100000:
                return res
                .status(401)
                .send({
                    message:'File is Required and should be less then 1 mb'
                })       
            }

            // check user
            const existingUser = await UserAadhaar.findOne({aadhaarNumber})
            console.log(existingUser)
            // existing user
            if(existingUser){   
                return res.status(200).send({
                    sucess:false,
                    message:'Already Register please login',
                })
            }
            // Validating Date of Birth
            validateDateOfBirth(dateOfBirth)
            // Usage in application logic
            const dob = dateOfBirth; // Example date of birth
            if (!validateDateOfBirth(dob.day, dob.month, dob.year)) {
                console.error('Invalid date of birth');
            }

            // Function to parse and validate dateOfBirth
            function parseDateOfBirth(dateString) {
                const [day, month, year] = dateString.split('-').map(Number);
                if (!day || !month || !year || day < 1 || day > 31 || month < 1 || month > 12 || year < 1900) {
                return null;
                }
                console.log(`The day is ${day},month ${month},year ${year}`)
                return { day, month, year };
            }

            const post =  new UserAadhaar({...req.fields})
            if(file){
                post.file.data = fs.readFileSync(file.path)
                post.file.contentType = file.type
            }
            await post.save()
                res.status(201).send({
                    success:true,
                    message:'User Aadhaar Created Successfully',
                    post
                })
            }

    catch(error){
        res.status(500).send({
            success:false,
            message:'Error in userAdhar',
            error
        })
    }
    };
    // ///////////////////////////////////////////////////////////////

const  userAadhaarUpdateController = async (req, res, next) => {
    try {
        const { fullName, aadhaarNumber, dateOfBirth, address } = req.fields;
        const { file } = req.files;

        // Validate inputs
        if (!fullName) return res.status(401).send({ message: 'Name is Required' });
        if (!aadhaarNumber) return res.status(401).send({ message: 'Aadhaar number is Required' });
        if (!dateOfBirth.day && dateOfBirth.month && dateOfBirth.year) {
            return res.status(400).send({ message: 'Invalid date of birth format' });
          }      
        if (!address) return res.status(401).send({ message: 'Address is Required' });
        if (file && file.size >  5242880) {
            return res.status(401).send({ message: 'File should be less than 5 MB' });
        }

        // Find the existing document by ID
        const existingUser = await UserAadhaar.findById(req.params.pid);
        if (!existingUser) {
            return res.status(404).send({ message: 'User not found' });
        }

        // // Handle duplicate aadhaarNumber
        const duplicateUser = await UserAadhaar.findOne({ aadhaarNumber });
        if (duplicateUser && duplicateUser._id.toString() !== req.params.pid) {
            return res.status(409).send({ message: 'Aadhaar number already exists' });
        }

        // Update the existing document
        existingUser.fullName = fullName;
        existingUser.aadhaarNumber = aadhaarNumber;
        existingUser.dateOfBirth = dateOfBirth;
        existingUser.address = address;

        if (file) {
            existingUser.file.data = fs.readFileSync(file.path);
            existingUser.file.contentType = file.type;
        }

        await existingUser.save();

        res.status(200).send({
            success: true,
            message: 'User Aadhaar Updated Successfully',
            user: existingUser
        });

    } catch (error) {
        console.error('Error in user Aadhaar Update:', error);
        res.status(500).send({
            success: false,
            message: 'Error in user Aadhaar Update',
            error
        });
    }
};

// ================================================
const userAadhaarDeleteController = async (req,res) =>{
    try{
        await UserAadhaar.findById(req.params.pid)
        res.status(200).send({
            success:true,
            message:'Post Deleted Successfully'
        })
    }
    catch (error){
        res.status(500).send({
            success:false,
            message:'Error in Deletion of Post',
            error
        })
    }
}

///////////////////////////////////////////////////////////////////////////
const userProfileController = async (req,res,next) =>{
    try{
        const {FirstName,LastName,Age,Gender,Email,Mobile1,Mobile2,Address} = req.fields
        const {Photo} = req.files
        switch(true){
            case !FirstName:
                return res.status(401).send({message:'First Name is Required'})
            case !LastName:
                return res.status(401).send({message:'Last Name is Required'})
            case !Age:
                return res.status(401).send({message:'Age is Required'})
            case !Gender:
                return res.status(401).send({message:'Gender is Required'})
            case !Email:
                return res.status(401).send({message:'Gender is Required'})
            case !Mobile1:
                return res.status(401).send({message:'MObileNumber is Required'})
            case !Address:
                return res.status(401).send({message:'Address is Required'})
            case Photo && Photo.size < 100000:
                return res
                .status(401)
                .send({
                    message:'File is Required and should be less then 1 mb'
                })       
            }
            // check user
            const existingUser = await UserProfile.findOne({Email})
            console.log(existingUser)
            // existing user
            if(existingUser){   
                return res.status(200).send({
                    sucess:false,
                    message:'USer Profile Already Exists',
                })
            }

            const post =  new UserProfile({...req.fields})
            if(Photo){
                post.Photo.data = fs.readFileSync(Photo.path)
                post.Photo.contentType = Photo.type
            }
            await post.save()
                res.status(201).send({
                    success:true,
                    message:'User Profile Created Successfully',
                    post
                })
            }

    catch(error){
        res.status(500).send({
            success:false,
            message:'Error in USer Profile',
            error
        })
    }
    };
    // //////////////////////////////////////////////////////////////////////
    const  userProfileUpdateController = async (req, res, next) => {
        try {
            const {FirstName,LastName,Age,Gender,Email,Mobile1,Mobile2,Address} = req.fields
             const {Photo} = req.files
    
            // Validate inputs
            if (!FirstName) return res.status(401).send({ message: 'First Name is Required' });
            if (!LastName) return res.status(401).send({ message: 'Last Name  is Required' });   
            if (!Age) return res.status(401).send({ message: 'Age is Required' });
            if (!Gender) return res.status(401).send({ message: 'Gender is Required' });
            if (!Email) return res.status(401).send({ message: 'Email is Required' });
            if (!Mobile1) return res.status(401).send({ message: 'Mobile Number is Required' });
            if (!Address) return res.status(401).send({ message: 'Address is Required' });


            if (Photo&& Photo.size >  5242880) {
                return res.status(401).send({ message: 'File should be less than 5 MB' });
            }
    
            // Find the existing document by ID
            const existingUser = await UserProfile.findById(req.params.pid);
            if (!existingUser) {
                return res.status(404).send({ message: 'User not found' });
            }
    
            // // Handle duplicate aadhaarNumber
            const duplicateUser = await UserProfile.findOne({ Email });
            if (duplicateUser && duplicateUser._id.toString() !== req.params.pid) {
                return res.status(409).send({ message: 'Email already exists' });
            }
    
            // Update the existing document
            existingUser.FirstName = FirstName;
            existingUser.LastName = LastName;
            existingUser.Age = Age;
            existingUser.Gender = Gender;
            existingUser.Email = Email;
            existingUser.Mobile1 = Mobile1;
            existingUser.Mobile2= Mobile2
            existingUser.Address = Address;
    
            if (Photo) {
                existingUser.Photo.data = fs.readFileSync(Photo.path);
                existingUser.Photo.contentType = Photo.type;
            }
    
            await existingUser.save();
    
            res.status(200).send({
                success: true,
                message: 'User Profile Updated Successfully',
                user: existingUser
            });
    
        } catch (error) {
            console.error('Error in user Profile Update:', error);
            res.status(500).send({
                success: false,
                message: 'Error in user Profile Update',
                error
            });
        }
    };

// ================================================
const userProfileDeleteController = async (req,res) =>{
    try{
        await UserProfile.findById(req.params.pid)
        res.status(200).send({
            success:true,
            message:'Profile Deleted Successfully'
        })
    }
    catch (error){
        res.status(500).send({
            success:false,
            message:'Error in Deletion of Profile',
            error
        })
    }
}











// =====================================================================

  module.exports={
    loadRegister,
    insertUser,
    verifyLogin,
    load_dashboard,
    load_landing,
    userAadhaarController,
    userAadhaarUpdateController,
    userAadhaarDeleteController,
    userProfileController,
    userProfileUpdateController,
    userProfileDeleteController
}   
