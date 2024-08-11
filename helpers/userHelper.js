const multer = require('multer')

const validateDateOfBirth = (day, month, year) => {
    // Check if month is valid
    if (month < 1 || month > 12) return false;

    // Check if day is valid for the given month
    const daysInMonth = new Date(year, month, 0).getDate();
    return day >= 1 && day <= daysInMonth;
};

const parseDateOfBirth = (dateStr) => {
    const [day, month, year] = dateStr.split('-').map(Number);
    return { day, month, year };
};


// Set up storage with Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'userProfileImg/'); // Folder where files will be stored
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // File naming convention
    }
});



module.exports={
    validateDateOfBirth,
    parseDateOfBirth
}