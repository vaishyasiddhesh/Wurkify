const mongoose = require('mongoose');

const userAadhaarSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
    },
    aadhaarNumber: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function(v) {
                return /^[0-9]{12}$/.test(v);
            },
            message: props => `${props.value} is not a valid Aadhaar number!`
        }   
    },
    // dateOfBirth: {
    //     day: {
    //         type: Number,
    //         required: true,
    //         min: [1, 'Day must be at least 1'],
    //         max: [31, 'Day must be at most 31']
    //     },
    //     month: {
    //         type: Number,
    //         required: true,
    //         min: [1, 'Month must be at least 1'],
    //         max: [12, 'Month must be at most 12']
    //     },
    //     year: {
    //         type: Number,
    //         required: true
    //     }
    dateOfBirth:{   
        type:String,
        required:true
    },

    address: {
        type: String,
        required: true
    },
    file: {
        data:Buffer, // Store the file path or URL
        contentType:String
    }
}, { timestamps: true });

module.exports = mongoose.model('UserAadhaar', userAadhaarSchema);


